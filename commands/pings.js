const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with the ping of the bot!'),
    async execute(interaction, client) {
        await interaction.reply(`Websocket Ping: **99** ms.`);
    },
};