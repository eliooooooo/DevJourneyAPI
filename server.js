const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const crypto = require('crypto');

const Category = require('./models/categoryModel');
const Event = require('./models/eventModel');
const Pass = require('./models/passModel');
const Showtime = require('./models/showtimeModel');
const User = require('./models/userModel');
const Program = require('./models/programModel');

dotenv.config();
let db_user = process.env.DB_USER;
let db_password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${db_user}:${db_password}@mongotable.rbtmi.mongodb.net/?retryWrites=true&w=majority&appName=MongoTable`;

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