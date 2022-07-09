// A Package to convert MS time to human readable time
const { default: ms } = require('ms-prettify');

// The interaction create function handler
module.exports = async (client, interaction) => {
    try {
        // If its not a command interaction ignore
        if (!interaction.isCommand()) return;

        // Getting the command
        const command = client.commands.get(interaction.commandName),
            // Getting guild member data
            member = interaction.guild.members.cache.get(interaction.member.id);

        // If not a valid command then ignore
        if (!command) return;

        // If user do not have enough permissions ignore
        if (command.permissions?.length > 0 && !(command.permissions.some(v => member.permissions.has(v)))) return interaction[interaction.replied || interaction.deferred ? "followUp" : "reply"]({
            content: `You do not have any of the required permissions to use this command, required permissions : ${command.permissions.join(", ")}`
        })

        // Getting the timeout
        const t = client.timeouts.get(`${interaction.user.id}_${command.name}`) || 0;

        // If user is on a timeout inform them
        if (Date.now() - t < 0) return interaction[interaction.replied || interaction.deferred ? "followUp" : "reply"]({ content: `You are on a timeout of ${ms(t - Date.now(), { till: 'second' })}` });

        // Set a timeout
        client.timeouts.set(`${interaction.user.id}_${command.name}`, Date.now() + (command.timeout || 0));

        // Starting the command
        command.run(client, interaction);
    } catch (e) {
        // Catch any error
        console.log(e);

        // Inform the user that command broke
        interaction[interaction.replied || interaction.deferred ? "followUp" : "reply"]({ content: "There was an issue in executing the command" });
    }
}