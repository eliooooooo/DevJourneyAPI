const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const crypto = require('crypto');

const User = require('./Models/userModel');
const Level = require('./Models/levelModel');

dotenv.config();
let db_user = process.env.DB_USER;
let db_password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${db_user}:${db_password}@cluster0.xrv5p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();
app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
}));

// On the server, start the process by: nohup node server.js & (pkill node)
mongoose.connect(uri)
.then(() => {
    console.log('Connexion à la base de données réussie');
    // Démarrage du serveur
    app.listen(3333, () => {
        console.log('Serveur démarré sur le port 3333');
    });
})
.catch((error) => {
    console.error('Erreur de connexion à la base de données', error);
});