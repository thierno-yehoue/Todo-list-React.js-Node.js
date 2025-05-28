## Test Pratique - Application Fullstack React.js & Node.js

## Réalisé par : SEDO Thierno M. Yehouenou  
## Date de soumission: 28/05/2025  
## Technologies : React.js (frontend), Node.js + Express.js (backend), JSON File Storage  

---

## Objectif du projet

Ce projet répond au test pratique consistant à concevoir une application simple avec :

- Un front-end React.js hébergé sur un serveur VPS 1
- Un back-end Node.js (API REST) hébergé sur un serveur VPS 2
- Des routes bien définies et un code commenté mettant en avant les bonnes pratiques

---

Cette application est une Todo List moderne développée avec un frontend React et un backend Express.js, avec persistance locale via un fichier `todos.json`.

- Frontend react deploye sur Vercel : 
https://todo-list-app-git-master1-sedo-thiernos-projects-83702a03.vercel.app?_vercel_share=j9wieSfnWgg9WXit4uBbKsByONODPi6X

- Backend deploye sur Render : 
https://todo-list-app-backend-gljs.onrender.com/api/todos

Fonctionnalités

- Ajouter, modifier, compléter et supprimer des tâches
- Filtrage des tâches : Toutes / Actives / Complétées
- Communication via API REST + variables d’environnement
- Communication via API REST + variables d’environnement
- variable d'environnement : client/.env
    'REACT_APP_API_URL=https://todo-list-app-backend-gljs.onrender.com'
    Remplacer url de l'api "https://todo-list-app-backend-gljs.onrender.com" par l'address du serveur VPS2 (ex: https://vps2:5000)

## Structure du projet

todo-fullstack-app/
├── client/ # Frontend React (VPS 1)
│ ├── public/
│ ├── src/
│ └── .env # Variable d’environnement de l’API
├── server/ # Backend Node.js (VPS 2)
│ ├── index.js # Serveur Express + routes API
│ ├── todos.json # Persistance locale
│ └── package.json