const { EmbedBuilder, MessageFlags } = require('discord.js');
const { default: ms } = require('ms-prettify');

const notAllowed = (description) => ({
    embeds: [new EmbedBuilder({ title: "❌ Not Allowed", description }).setColor("Red")],
    flags: MessageFlags.Ephemeral,
});

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName), permissions = interaction.memberPermissions;

    if (!command || (!command.dm && !interaction.inGuild())) return;

    try {
        if (command.category === "owner" && !client.owners.includes(interaction.user.id)) return interaction.reply(notAllowed("You do not have enough permissions to use this command"));

        if (command.category === "admin" && !permissions?.has("ManageGuild")) return interaction.reply(notAllowed("You do not have enough permissions to use this command"));

        if (command.permissions?.length > 0 && !command.permissions.some(v => permissions?.has(v))) return interaction.reply(notAllowed(`You do not have any of the required permissions to use this command, required permissions : ${command.permissions.join(", ")}`));

        const sub = interaction.options.getSubcommand(false) || "";

        const t = client.timeouts.get(`${interaction.user.id}_${command.data.name}_${sub}`) || 0;

        if (Date.now() - t < 0) return interaction.reply({ content: `You are on a timeout of ${ms(t - Date.now(), { till: 'second' })}`, flags: MessageFlags.Ephemeral });

        client.timeouts.set(`${interaction.user.id}_${command.data.name}_${sub}`, Date.now() + (command.timeout || 0));

        await command.run(client, interaction);
    } catch (e) {
        console.error(e);
        const payload = { content: "There was an issue in executing the command", flags: MessageFlags.Ephemeral };
        (interaction.replied || interaction.deferred ? interaction.followUp(payload) : interaction.reply(payload)).catch(() => { });
    }
}
