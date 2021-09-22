// Importing the  libraries / packages
const { Handler } = require('discord-slash-command-handler');
const { Client } = require('discord.js');

/**
 * The ready event of the bot.
 * @param {Client} client 
 */
module.exports = (client) => {
    // Creating the handler.
    // For more information about the handler => https://www.npmjs.com/package/discord-slash-command-handler
    client.handler = new Handler(client, {
        // The prefix of the bot
        prefix: process.env.PREFIX || "!",

        // The location where all the commands are added
        commandFolder: '/commands',

        // folder => commands are inside another folder, type file if they are files.
        commandType: "folder",

        // Automatically handle the normal commands
        handleNormal: true,

        // Automatically handle the slash commands
        handleSlash: true,

        // Add ypour mongo URI for timeout connection to database.
        mongoURI: process.env.MONGO_URI,

        // Handle the timeouts
        timeout: true,

        // The array of owner's Discord ID
        owners: process.env.OWNERS?.split(","),

        // The guilds to use for guild only slash commands
        slashGuilds: process.env.GUILDS?.split(","),

        // Automatically add all commands as Slash Commands
        allSlash: true,
    });

    console.log("Bot is online.");
}