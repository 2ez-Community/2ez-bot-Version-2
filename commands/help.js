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

            "`/schedule` - Create a schedule to let your mates show if they are available! \n \n" +

            "`/schedulepreset` - Load a schedule which has been saved by you! \n \n" +

            "`/schedule-set-autoresend` - This will send your saved schedule everyday at 11 CET \n \n" +

            "`/give` - Give a role to someone. \n \n" +

            "`/remove` - Remove a role from someone. \n \n" +

            "`/teams` - Get an overview of all 2ez Overwatch Teams. \n \n" +

            "`/add-player-to-blacklist` - Add a Player to the 2ez Blacklist Database! \n \n" +

            "`/find-player-from-blacklist ` - Check if your mentioned player happens to be the Blacklist! \n \n" +

            "`/add-team-to-blacklist` - Add a Team to the 2ez Blacklist Database! \n \n" +

            "`/find-team-from-blacklist` - Check if your team mentioned happens to be the Blacklist! \n \n" +

            "`/team-request-from-list` - Search a 2ez Overwatch Team on the 2ez Team List! \n \n" +

            "`/team-add-to-list` - Add your team to the Database so others can look at it! \n \n" +

            "`/team-remove-player-from-list` - Remove a player from your Teamlist! \n \n" +

            "`/team-update-list` - Update your team list on the Database! \n \n" +

            "More to come... \n \n" +

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
