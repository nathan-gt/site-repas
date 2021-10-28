# Deploiement
Le système d'authentification venant du template de microsoft a demandé beaucoup plus d'efforts que prévu à mettre en production.
Voici le processus que j'ai effectué sur plusieurs semaines de recherche.


## Enjeux
En ordre de priorité, il fallait que mes solutions:
1. Fonctionnent
2. Respectent notre budget d'étudiants
3. Soit sécuritaires

C'est avec cette liste de priorité que j'ai entamé mes recherches.

## Problèmes/Solutions rencontrés
### Projet executé depuis fichiers de build plante - PROBLÈME 1
#### Problème:
Lorsque le .csproj de l'application est lancé (F5 dans visual studio ou ``dotnet projet.csproj`` dans la ligne de commande), le projet fonctionne bien sur localhost:5001, mais si executé depuis les fichiers de build (.dll ou .exe), le serveur démarre sur localhost:5001, mais plante dès qu'il lui est envoyé une requête.<br>
#### Source du problème:
Le front end n'était pas inclu dans le build, alors le serveur essayait d'utiliser des fichiers qui n'existaient pas.
#### Solution:
En suivant [ce tutoriel](https://medium.com/bb-tutorials-and-thoughts/how-to-develop-and-build-react-app-with-net-core-backend-59d4fc5e3041), j'ai compris ce qui ne marchait pas et la commande à utiliser pour bien build le projet avec le front end et le back end.

---

### Serveur est fonctionnel et sert le front end, mais retourne une erreur 500 - PROBLÈME 2
#### Problème:
Après avoir réglé le dernier problème, une nouvelle erreur se produisait, mais maintenant au moins le serveur ne plantait plus, ce qui me permis d'avoir techniquement un site hébergé en production, mais qui n'affichait qu'une page d'erreur, le projet marche toujours à 100% lorsque lancé depuis le .csproj.
#### Source du problème:
La raison de ce crash est que pendant le runtime, le serveur essaie de trouver un certificat valide pour encrypter les données serveur et clientes, mais lors d'un build, dotnet n'en fourni aucun, et un NullReferenceException est lancé. Le service d'authentification qui est ajoutable au template de base de l'application est ce qui utilise ce certificat. La raison pourquoi l'application fonctionne à partir de .csproj mais pas à partir du .dll ou .exe est que lorsque l'application est lancée pour la première fois sur une machine windows, dotnet demande au développeur de créer un certificat à utiliser en développement et crée le tout automatiquement, mais ce certificat n'est pas utilisé en production.
#### Démarches
J'avais déjà identifié ce scénario comme possible raison pour le problème précédant, mais finalement une erreur plus évidente en était la cause, cette fois-ci par contre, c'était vraiment la bonne raison. En premier lieu j'ai exploré la possibilité d'utiliser les services de certificats d'Azure, pensant qu'il n'y avait peut-être pas d'autres solutions. Je pensais qu'il y avait la possibilité d'acheter un certificat et de l'utiliser sur le site en production, sauf que ce service coûtait 80$ par année. Puis après un peu de recherche, je me suis rendu compte que cela allait simplement nous donner un certificat, mais que nous n'allions pas être capable de l'utiliser sur le site, pour utiliser le service de stockage de certificat d'azure avec un web app service, il faut prendre minimalement le forfait B1, estimé à 80$ par mois, sela a freiné toute recherches de ce côté pour moi.

J'ai alors essayé d'ignorer la vérification de certificat dans le code, en commentant quelque lignes. Surprenament il semblait que cela fonctionnait et je pensais que c'était suffisant, mais après quelques tests je me suis rendu compte que tout ce qui était lié à l'authentification ne fonctionnait plus et lançait des erreurs.

#### Solution:
Après ce road block, je me suis rendu compte que l'on pouvait utiliser un fichier de certificat localement pour l'application, j'ai alors téléchargé le certificat utilisé pour le développement et je l'ai testé avec l'application (au lieu d'aller chercher le certificat dans le certificate store de la machine windows, le certificat à la racine du projet est utilisé), lorsque je le copiais dans le dossier de build, tout fonctionnait localement! J'ai alors testé si le serveur de production fonctionnait avec ce certificat et c'était le cas.

Ceci créait par contre une énorme faille, vu que le certificat était mis sur notre dépôt github public, et donc comme si nous n'avions pas d'encryption rendu là. Mais en suivant mon ordre de priorité, l'application fonctionnait et était toujours gratuite, alors je me suis penché sur le problème suivant.

---

