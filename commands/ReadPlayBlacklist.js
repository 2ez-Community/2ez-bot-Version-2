const {
	SlashCommandBuilder,
	inlineCode
} = require('@discordjs/builders');

const {
	MessageEmbed
} = require('discord.js');

const mongoose = require('mongoose');
const PlayerBlacklistSchema = require('../schemas/PlayerBlacklistSchema');

const dotenv = require("dotenv");
dotenv.config();

//This code has been written by me, Marwin!

module.exports = {
	data: new SlashCommandBuilder()
		.setName('find-player-from-blacklist')
		.setDescription('Check if your mentioned player happens to be on the Blacklist!')
		.addStringOption(option => option.setName('battle-tag').setDescription('Use the Battle Tag of the Player to search them on the blacklist!'))
		.addStringOption(option => option.setName('discord-tag').setDescription('Search the Player by their Discord Tag!')),
	async execute(interaction, client) {

		// if (interaction.member.id !== "420277395036176405") {

		// 	interaction.reply({
		// 		content: "This command is currently unavailable!",
		// 		ephemeral: true
		// 	});

		// 	return;

		// }

		const BigBattleTag = interaction.options.getString('battle-tag');


		const BigDiscordTag = interaction.options.getString('discord-tag');


		if (BigBattleTag) {

			const BattleTag = BigBattleTag.toLowerCase();

			const CantFindEmbed = new MessageEmbed()
				.setTitle('Good!')
				.setDescription(`Your Battle-Tag **${BattleTag}** wasn't found anywhere!`)
				.setColor('GREEN');

			const result = await PlayerBlacklistSchema.findOne({

				btag: BattleTag

			}).catch(async (e) => {

				console.log('Couldnt fetch Data from Database! Connection is probably offline!');
				console.log(e);

				interaction.reply({
					content: "Something didnt work when fetching the data!",
					ephemeral: true
				});

				return;

			});

			if (!result) {

				interaction.reply({
					content: `The Bot wasn't able to find any player with that Battle Tag!`,
					embeds: [
						CantFindEmbed,
					]
				})

				return;
			};

			const DataEmbed = new MessageEmbed()
				.setTitle(`${BattleTag}'s info on the Blacklist!`)
				.setImage(result.evidence)
				.setDescription(`
				Battle Tag: ${result.btag}

				Discord Tag: ${result.discordtag}

				Discord ID: ${result.discordid}

				Reason for the blacklist: **${result.reason}**

				${result.btag} was blacklisted by ${result.author}!`)
				.setColor('RED');

			if (result.discordid == null) {

				DataEmbed.setDescription(`
				Battle Tag: ${result.btag}

				Discord Tag: ${result.discordtag}

				Reason for the blacklist: **${result.reason}**

				${result.btag} was blacklisted by ${result.author}!`);

			};

			interaction.reply({
				content: `Here you go`,
				embeds: [
					DataEmbed,
				]
			});

		} else if (BigDiscordTag) {

			const DiscordTag = BigDiscordTag.toLowerCase();

			const CantFindEmbed = new MessageEmbed()
				.setTitle('Good')
				.setDescription(`Your Discord-Tag **${DiscordTag}** wasn't found anywhere!`)
				.setColor('GREEN');

			const result = await PlayerBlacklistSchema.findOne({

				discordtag: DiscordTag

			}).catch(async (e) => {

				console.log('Couldnt fetch Data from Database! Connection is probably offline!');
				console.log(e);

				interaction.reply({
					content: "Something happened and the bot wasnt able to fetch your data! Please contact the Developer if you see this! Your Error is : `BAD_DB_FETCH / 1` ",
					ephemeral: true
				});

				return;

			});

			if (!result) {

				interaction.reply({
					content: `The Bot was't able to find any player with that Discord Tag!`,
					embeds: [
						CantFindEmbed,
					]
				});

				return;
			};

			console.log('Passed fetching data!');

			const DataEmbed = new MessageEmbed()
				.setTitle(`${DiscordTag}'s info on the Blacklist!`)
				.setImage(result.evidence)
				.setDescription(`
				Battle Tag: ${result.btag}

				Discord Tag: ${result.discordtag}

				Discord ID: ${result.discordid}

				Reason for the blacklist: **${result.reason}**

				${result.btag} was blacklisted by ${result.author}!`)
				.setColor('RED');

			if (result.discordid == null) {

				console.log('Setting DiscordID to default!');

				DataEmbed.setDescription(`
				Battle Tag: ${result.btag}

				Discord Tag: ${result.discordtag}

				Reason for the blacklist: **${result.reason}**

				${result.btag} was blacklisted by ${result.author}!`);

			};

			interaction.reply({
				content: `Here you go`,
				embeds: [
					DataEmbed,
				]
			});

		} else {

			interaction.reply({
				content: 'You have to full out at least one option !',
				ephemeral: true
			});

		};

	},
};