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

// Users routes

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/users/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/users/:userId', async (req, res) => {
    try {
        const user = await User
        .findOneAndUpdate({ userId: req.params.userId }, req.body, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/users/:userId', async (req, res) => {
    try {
        const user = await User
        .findOneAndDelete({ userId: req.params.userId });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Levels routes

app.get('/levels', async (req, res) => {
    try {
        const levels = await Level.find();
        res.json(levels);
    } catch (error) {
        res.status(500).send
    }
});

app.post('/levels', async (req, res) => {
    try {
        const level = new Level(req.body);
        await level.save();
        res.status(201).send(level);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/levels/:levelId', async (req, res) => {
    try {
        const level = await Level.findOne({ levelId: req.params.levelId });
        if (!level) {
            return res.status(404).send('Level not found');
        }
        res.json(level);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/levels/:levelId', async (req, res) => {
    try {
        const level = await Level
        .findOneAndUpdate({ levelId: req.params.levelId },Level, { new: true });
        if (!level) {
            return res.status(404).send('Level not found');
        }
        res.json(level);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/levels/:levelId', async (req, res) => {
    try {
        const level = await Level
        .findOneAndDelete({ levelId: req.params.levelId });
        if (!level) {
            return res.status(404).send('Level not found');
        }
        res.json(level);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Authentification routes

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).select('+password');
        if (!user) {
            return res.status(404).send('User not found');
        }
        const hash = crypto.createHash('sha256');
        hash.update(req.body.password);
        const password = hash.digest('hex');
        if (user.password !== password) {
            return res.status(401).send('Invalid password');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        const hash = crypto.createHash('sha256');
        hash.update(user.password);
        user.password = hash.digest('hex');
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

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