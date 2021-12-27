const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');
const mongoose = require('mongoose');
const TeamBlacklistSchema = require('../schemas/TeamBlacklistSchema');

//This code has been written by me, Marwin!

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-team-to-blacklist')
        .setDescription('Add a Team to the 2ez Blacklist Database!')
        .addStringOption(option => option.setName('team-name').setDescription('The Name of the Team!').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason why you want to blacklist this team!').setRequired(true))
        .addStringOption(option => option.setName('sr').setDescription('The SR of the Team!'))
        .addStringOption(option => option.setName('manager-discord').setDescription('The Discord-Tag of the Manager!'))
        .addStringOption(option => option.setName('captain-discord').setDescription('The Discord-Tag of the Captain!')),

    async execute(interaction, client) {

        await mongoose.connect(process.env.MONGODB_SRV).then(

            console.log('AddTeamBlacklist.js connection established!')

        );

        const TeamName = interaction.options.getString('team-name');
        const Reason = interaction.options.getString('reason');
        const SR = interaction.options.getString('sr');
        const ManagerDiscord = interaction.options.getString('manager-discord');
        const CaptainDiscord = interaction.options.getString('captain-discord');

        console.log(`Info: 	
        Team-Name: ${TeamName} 
        Reason: ${Reason}
        SR: ${SR}
        Manager-Discord: ${ManagerDiscord}
        Captain-Discord: ${CaptainDiscord}
		Author: ${interaction.member.user.username}
        
        `);

        await new TeamBlacklistSchema({
            teamname: TeamName,
            reason: Reason,
            sr: SR,
            managerdiscord: ManagerDiscord,
            captaindiscord: CaptainDiscord,
            author: interaction.member,
        }).save()

        await mongoose.connection.close().then(

            console.log(`AddTeamBlacklist.js connection has been closed!`)

        );

        const SavedEmbed = new MessageEmbed()
            .setTitle(`${TeamName} has been added to the blacklist!`)
            .setDescription('To search for a team, use the `/find-team-from-blacklist` command!')
            .setColor('BLURPLE');

        interaction.reply({
            content: `Your team has been added to the 2ez Blacklist Database!`,
            embeds: [
                SavedEmbed,
            ]
        });

    },
};