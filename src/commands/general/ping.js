// Exporting the command
module.exports = {
    name: "ping",          // The name of the command
    aliases: [],           // The array of command aliases
    args: "",      // The arguments of the command
    category: "general",   // The category to which this command belongs
    // The description of the command
    description: "Shows client commands and other required stuff",
    slash: "both",         // Whether the command is slash (true) or normal (false) or both
    timeout: 1000,         // Timeout in milliseconds
    global: false,         // If the slash command is global

    // the main method.
    run: async ({ message }) => {
        message.reply("pong!");
    }
}