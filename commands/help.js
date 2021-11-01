const {
    SlashCommandBuilder
} = require('@discordjs/builders');

const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Sends a message into your DMs!'),
    async execute(interaction) {

        let HelpembedDescContent =
            "**Commands:** \n \n" +

            "`*give @user @role` - Give a role to someone. **[Specific Channel required]** \n \n" +

            "`*remove @user @role` - Remove a role from someone. **[Specific Channel required]** \n \n" +

            "`*plan [time]` - Plan a Pick up Game -> **This is not publicly available yet!** \n \n" +

            "`*poll [suggestion]` - An easy way to let people vote.\n \n" +

            "`*teams` - Get an overview of all 2ez Overwatch Teams. \n \n" +

            "`*info` - 2ez Summer games Countdown \n \n " +

            "`*members` - Quick Membercount of 2ez \n \n" +

            "More to come... \n \n" +

            "`2ez Bot` is an open source Discord Bot developed by Marwin and Turbo. \n \n" +

            "Github Repository : [Click here](https://github.com/2ez-Community/2ez-bot)";

        const helpembed = new MessageEmbed()
            .setTitle('2ez Discord Bot')
            .setDescription(HelpembedDescContent)
            .setColor('BLUE')

        await interaction.user.send({
            embeds: [helpembed]
        });

        interaction.reply({
            content: "A message has been sent into your DMs!",
            ephemeral: true,
        })
    },
};