# HelloTickets  
Application web complète permettant de créer, consulter et supprimer des tickets, avec une architecture Frontend → Backend → Base de données.

---

## Présentation du projet

HelloTickets est une application web développée dans le but d’apprendre et de maîtriser une architecture complète comprenant :

- un **Frontend** statique (HTML/CSS/JS)
- un **serveur Nginx** jouant le rôle d’hébergeur + reverse proxy
- un **Backend Node.js** exposant une API REST
- une **base de données PostgreSQL**

L’objectif principal est de comprendre comment ces briques communiquent entre elles, comment structurer un projet web complet et comment gérer un environnement serveur.

> **Note importante :**  
> Les fonctionnalités dynamiques (API, base de données) ne sont pas actives sur GitHub Pages, car GitHub ne permet pas d’héberger Node.js ni PostgreSQL.  
> Le projet fonctionne entièrement en local.

---

## Fonctionnalités

- Création de tickets  
- Affichage de tous les tickets  
- Suppression d’un ticket  
- Page de statistiques (compteur de tickets)  
- Architecture complète Front → Back → DB  
- Reverse proxy avec Nginx  
- API REST en Node.js  
- Base de données PostgreSQL

---

## Architecture du projet

Frontend (HTML/CSS/JS)
↓
Nginx (reverse proxy)
↓
Backend Node.js  (API REST)
↓
Base de données PostgreSQL

---

## Technologies utilisées

### **Frontend**
- HTML5 / CSS3  
- JavaScript Vanilla  
- Nginx (hébergement + reverse proxy)

### **Backend**
- Node.js  
- Express.js  
- Dotenv  
- pg (client PostgreSQL)

### **Base de données**
- PostgreSQL  
- Table `tickets` :
  - `id` (SERIAL PRIMARY KEY)
  - `title` (TEXT)
  - `comment` (TEXT)

---

## Installation et exécution en local

A installé en pré-requis:
nginx
Node.js
PostgreSQL

Configuration de la base de données PostgreSQL
Pour exécuter le projet en local, vous devez créer une base PostgreSQL :

Ouvrir PostgreSQL (pgAdmin)
Créer une base :
CREATE DATABASE hellotickets;

Créer la table :
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    comment TEXT NOT NULL
);

Configurer le fichier .env :
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=motdepasse
DB_NAME=hellotickets

### 1) Cloner le projet

#bash
git clone https://github.com/missingnoIRL/hellotickets

2) Installer le backend

#cmd
cd hellotickets/backend
npm install

3) Créer un fichier .env dans backend/config/

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=<password>
DB_NAME=hellotickets

4) Lancer le backend

#bash
node src/server.js

5) Lancer le frontend

Ouvrir simplement : frontend/index.html
ou configurer Nginx pour servir le dossier frontend/.

### Sécurité
Le fichier .env contient des informations sensibles (mot de passe PostgreSQL).
Il est volontairement exclu du dépôt via .gitignore.