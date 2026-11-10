const { EmbedBuilder } = require('discord.js');

const notAllowed = (description) => ({
    embeds: [new EmbedBuilder({ title: "❌ Not Allowed", description }).setColor("Red")]
});

module.exports = async (client, message) => {
    const prefix = client.prefix || "-";

    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/\s+/), commandName = args.shift()?.toLowerCase(), aliasName = client.aliases.get(commandName);
    const command = client.messageCommands.get(aliasName || commandName);

    if (!command) return;

    const permissions = message.member?.permissions;

    if (command.category === "owner" && !client.owners.includes(message.author.id)) return message.reply(notAllowed("You do not have enough permissions to use this command"));

    if (command.category === "admin" && !permissions?.has("ManageGuild")) return message.reply(notAllowed("You do not have enough permissions to use this command"));

    if (command.permissions?.length > 0 && !command.permissions.some(v => permissions?.has(v))) return message.reply(notAllowed(`You do not have any of the required permissions to use this command, required permissions : ${command.permissions.join(", ")}`));

    const t = client.timeouts.get(`${message.author.id}_${command.data.name}`) || 0;

    if (Date.now() - t < 0) return message.react("⏰");

    client.timeouts.set(`${message.author.id}_${command.data.name}`, Date.now() + (command.timeout || 0));

    try {
        await command.run(client, message, args);
    } catch (e) {
        console.error(e);
        message.reply({ content: "There was an issue in executing the command" }).catch(() => { });
    }
}
