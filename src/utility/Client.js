// Imports
const { join } = require('path');
const { readdirSync } = require('fs');

const Discord = require('discord.js');
const commandTypes = ["commands", "messageCommands", "buttons"];

// Only list real entries (skips .DS_Store and other hidden/non-JS files)
const listDirs = (path) => readdirSync(path, { withFileTypes: true }).filter(d => d.isDirectory() && !d.name.startsWith(".")).map(d => d.name);
const listJs = (path) => readdirSync(path).filter(f => f.endsWith(".js"));

module.exports = class Client extends Discord.Client {
    events = listJs(join(__dirname, "../events"));
    categories = listDirs(join(__dirname, "../commands"));

    owners = ["723049421021118535"];

    commands = new Discord.Collection();
    messageCommands = new Discord.Collection();
    aliases = new Discord.Collection();
    buttons = new Discord.Collection();
    timeouts = new Discord.Collection();

    constructor(options) {
        super(options);

        for (const category of this.categories) {
            for (const file of listJs(join(__dirname, `../commands/${category}`))) {
                const command = require(`../commands/${category}/${file}`);

                if (!command || !command.run || !command.data) continue;

                command.category = category;

                if (command.alias) command.alias.forEach(alias => this.aliases.set(alias, command.data.name));

                this[commandTypes[command.type] || commandTypes[0]].set(command.data.name, command);
            }
        }

        for (const file of this.events) {
            const event = require(`../events/${file}`);

            if (typeof event !== "function") continue;

            this.on(file.split(".")[0], (...args) => event(this, ...args));
        }
    }
}
