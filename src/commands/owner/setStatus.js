// Exporting the command
module.exports = {
    name: "set-status",          // The name of the command
    aliases: ['status'],           // The array of command aliases
    args: "<status>",      // The arguments of the command
    category: "general",   // The category to which this command belongs
    // The description of the command
    description: "Shows client commands and other required stuff",
    slash: "both",         // Whether the command is slash (true) or normal (false) or both
    timeout: 1000,         // Timeout in milliseconds
    global: false,         // If the slash command is global

    // Options for slash commands, The handler auto generates them if not provided.
    options: [
        {
            name: "new-status",
            description: "The new status for the bot",
            required: true,
            type: "String"
        }
    ],

    // the main method.
    run: async ({ client, message, args }) => {
        client.user.setActivity({
            name: args.join(" "),
            type: "CUSTOM",
        })

        message.reply({ content: `New Status : ${args.join(" ")}` });
    }
}