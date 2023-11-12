module.exports = async (client, message) => {
    const prefix = client.prefix || "-";

    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/\s+/), commandName = args.shift()?.toLowerCase(), aliasName = client.aliases.get(commandName);
    const command = client.messageCommands.get(aliasName || commandName);

    if (!command) return;
    
    if (command.category === "owner" && !client.owners.includes(message.author.id)) return message.reply({
        embeds: [
            new EmbedBuilder({
                title: "❌ Not Allowed",
                description: "You do not have enough permissions to use this command"
            }).setColor("Red")
        ]
    });

    if (command.category === "admin" && !member.permissions.has("ManageGuild")) return message.reply({
        embeds: [
            new EmbedBuilder({
                title: "❌ Not Allowed",
                description: "You do not have enough permissions to use this command"
            }).setColor("Red")
        ]
    });

    if (command.permissions?.length > 0 && !(command.permissions.some(v => member.permissions.has(v)))) return message.reply({
        embeds: [new EmbedBuilder({
            title: "❌ Not Allowed",
            description: `You do not have any of the required permissions to use this command, required permissions : ${command.permissions.join(", ")}`
        }).setColor("Red")],
    });

    const t = client.timeouts.get(`${message.author.id}_${command.data.name}`) || 0;

    if (Date.now() - t < 0) return message.react("⏰");

    client.timeouts.set(`${message.author.id}_${command.data.name}`, Date.now() + (command.timeout || 0));

    command.run(client, message, args)
}