// Importing the  libraries / packages
const Discord = require('discord.js');
const fs = require('fs');
const { config } = require('dotenv');

// Setting up the enviroment variables.
config();

// Creating the client
const client = new Discord.Client({
    // Adding the intnet property
    intents: new Discord.Intents().add('GUILDS', 'GUILD_MESSAGES') /* Adding the intents */
});

// Handling the events
fs.readdirSync('./src/events').filter(v => v.endsWith(".js")).forEach(v => {
    // Adding listener for the event.
    client.on(v.substring(0, v.length - 3), (a, b, c, d) => require(`./events/${v}`)(client, a, b, c, d));
});

// Logging the client in
client.login(process.env.TOKEN);