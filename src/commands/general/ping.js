const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    data: {
        name: "ping",
        description: "Check the client's ws ping",
        options: [],
    },
    timeout: 1000,

    run: async (client, interaction) => {
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("🏓 Pong")
                    .setDescription(`Client's ping is \`${client.ws.ping}\`ms`)
            ],
            components: [
                new ActionRowBuilder({
                    components: [
                        new ButtonBuilder({
                            customId: `pingButton-${interaction.user.id}`,
                            style: 1,
                            label: "Ping",
                        })
                    ]
                })
            ]
        })
    }
}