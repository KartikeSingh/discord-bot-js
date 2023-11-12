// Imports
const { join } = require('path');
const { readdirSync } = require('fs');

const Discord = require('discord.js');
const commandTypes = ["commands", "messageCommands", "buttons"];

module.exports = class Client extends Discord.Client {
    events = readdirSync(join(__dirname, "../events"));
    categories = readdirSync(join(__dirname, "../commands"));

    owners = ["723049421021118535"];

    commands = new Discord.Collection();
    messageCommands = new Discord.Collection();
    aliases = new Discord.Collection();
    buttons = new Discord.Collection();
    timeouts = new Discord.Collection();

    constructor(options) {
        super(options);

        for (let i = 0; i < this.categories.length; i++) {
            const commands = readdirSync(join(__dirname, `../commands/${this.categories[i]}`));

            for (let j = 0; j < commands.length; j++) {
                const command = require(`../commands/${this.categories[i]}/${commands[j]}`);

                if (!command || !command.run || !command.data) continue;

                command.category = this.categories[i];

                if (command.alias) command.alias.forEach(alias => this.aliases.set(alias, command.data.name))

                this[commandTypes[command.type] || commandTypes[0]].set(command.data.name, command);
            }
        }

        for (let i = 0; i < this.events.length; i++) {
            const event = require(`../events/${this.events[i]}`);

            if (typeof event !== "function") continue;

            this.on(this.events[i].split(".")[0], (...args) => event(this, ...args));
        }
    }
}