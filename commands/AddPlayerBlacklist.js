const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const {
	MessageEmbed
} = require('discord.js');
const mongoose = require('mongoose');
const PlayerBlacklistSchema = require('../schemas/PlayerBlacklistSchema');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-player-to-blacklist')
		.setDescription('Add a Player to the 2ez Blacklist Database!')
		.addStringOption(option => option.setName('battle-tag').setDescription('The Battle Tag of the Player!').setRequired(true))
		.addStringOption(option => option.setName('discord-tag').setDescription('The Discord Tag!').setRequired(true))
		.addStringOption(option => option.setName('blacklist-reason').setDescription('Why should this player be blacklisted?').setRequired(true))
		.addStringOption(option => option.setName('discord-id').setDescription('The Discord ID of the player!')),
	async execute(interaction, client) {

		await mongoose.connect(process.env.MONGODB_SRV).then(

			console.log('AddPlayerBlacklist.js connection established!')

		);

		const BattleTag = interaction.options.getString('battle-tag');

		const DiscordTag = interaction.options.getString('discord-tag');

		const DiscordID = interaction.options.getString('discord-id');

		const Reason = interaction.options.getString('blacklist-reason');

		if (!BattleTag.includes('#')) {
			interaction.reply({
				content: `${BattleTag} doesn't seem like a valid Battle Tag!`,
				ephemeral: true
			});

			await mongoose.connection.close().then(

				console.log(`AddPlayerBlacklist.js connection has been closed!`)

			);

			return;
		};

		if (!DiscordTag.includes('#')) {
			interaction.reply({
				content: `${DiscordTag} doesn't seem like a valid Discord Tag!`,
				ephemeral: true
			});

			await mongoose.connection.close().then(

				console.log(`AddPlayerBlacklist.js connection has been closed!`)

			);

			return;
		};

		if (isNaN(DiscordID)) {
			interaction.reply({
				content: `${DiscordID} doesn't seem like a valid Discord ID! A Discord ID consists of 18 Numbers!!`,
				ephemeral: true
			});

			await mongoose.connection.close().then(

				console.log(`AddPlayerBlacklist.js connection has been closed!`)

			);

			return;
		}

		console.log(`Info: 
			Battle-Tag: ${BattleTag} 
			Discord-Tag: ${DiscordTag}
			Discord-ID: ${DiscordID}
			Reason: ${Reason}
			Author: ${interaction.member.user.username}
		`);

		await new PlayerBlacklistSchema({
			btag: BattleTag,
			discordtag: DiscordTag,
			discordid: DiscordID,
			reason: Reason,
			author: interaction.member,
			authorusername: interaction.memer,
			message: Reason,
		}).save()

		await mongoose.connection.close().then(

			console.log(`AddPlayerBlacklist.js connection has been closed!`)

		);

		const SavedEmbed = new MessageEmbed()
			.setTitle(`${BattleTag} has been added to the blacklist!`)
			.setDescription('To search for a player, use the `/find-player-from-blacklist` command!')
			.setColor('BLURPLE');

		interaction.reply({
			content: `Your player has been added to the 2ez Database!`,
			embeds: [
				SavedEmbed,
			]
		});

	},
};