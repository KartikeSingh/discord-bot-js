module.exports = async (client) => {
    console.log(`${client.user.tag} is online!`);

    try {
        await client.application.commands.set(client.commands.map(v => v.data));
    } catch (e) {
        console.error("Failed to register slash commands:", e);
    }
}
