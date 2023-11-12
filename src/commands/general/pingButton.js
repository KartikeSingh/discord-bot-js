const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    data: {
        name: "pingButton",
        description: "Ping button boi",
        options: [],
    },
    timeout: 1000,
    type: 2, // IMPORTANT

    run: async (client, interaction, args) => {
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("🏓 Pong")
                    .setDescription(`Client's ping is \`${client.ws.ping}\`ms, button of <@${args[0]}>`)
            ],
        })
    }
}