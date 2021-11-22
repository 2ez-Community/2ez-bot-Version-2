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

            "`/schedule` -Create a schedule to let your mates show if they are available! \n \n" +

            "`/schedulepreset` -Load a schedule which has been saved by you! \n \n" +

            "`/give` - Give a role to someone. \n \n" +

            "`/remove` - Remove a role from someone. \n \n" +

            "`/teams` - Get an overview of all 2ez Overwatch Teams. \n \n" +

            "More to come... \n \n" +

            "The old `2ez Bot` (*help) features more commands! \n \n" +

            "`2ez Bot V2` is an open source Discord Bot developed by Marwin and Turbo. \n \n" +

            "Github Repository : [Click here](https://github.com/2ez-Community/2ez-bot-Version-2)";

        let SupportEmbedDescContent =
            " This Bot is made possible due to our amazing donators! \n \n" +
            "Thank you `Shadowss#5513`, `MidoriRyuu#1222` and `hjortsater#0890` \n \n" +
            "Thank you for being awesome! ❤";

        const helpembed = new MessageEmbed()
            .setTitle('2ez Discord Bot')
            .setDescription(HelpembedDescContent)
            .setColor('BLUE')

        const supportEmbed = new MessageEmbed()
            .setTitle('One more thing!')
            .setDescription(SupportEmbedDescContent)
            .setColor('RED')

        await interaction.user.send({
            embeds: [helpembed, supportEmbed]
        });

        interaction.reply({
            content: "A message has been sent into your DMs!",
            ephemeral: true,
        })
    },
};