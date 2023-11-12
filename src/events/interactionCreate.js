const { EmbedBuilder } = require('discord.js');
const { default: ms } = require('ms-prettify');

module.exports = async (client, interaction) => {
    try {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName), member = interaction.guild.members.cache.get(interaction.member.id);

        if (!command || (!command.dm && !interaction.guild)) return;

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

        let sub;

        try {
            sub = interaction.options.getSubcommand();
        } catch (e) {
            sub = "";
        }

        const t = client.timeouts.get(`${interaction.user.id}_${command.data.name}_${sub}`) || 0;

        if (Date.now() - t < 0) return interaction.reply({ content: `You are on a timeout of ${ms(t - Date.now(), { till: 'second' })}` });

        client.timeouts.set(`${interaction.user.id}_${command.data.name}_${sub}`, Date.now() + (command.timeout || 0));

        command.run(client, interaction);
    } catch (e) {
        console.log(e);
        interaction.reply({ content: "There was an issue in executing the command" });
    }
}