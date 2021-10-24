# Application web de gestion de repas

Lien GitHub: https://github.com/nathan-gt/site-repas

Lien environnement en production:

Utilisateur test pour l'environnement production: - Email -->
                                                  - Mot de passe -->

Étapes de la configuration de l'environnement local:

1- Télécharger Visual Studio (https://visualstudio.microsoft.com/fr/downloads/)
2- Cloner le dépôt Git sur votre poste local
3- Ouvrez un terminal de commandes et aller à la racine du projet
4- Faites la commande 
5- Dans l'installeur de Visual Studio, sélectionnez Développement web et ASP.NET pour l'ajouter au téléchargement.
6- Lorsque le téléchargement est terminé, ouvrez Repas.sln.
7- Lorsque le projet aura terminé de charger, appuyez sur la touche F5 ou sur la flèche pour lancer l'application 
   (le premier lancement de l'application peut prendre quelques minutes).

Dans le dossier TestRequetes à la racine du projet, vous y retrouverez un fichier JSON contenant les requêtes HTTP GET, POST et DELETE pour tester les cas utiles de l'application avec la base de données. Vous pouvez l'importer dans une application de tests comme Postman. L'application comporte aussi des tests unitaires contenus dans le dossier Repas.UnitTests à la racine du projet. Ces tests se lancent automatiquement avec le CI/CD de l'application.