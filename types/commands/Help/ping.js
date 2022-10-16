const { Client, EmbedBuilder, CommandInteraction } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Ping's bot"),
    async execute(client, interaction) {

        interaction.reply({ content: '```\n' + client.ws.ping.toFixed(8) + '\n```' })

    }
}