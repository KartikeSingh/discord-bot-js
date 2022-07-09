// Exporting the command
module.exports = {
    // Information of the command
    data: {
        // The name of the command
        name: "ping",

        // Description of this comand
        description: "Get ping of the client",

        // Command options, more info https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
        options: [{
            name: "ephemeral", // Option's name, 1 to 32 characters (lowered case letters, o special symbols except - or _)
            description: "Whether the message should be ephemeral or not", // The option's description, max 100 character
            type: 5, // or type "BOOLEAN", for more info https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
            required: false, // If this option is compulsory to fill
        }]
    },

    // The main command
    run: async (client, interaction) => {
        // Getting the ephemeral option's value
        const ephemeral = interaction.options.getBoolean("ephemeral") || false; // || false, so that if no value is provided then consider it false

        // Sending a reply
        interaction.reply({
            content: "pong!", // The message text
            ephemeral, // we don't have to do ephemeral: ephemeral, because name is same
        });
    }
}