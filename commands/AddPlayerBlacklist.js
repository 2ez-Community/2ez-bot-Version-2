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


		const BattleTag = interaction.options.getString('battle-tag');

		const DiscordTag = interaction.options.getString('discord-tag');

		const DiscordID = interaction.options.getString('discord-id');

		const Reason = interaction.options.getString('blacklist-reason');

		if (!BattleTag.includes('#')) {
			interaction.reply({
				content: `${BattleTag} doesn't seem like a valid Battle Tag! Your Battle Tag has to include a **#**`,
				ephemeral: true
			});

			return;
		};

		if (!DiscordTag.includes('#')) {
			interaction.reply({
				content: `${DiscordTag} doesn't seem like a valid Discord Tag! Your Discord Tag has to include a **#**`,
				ephemeral: true
			});

			return;
		};

		if (isNaN(DiscordID)) {
			interaction.reply({
				content: `${DiscordID} doesn't seem like a valid Discord ID! A Discord ID consists of 18 Numbers!!`,
				ephemeral: true
			});

			return;
		}

		const SmallBTag = BattleTag.toLowerCase();
		const SmallDiscTag = DiscordTag.toLowerCase();

		try {

			const PlayerDiscordResult = await PlayerBlacklistSchema.findOne({
				"discordtag": {
					$regex: new RegExp(SmallDiscTag, "i")
				},

			});

			const PlayerBattleResult = await PlayerBlacklistSchema.findOne({
				"btag": {
					$regex: new RegExp(SmallBTag, "i")
				},

			});

			if (PlayerDiscordResult) {

				interaction.reply(`${DiscordTag} was already found on the blacklist!`)
				return;
			};

			if (PlayerBattleResult) {

				interaction.reply(`${BattleTag} was already found on the blacklist!`)
				return;
			};

		} catch (e) {

			console.log('Error fetching players before adding one to the blacklist!', e);
			return;

		};

		await new PlayerBlacklistSchema({
			btag: SmallBTag,
			discordtag: SmallDiscTag,
			discordid: DiscordID,
			reason: Reason,
			author: interaction.member,
			authorusername: interaction.memer,
			message: Reason,
		}).save();

		const SavedEmbed = new MessageEmbed()
			.setTitle(`${BattleTag} has been added to the blacklist!`)
			.setColor('BLURPLE');

		if (DiscordID) {

			SavedEmbed.setDescription(`
			Battle Tag: ${BattleTag}

			Discord Tag: ${DiscordTag}

			Discord ID: ${DiscordID}

			Reason for the blacklist: **${Reason}**
			`);

		} else {

			SavedEmbed.setDescription(`
			Battle Tag: ${BattleTag}

			Discord Tag: ${DiscordTag}

			Reason for the blacklist: **${Reason}**
			`);

		};

		interaction.reply({
			content: `Your player has been added to the 2ez Database!`,
			embeds: [
				SavedEmbed,
			]
		});

	},
};