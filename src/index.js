// Importing the  libraries / packages

// Discord package for interacting with discord api
const Discord = require('discord.js');

// File System package for reading files/folders
const fs = require('fs');

// Setting up the enviroment variables from .env file
require('dotenv').config();

// Creating the client (discord bot)
const client = new Discord.Client({
    // Adding the intnet property
    intents: ["GUILDS"] /* Adding the intents */
});

// Handling the events

// Reading the events folder
fs.readdirSync('./src/events').filter(v => v.endsWith(".js"))
    // Looping through each file inside events folder
    .forEach(v => {
        // Importing the event file
        const handler = require(`./events/${v}`);

        // Ignoring if its not a function
        if (typeof handler === 'function') return console.log(`events/${v} is not exporting a function`);

        // Adding listener for the event.
        client.on(v.split(".")[0], (...args) => handler(client, ...args));
    });

// Logging the client in
client.login(process.env.TOKEN);