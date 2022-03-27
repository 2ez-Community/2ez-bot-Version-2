const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const {
	MessageEmbed,
	MessageActionRow,
	MessageButton
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

		if (PlayerBattleResult || PlayerDiscordResult) {

			const Buttons = new MessageActionRow()
				.addComponents(
					new MessageButton()
					.setCustomId('ButYes')
					.setLabel('Yes')
					.setStyle('PRIMARY'),
				)
				.addComponents(
					new MessageButton()
					.setCustomId('ButNo')
					.setLabel('No')
					.setStyle('DANGER'),
				);

			interaction.reply({
				content: "Hold up...",
				ephemeral: true
			});

			interaction.channel.send({
				content: `**${BattleTag}** already appears to be blacklisted. Would you like to update their blacklist entry?`,
				components: [
					Buttons
				],
				ephemeral: true,
			}).then(sentMessage => {

				const yescollector = sentMessage.createMessageComponentCollector({
					componentType: 'BUTTON'
				});

				const nocollector = sentMessage.createMessageComponentCollector({
					componentType: 'BUTTON'
				});

				yescollector.on('collect', async i => {

					if (i.customId === "ButYes") {

						if (i.member.user.id !== interaction.member.id) {
							i.reply({
								content: "You are not able to decide this.",
								ephemeral: true
							});
							return;
						};

						if (PlayerDiscordResult) {

							console.log('Player was found by the Discord tag!');

							const filter = {
								discordtag: SmallDiscTag
							};

							const NewMessage = {
								btag: SmallBTag,
								discordtag: SmallDiscTag,
								discordid: DiscordID,
								reason: Reason,
								author: `${interaction.member}`,
								authorusername: interaction.member.user.username,
								message: Reason,
							};

							await PlayerBlacklistSchema.findOneAndUpdate(filter, NewMessage, {
								new: true
							}).catch((e) => {
								i.reply('Oops this is awkward. Something went wrong!');
								console.log(`Something went wrong when trying to update the Blacklist DB: ${e} `);
								return;
							});

							const PlayerDiscordEmbed = new MessageEmbed()
								.setDescription(`<:2ez_Schedule_Yes:933802728130494524> You succesfully updated ${BattleTag}'s blacklist entry!` + "\n" + "\n" +
									`Battle Tag: ${BattleTag}` + "\n" +
									`Discord Tag: ${DiscordTag}` + "\n" +
									`Reason: **${Reason}**`
								)
								.setColor('GREEN');

							i.reply({
								embeds: [
									PlayerDiscordEmbed
								],
							});

							sentMessage.delete();

							return;

						};

						console.log('Player was found by Battle Tag!');

						const filter = {
							btag: SmallBTag
						};

						const NewMessage = {
							btag: SmallBTag,
							discordtag: SmallDiscTag,
							discordid: DiscordID,
							reason: Reason,
							author: `${interaction.member}`,
							authorusername: interaction.member.user.username,
						};

						await PlayerBlacklistSchema.findOneAndUpdate(filter, NewMessage, {
							new: true
						}).catch((e) => {
							i.reply('Oops this is awkward. Something went wrong!');
							console.log(`Something went wrong when trying to update the Blacklist DB: ${e} `);
							return;
						});

						const PlayerDiscordEmbed = new MessageEmbed()
							.setDescription(`<:2ez_Schedule_Yes:933802728130494524> You succesfully updated ${BattleTag}'s blacklist entry!` + "\n" + "\n" +
								`Battle Tag: ${BattleTag}` + "\n" +
								`Discord Tag: ${DiscordTag}` + "\n" +
								`Reason: **${Reason}**`
							)
							.setColor('GREEN');

						i.reply({
							embeds: [
								PlayerDiscordEmbed
							],
						});

						sentMessage.delete();

						return;

					};

				});

				nocollector.on('collect', i => {

					if (i.customId === "ButNo") {

						if (i.member.user.id !== interaction.member.id) {
							i.reply({
								content: "You are not able to decide this.",
								ephemeral: true
							});
							return;
						};

						const cancelEmbed = new MessageEmbed()
							.setDescription('<:2ez_Schedule_No:933803257120313406> Alright, I did not edit anything!')
							.setColor('RED');

						i.reply({
							embeds: [
								cancelEmbed
							],
							ephemeral: true
						});

						sentMessage.delete();

						return;

					};

				});

			});

		} else {

			await new PlayerBlacklistSchema({
				btag: SmallBTag,
				discordtag: SmallDiscTag,
				discordid: DiscordID,
				reason: Reason,
				author: interaction.member,
				authorusername: interaction.member.user.username,
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

			return;

		};

	},
};