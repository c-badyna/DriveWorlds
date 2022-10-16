const { EmbedBuilder } = require("@discordjs/builders");

module.exports = {
    name: 'interactionCreate',

    async execute(client, interaction) {
        if (!interaction.isCommand()) return;
        if (!interaction.guild) return;

        const cmd = client.commands.get(interaction.commandName)
        if (!cmd) return;

        cmd.execute(client, interaction)
    }
}