### Base de donnée en production
#### Problème:
Lorsque l'on essaie de consulter le site sur Azure, le serveur renvoie encore une erreur 500, mais localement tout fonctionne.
#### Source du problème:
Depuis le début du développement du projet, nous utilisions la base de donnée par défaut du projet, Sql Server Express (localdb). Un service similaire à SQLite (mais tellement plus énervant) qui sert de dépannage aux développeurs pour un débogage rapide sur une base de donnée unique marchant localement. Le problème est que cette base de donnée n'est pas adapté à l'hébergement en production, même si faisable.
#### Démarches:
J'ai au départ voulu utiliser LocalDb sur le serveur d'hébergement, mais pour en faire l'installation il fallait les droits administrateurs sur le serveur, ce qui n'est pas fourni par ce service d'azure. Je me suis alors tourné vers l'option proposé de microsoft de créer une base de donnée SQL Azure.
> Il semblerait qu'une autre option qui s'appelle "MySQL In App", permettant de rouler une instance de my sql localement sur la machine. J'avais abandonné l'idée vu que j'avais déjà créé une base de donnée SQL Azure et semblait sur la bonne voie pour la faire fonctionner avec le projet en production, mais ce serait une piste intéressante à continuer d'explorer pour possiblement avoir un site et base de donnée 100% gratuits.
#### Solution:
Une fois la base de donnée créée et beaucoup d'essai erreur avec le string de connection, j'ai pu la faire fonctionner sur Azure et la modifier localement sur mon poste. Mais comme au problème précédant, la méthode n'était vraiment pas sécuritaire à cause du connection string qui utilisait un mot de passe hardcodé et accessible par n'importe qui.

---

### Réglages de failles de sécurité importantes (Génération de certificat)
#### Problème:
Le certificat et le string de connexion sont tout deux visibles sur github, causant ainsi une faille de sécurité majeure. Le string de connexion est gardé dans le fichier appsettings.json et comme le certificat est gardé la racine du projet Repas.
#### Source du problème:
Azure nous empêche de stocker sécuritairement ces données, soit en demandant des frais élevés pour accèder à ce genre de service ou bien en rendant le processus trop compliqué.
#### Démarches:
J'ai commencé par encore voir si Azure ne fournissait déjà pas une alternative à mon problème, Azure a un Key Vault gratuit, mais je n'ai malheureusement pas réussi à le faire fonctionner. Je me suis alors tourné vers Github actions. Depuis que je connais l'existence de github actions, je me suis toujours demandé à quel point je pourrais pousser ce service loin. Il semblerait que la réponse est <ins>***très***</ins>. 

Au départ je me suis dis que héberger le certificat sur la machine du serveur était une faille en soit, mais ensuite je me suis rendu à l'évidence que je le serveur lui n'héberge pas le fichier et est donc sécuritaire. J'ai voulu en premier copier le certificat microsoft généré par l'application en développement et le garder dans les "github secrets" de notre dépôt, mais la façon dont microsoft fait son encryption fait en sorte qu'il est impossible de juste copier le contenu d'un certificat .pfx et d'en créer un nouveau valide.

#### Solutions:
Un autre road block donc, mais je me suis demandé si je pouvais alors générer un tout nouveau .pfx lors du déploiement sur github actions, et l'utiliser en production? Je me suis donc tourné vers OpenSSL, un service open source d'encryption et de création de certificats. D'habitude, il doit y avoir deux certificats pour un serveur, un public et un privé. Mais microsoft fait les choses autrement, au grand daim de beaucoup de developpeurs. Un certificat .pfx est un certificat contenant la clé privée et la clé publique, sous une autre couche d'encryptage. Pour créer un .pfx avec OpenSSL, il faut donc une clé privée et une clé publique générés au départ, puis générer un .pfx à partir des deux. Tout ceci peut être vu dans le [fichier de github actions de déploiement de notre site](/.github/workflows/deployment.yml)

Une fois l'impossible fait, il ne restait qu'à régler le problème du string de connexion à la base de données. Je pouvais soit essayer de faire fonctionner le vault key d'azure, ou bien juste trouver autre chose avec github actions. Le choix a été très facile, et en quelques recherches google j'ai pu trouver comment modifier le string de connexion du fichier JSON avec 3 commandes powershell.


## Conclusion

Toutes ces démarches m'ont montré à quel point il peut être fastidieux de faire un déploiement en production et de penser à chaque aspect de la sécurité, surtout pour un environnement complexe comme ASP.NET peu adapté à notre petit projet et pour un template peu supporté comme celui que nous avons pris.