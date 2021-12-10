# Application web de gestion de repas

Lien GitHub: https://github.com/nathan-gt/site-repas

Lien vers l'environnement en production: https://site-repas.azurewebsites.net/

Utilisateur test pour l'environnement production: 
- Email --> test@test.com
- Mot de passe  --> SV!3ydxZ.+vZfaT

### Étapes de la configuration de l'environnement de développement local (windows 10):
------------------------------------------------------
1. Télécharger Visual Studio (https://visualstudio.microsoft.com/fr/downloads/)
2. Dans l'installeur de Visual Studio, sélectionnez Développement web et ASP.NET pour l'ajouter au téléchargement.
3. Cloner le dépôt Git sur votre poste local
4. Allez sur le site https://dotnet.microsoft.com/download et téléchargez la version 5.0 de .NET
5. Lorsque le téléchargement est terminé, allez à la racine de Repas/Clientapp et faites `npm install`
5. ensuite, ouvrez Repas.sln
6. Lorsque le projet aura terminé de charger, appuyez sur la touche F5 ou sur la flèche pour lancer l'application (le premier lancement de l'application peut prendre quelques minutes).

### Étapes de la configuration de l'environnement de développement local (sans Visual Studio):
------------------------------------------------------
**Prérequis**: 
- [ASP.net SDK 5.0](https://dotnet.microsoft.com/en-us/download/dotnet/5.0) (requis)
- npm 6.14.1+ (requis)
- un self-signed certificate au format .pfx (requis)
1. Copiez votre certificat dans la racine du dossier Repas/
2. Effectuez un `npm install` dans la racine du dossier 
3. Exécutez `dotnet run` à  la racine du dossier Repas/
4. Si cela ne fonctionne pas exécutez un `dotnet restore` au même emplacement
 
### Tester l'application avec Postman
------------------------------------------------------
Les fichiers d'importation de tests postman se trouvent dans le dossier TestRequetes.
1. Pour importer les tests allez dans postman et cliquez sur `Import`, choisissez le fichier json dans TestRequetes.
2. Pour effectuer les requêtes en étant connecté à un utilisateur dans postman, avant d'effectuer les requêtes cliquez sur le dossier maintenant importé
3. Ne touchez pas aux options, après avoir défilé la page vers le bas, cliquez sur `Generate new access token`, une fenêtre devrait s'ouvrir, ou bien Postman vous demandera l'accès à votre browser par défaut.
4. La page de connexion du site devrait s'afficher, connectez-vous avec un quelquonque compte, `Test5@test.com` par exemple.
5. Après quelques instants, vous devriez être redirigé vers postman où il vous sera mentionné que le nouveau token a été reçu, après avoir cliqué sur proceed, ou après 5 secondes d'attente, une autre fen^tre s'affichera vous montrant le token reçu et qui sera utilisé par les tests du dossieré Cliquez sur `Use token`.
6. Vous pouvez maintenant essayer le premier test GET `Tester si connexion avec postman fonctionne`. Si votre connexion fonctionne le test devrait passer avec un code 200 et retourner quelques informations sur le compte connecté, sinon une erreur 401 sera retourné.
7. Vous pouvez maintenant effectuer les tests postman pour tester les différentes routes de l'application.
> **_À NOTER:_** Certaines requêtes peuvent avoir un paramètre entre `<>` que vous devez remplacer par votre propre valeur.