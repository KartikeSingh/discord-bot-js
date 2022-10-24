// Load enviroment variables
require('dotenv').config();

// Imports
const { GatewayIntentBits } = require('discord.js');
const Client = require('./utility/Client');

// HTTP server setup
const app = (require('express'))();

app.get('/', (req, res) => res.sendStatus(200));

app.listen(process.env.PORT || 3001);

// Database setup
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Database Connected")).catch(() => console.log("Database Connection Failed"))

// Discord Client Setup
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login(process.env.TOKEN);