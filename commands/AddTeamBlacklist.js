const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const {
	MessageEmbed,
	MessageActionRow,
	MessageButton
} = require('discord.js');
const mongoose = require('mongoose');
const TeamBlacklistSchema = require('../schemas/TeamBlacklistSchema');

//This code has been written by me, Marwin!

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-team-to-blacklist')
		.setDescription('Add a Team to the 2ez Blacklist Database!')
		.addStringOption(option => option.setName('team-name').setDescription('The Name of the Team!').setRequired(true))
		.addStringOption(option => option.setName('blacklist-reason').setDescription('The reason why you want to blacklist this team!').setRequired(true))
		.addStringOption(option => option.setName('sr').setDescription('The SR of the Team!'))
		.addStringOption(option => option.setName('evidence').setDescription('Got a picture of a team trolling? Paste in the link here.'))
		.addStringOption(option => option.setName('manager-discord').setDescription('The Discord-Tag of the Manager!'))
		.addStringOption(option => option.setName('manager-btag').setDescription('The Battle-Tag of the Manager!'))
		.addStringOption(option => option.setName('captain-discord').setDescription('The Discord-Tag of the Captain!'))
		.addStringOption(option => option.setName('captain-btag').setDescription('The Battle-Tag of the Captain!')),

	async execute(interaction, client) {

		// if (interaction.member.id !== "420277395036176405") {

		// 	interaction.reply({
		// 		content: "This command is currently unavailable!",
		// 		ephemeral: true
		// 	});

		// 	return;

		// }

		const TeamName = interaction.options.getString('team-name');
		const Reason = interaction.options.getString('blacklist-reason');
		const SR = interaction.options.getString('sr');
		const Evidence = interaction.options.getString('evidence');
		const ManagerDiscord = interaction.options.getString('manager-discord');
		const ManagerBtag = interaction.options.getString('manager-btag');
		const CaptainDiscord = interaction.options.getString('captain-discord');
		const CaptainBtag = interaction.options.getString('captain-btag');

		if (isNaN(SR)) {
			interaction.reply({
				content: 'SR has to be a Number!',
				ephemeral: true
			});

			return;
		};

		const SmallTeamName = TeamName.toLowerCase();


		const result = await TeamBlacklistSchema.findOne({
			"teamname": {
				$regex: new RegExp(SmallTeamName, "i")
			},

		});


		if (result) {

			let oldauthor = (result.author);
			let newauther = (oldauthor + `${interaction.member}`);

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
				content: `**${TeamName}** already appears to be blacklisted. Would you like to update their blacklist entry?`,
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

						const filter = {
							teamname: SmallTeamName
						};

						const NewMessage = {
							teamname: SmallTeamName,
							reason: Reason,
							sr: SR,
							evidence: Evidence,
							managerdiscord: ManagerDiscord,
							managerbtag: ManagerBtag,
							captaindiscord: CaptainDiscord,
							captainbtag: CaptainBtag,
							author: `${newauther}`,
						};

						await TeamBlacklistSchema.findOneAndUpdate(filter, NewMessage, {
							new: true
						}).catch((e) => {
							interaction.reply('Oops this is awkward. Something went wrong!');
							console.log(`Something went wrong when trying to update the LFS DB: ${e} `);
							return;
						});

						try {
							
							const EditEmbed = new MessageEmbed()
							.setDescription(`<:2ez_Schedule_Yes:933802728130494524> You succesfully updated ${TeamName}'s blacklist entry!` + "\n" + "\n" +
								`Skill rating: ${SR}k` + "\n" +
								`Reason: **${Reason}**` + "\n" +
								`Blacklisted by: **${newauther}**`
							)
							.setColor('GREEN')
							.setImage(Evidence);

							i.reply({
								embeds: [
									EditEmbed
								],
							});
	
							sentMessage.delete();
	
							return;
						
						} catch(e) {

							interaction.reply('I was unable to send the message. Your team has been saved though.');
							console.log('Error when trying to send TeamBlacklistEmbed', e);
							return;

						};

					};

				});

				nocollector.on('collect', i => {

					if (i.customId === "ButNo") {

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

			await new TeamBlacklistSchema({
				teamname: SmallTeamName,
				reason: Reason,
				sr: SR,
				evidence: Evidence,
				managerdiscord: ManagerDiscord,
				managerbtag: ManagerBtag,
				captaindiscord: CaptainDiscord,
				captainbtag: CaptainBtag,
				author: interaction.member,
			}).save();

			let OptionalSR = SR;
			let OptionalMDiscord = ManagerDiscord;
			let OptionalMBTAG = ManagerBtag;
			let OptionalCDiscord = CaptainDiscord;
			let OptionalCBTAG = CaptainBtag

			if (!OptionalSR) {
				OptionalSR = "-";
			} else {
				OptionalSR = `Team SR: ${SR}`;
			};
			if (!OptionalMDiscord) {
				OptionalMDiscord = "";
			} else {
				OptionalMDiscord = `Manager Discord: ${ManagerDiscord}`;
			};
			if (!OptionalMBTAG) {
				OptionalMBTAG = "";
			} else {
				OptionalMBTAG = `Manager Battle-Tag: ${ManagerBtag}`;
			};
			if (!OptionalCDiscord) {
				OptionalCDiscord = "";
			} else {
				OptionalCDiscord = `Captain Discord: ${CaptainDiscord}`;
			};
			if (!OptionalCBTAG) {
				OptionalCBTAG = "";
			} else {
				OptionalCBTAG = `Captain Battle-Tag: ${CaptainBtag}`;
			};

			try {

				const SavedEmbed = new MessageEmbed()
				.setTitle(`${TeamName} has been added to the blacklist!`)
				.setDescription(`
					Team Name: **${TeamName}**
		
					Reason for the blacklist: **${Reason}**
		
					**${TeamName}** was blacklisted by ${interaction.member}!
		
					${OptionalSR}
		
					${OptionalCDiscord}
		
					${OptionalCBTAG}
		
					${OptionalMDiscord}
		
					${OptionalMBTAG}`)
				.setColor('BLURPLE')
				.setImage(Evidence);

			interaction.reply({
				content: `Your team has been added to the 2ez Blacklist Database!`,
				embeds: [
					SavedEmbed,
				]
			});

			} catch(e) {

				interaction.reply('I was able to save your team to the database, but something went wrong when trying to send the embed.');
				return;

			};

		};
	},
};