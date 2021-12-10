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
 
### Tester l'application
------------------------------------------------------
Dans le dossier TestRequetes à la racine du projet, vous y retrouverez un fichier JSON contenant les requêtes HTTP GET, POST et DELETE pour tester les cas utiles de l'application avec la base de données. Vous pouvez l'importer dans une application de tests comme Postman. L'application comporte aussi des tests unitaires contenus dans le dossier Repas.UnitTests à la racine du projet. Ces tests se lancent automatiquement avec le CI/CD de l'application.
