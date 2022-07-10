// Importing the  libraries / packages
// Discord package for interacting with discord api
const { Client, Collection } = require('discord.js');

// File System package for reading files/folders
const { readdirSync } = require('fs');

// Package to create valid file paths
const { join } = require('path');

// Setting up the enviroment variables from .env file
require('dotenv').config();

// Creating the client (discord bot)
const client = new Client({
    // Adding the intnet property
    intents: ["GUILDS"] /* Adding the intents */
});

// Client's addons
client.commands = new Collection();
client.timeouts = new Collection();
client.categories = readdirSync(join(__dirname, "./commands"));

// Handling the events
// Reading the events folder
readdirSync('./src/events').filter(v => v.endsWith(".js"))
    // Looping through each file inside events folder
    .forEach(v => {
        // Importing the event file
        const handler = require(`./events/${v}`);

        // Ignoring if its not a function
        if (typeof handler !== 'function') return console.log(`events/${v} is not exporting a function`);

        // Adding listener for the event.
        client.on(v.split(".")[0], (...args) => handler(client, ...args));
    });

// Command Handler
// Reading the commands folder
for (let i = 0; i < client.categories.length; i++) {
    // Getting all the commands of the folder
    const commands = readdirSync(join(__dirname, `./commands/${client.categories[i]}`)).filter(file => file.endsWith(".js"));

    // Reading all the files of the folder
    for (let j = 0; j < commands.length; j++) {
        // Importing the command
        const command = require(`./commands/${client.categories[i]}/${commands[j]}`);

        // Ignoring if invalid command
        if (!command || !command?.data?.name || typeof (command?.run) !== "function") {
            console.log(`commands/${client.categories[i]}/${commands[j]} is a invalid command`);
            continue;
        }

        // Adding the command category
        command.category = client.categories[i];

        // Setting the command
        client.commands.set(command.data.name, command);
    }
}

// Logging the client in
client.login(process.env.TOKEN);