const {
	SlashCommandBuilder,
	inlineCode
} = require('@discordjs/builders');

const {
	MessageEmbed
} = require('discord.js');

const mongoose = require('mongoose');
const TeamBlacklistSchema = require('../schemas/TeamBlacklistSchema');

const dotenv = require("dotenv");
dotenv.config();

//This code has been written by me, Marwin!

module.exports = {
	data: new SlashCommandBuilder()
		.setName('find-team-from-blacklist')
		.setDescription('Check if your team mentioned happens to be on the Blacklist!')
		.addStringOption(option => option.setName('team-name').setDescription('Search the Team by their Team Name!').setRequired(true)),
	async execute(interaction, client) {

		// if (interaction.member.id !== "420277395036176405") {

		// 	interaction.reply({
		// 		content: "This command is currently unavailable!",
		// 		ephemeral: true
		// 	});

		// 	return;

		// }

		const BigTeamName = interaction.options.getString('team-name');

		const TeamName = BigTeamName.toLowerCase();


		const CantFindEmbed = new MessageEmbed()
			.setTitle('Good!')
			.setDescription(`Your Battle-Tag **${TeamName}** wasn't found anywhere!`)
			.setColor('GREEN');

		const result = await TeamBlacklistSchema.findOne({

			teamname: TeamName

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
				content: `The Bot wasn't able to find any team with that Team Name!`,
				embeds: [
					CantFindEmbed,
				]
			});

			return;
		};

		let OptionalSR = result.sr;
		let OptionalMDiscord = result.managerdiscord;
		let OptionalMBTAG = result.managerbtag;
		let OptionalCDiscord = result.captaindiscord;
		let OptionalCBTAG = result.captainbtag;

		if (OptionalSR == null) {
			OptionalSR = "";
		} else {
			OptionalSR = `Team SR: ${result.sr}`;
		};
		if (OptionalMDiscord == null) {
			OptionalMDiscord = "";
		} else {
			OptionalMDiscord = `Manager Discord: ${result.managerdiscord}`;
		};
		if (OptionalMBTAG == null) {
			OptionalMBTAG = "";
		} else {
			OptionalMBTAG = `Manager Battle-Tag: ${result.managerbtag}`;
		};
		if (OptionalCDiscord == null) {
			OptionalCDiscord = "";
		} else {
			OptionalCDiscord = `Captain Discord: ${result.captaindiscord}`;
		};
		if (OptionalCBTAG == null) {
			OptionalCBTAG = "";
		} else {
			OptionalCBTAG = `Captain Battle-Tag: ${result.captainbtag}`;
		};

		const DataEmbed = new MessageEmbed()
			.setTitle(`${TeamName}'s info on the Blacklist!`)
			.setDescription(`
				Team Name: **${result.teamname}**

				Reason for the blacklist: **${result.reason}**

				**${result.teamname}** was blacklisted by ${result.author}!

				${OptionalSR}

				${OptionalMDiscord}

				${OptionalMBTAG}

				${OptionalCDiscord}

				${OptionalCBTAG}`)
			.setColor('RED')
			.setImage(result.evidence);

		interaction.reply({
			content: `Here you go`,
			embeds: [
				DataEmbed,
			]
		});

	},
};