// Importing the  libraries / packages
const { Client } = require('discord.js');

/**
 * The ready event of the bot.
 * @param {Client} client 
 */
module.exports = (client) => {
    // Logging in the console
    console.log(`${client.user.tag} is online!`);

    // Uploading the commands to discord API
    client.application.commands.set([...client.commands.map(v => v.data)]);

    // Use the commented code below, If you want the command to only work in a single guild
    // client.application.commands.set([...client.commands.map(v => v.data)], "your guild id");
}