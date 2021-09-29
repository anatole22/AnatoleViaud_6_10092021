#PIIQUANTE - Projet 6 - Parcour développement Web
***
Le Frontend est fourni dans le projet.

##Partie 1 - Implémenter les routes de l'API

1. S'inscrire et se connecter
2. Voir les sauces disponibles
3. Ajouter une sauce
4. Modifier une sauce
5. Supprimer une sauce
6. Poster un like/dislike sur une sauce

##Partie 2 - Procéder mis en place pour la sécurité des données

Utilisation du package helmet, permettant de protéger les headers dans les requêtes
Configuration d'un fichier .env afin de ne pas faire apparaitre les données critiques dans le code (token / identifiants de connexion à la BDD / clé et IV pour AES)
Cryptage du mot de passe avec Bcrypt
Chiffrement de l'adresse mail avec AES
Création d'un utilisateur avec des privilèges restreint au niveau de la base de données
Création d'une règle pour les mots de passe afin de garantir un niveau minimum de sécurité, en plus du hashage
Validation de l'adresse mail
Limitation du nombre de tentatives de login
Vérification des inputs afin d'éviter les injections
Vérification supplémentaire de l'authentification avant requête de suppression