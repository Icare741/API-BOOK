# API de Gestion des Utilisateurs et des Livres

Ce projet est une API RESTful construite avec NestJS pour gérer les utilisateurs et les livres. Elle inclut l'authentification des utilisateurs et des opérations CRUD pour les livres.

## Fonctionnalités

- Authentification des utilisateurs
- Gestion des utilisateurs (CRUD)
- Gestion des livres (CRUD)
- Base de données MySQL
- Dockerisé pour un déploiement facile

## Prérequis

- Node.js (v14 ou supérieur)
- Docker et Docker Compose
- npm ou yarn

## Installation

1. Clonez le dépôt :
   ```
   git clone https://github.com/votre-username/votre-repo.git
   cd votre-repo
   ```

2. Installez les dépendances :
   ```
   npm install
   ```

3. Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement nécessaires :
   ```
   DB_HOST=votre_host
   DB_PORT=votre_port
   DB_USERNAME=votre_username
   DB_PASSWORD=votre_password
   DB_DATABASE=votre_database
   ```

## Lancement de l'application

### Avec Docker

1. Construisez et lancez les conteneurs :
   ```
   docker-compose up --build
   ```

2. L'API sera accessible à l'adresse : `http://localhost:3001`

### Sans Docker

1. Assurez-vous que votre base de données MySQL est en cours d'exécution et accessible.

2. Lancez l'application :
   ```
   npm run start:dev
   ```

3. L'API sera accessible à l'adresse : `http://localhost:3000`

## Utilisation de l'API

Voici quelques exemples de requêtes que vous pouvez effectuer :

- Créer un utilisateur :
  ```
  curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"username": "testuser", "password": "password123"}'
  ```

- Se connecter (obtenir un token) :
  ```
  curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"username": "testuser", "password": "password123"}'
  ```

- Créer un livre (nécessite un token) :
  ```
  curl -X POST http://localhost:3000/books -H "Content-Type: application/json" -H "Authorization: Bearer VOTRE_TOKEN" -d '{"title": "Mon Livre", "author": "Auteur Test", "description": "Description du livre"}'
  ```

## Tests

Pour lancer les tests :
