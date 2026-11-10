// Load enviroment variables
require('dotenv').config({ quiet: true });

// Imports
const { GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
const express = require('express');
const Client = require('./utility/Client');

if (!process.env.TOKEN) {
    console.error("Missing TOKEN in environment (see .env.example)");
    process.exit(1);
}

// HTTP server setup
const app = express();

app.get('/', (req, res) => res.sendStatus(200));

app.listen(process.env.PORT || 3001);

// Database setup
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Database Connected"))
        .catch((e) => console.error("Database Connection Failed:", e.message));
} else {
    console.warn("MONGO_URI not set, skipping database connection");
}

// Discord Client Setup
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.login(process.env.TOKEN);

process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);
