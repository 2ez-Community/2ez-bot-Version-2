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
		.addStringOption(option => option.setName('blacklist-reason').setDescription('The reason why you want to blacklist this team!').setRequired(true))
		.addStringOption(option => option.setName('sr').setDescription('The SR of the Team!'))
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

		try {

			const result = await TeamBlacklistSchema.findOne({
				"teamname": {
					$regex: new RegExp(SmallTeamName, "i")
				},

			});

			if (result) {

				interaction.reply(`${TeamName} was already found on the blacklist!`)
				return;
			};

		} catch (e) {

			console.log('Error fetching teams before adding one to the blacklist!', e);
			return;

		};

		await new TeamBlacklistSchema({
			teamname: SmallTeamName,
			reason: Reason,
			sr: SR,
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
			.setColor('BLURPLE');

		interaction.reply({
			content: `Your team has been added to the 2ez Blacklist Database!`,
			embeds: [
				SavedEmbed,
			]
		});

	},
};