const { EmbedBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
    if (!interaction.customId) return;

    const [commandName, ...args] = interaction.customId.split("-");

    const command = client.buttons.get(commandName);

    if (!command) return;

    
    if (command.category === "owner" && !client.owners.includes(interaction.user.id)) return interaction.reply({
        embeds: [
            new EmbedBuilder({
                title: "❌ Not Allowed",
                description: "You do not have enough permissions to use this command"
            }).setColor("Red")
        ]
    });

    if (command.category === "admin" && !member.permissions.has("ManageGuild")) return interaction.reply({
        embeds: [
            new EmbedBuilder({
                title: "❌ Not Allowed",
                description: "You do not have enough permissions to use this command"
            }).setColor("Red")
        ]
    });

    if (command.permissions?.length > 0 && !(command.permissions.some(v => member.permissions.has(v)))) return interaction.reply({
        embeds: [new EmbedBuilder({
            title: "❌ Not Allowed",
            description: `You do not have any of the required permissions to use this command, required permissions : ${command.permissions.join(", ")}`
        }).setColor("Red")],
    });

    const t = client.timeouts.get(`${interaction.user.id}_${command.data.name}`) || 0;

    if (Date.now() - t < 0) return interaction.reply({ content: `You are on a timeout of ${ms(t - Date.now(), { till: 'second' })}` });

    client.timeouts.set(`${interaction.user.id}_${command.data.name}`, Date.now() + (command.timeout || 0));

    await command.run(client, interaction, args);
}