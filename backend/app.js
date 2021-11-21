const express = require('express');
const mysql = require('mysql'); // base de donnée
const { Sequelize } = require('sequelize');
const helmet = require('helmet'); //pour une meilleure sécurité des cookies
const session = require('cookie-session');
const nocache = require('nocache');

// On donne accès au chemin de notre système de fichier
const path = require('path');

// Ajouter les variables .env
require('dotenv').config()
const DB = process.env;

require("./database/dbConnection");

// activer express
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Transforme les données arrivant de la requête POST en un objet JSON facilement exploitable
// Remplaçant de bodyParser
app.use(express.json());

// Middleware qui permet de parser les requêtes envoyées par le client, on peut y accéder grâce à req.body
app.use(express.urlencoded({
    extended: true
}));

// utilisation du module 'helmet' pour la sécurité en protégeant l'application de certaines vulnérabilités
// sécurise : 
// requêtes HTTP, entêtes, protection XSS mineure, ...
app.use(helmet());

// Options pour sécuriser les cookies
const expiryDate = new Date(Date.now() + 3600000); // 1 heure (60 * 60 * 1000)
app.use(session({
    name: 'session',
    secret: process.env.SEC_SES,
    cookie: {
        secure: true,
        httpOnly: true,
        domain: 'http://localhost:3000',
        expires: expiryDate
    }
}));


//Désactive la mise en cache du navigateur
app.use(nocache());

/**************************************************************************/

// A ACTIVER QUAND TOUTES LES ROUTES ET MODELS SERONT FAITS !! 

// app.use('/api/auth', userRoutes);
// app.use('/api/auth', postRoutes);
// app.use('/api/auth', commentRoutes);
// app.use('/api/auth', likeRoutes);

/**************************************************************************/


//exportation de app.js
module.exports = app;