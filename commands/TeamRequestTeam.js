const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const {
	MessageEmbed
} = require('discord.js');
const mongoose = require('mongoose');
const TeamDatabaseSchema = require('../schemas/TeamDatabaseSchema');

//This code has been written by me, Marwin!

module.exports = {
	data: new SlashCommandBuilder()
		.setName('team-request-from-list')
		.setDescription('Search a 2ez Overwatch Team on the 2ez Team List!')
		.addStringOption(option => option.setName('team-name').setDescription('The name of the Team. This also searches after aliases.').setRequired(true)),
	async execute(interaction, client) {

		// if (interaction.member.id !== "420277395036176405") {

		// 	interaction.reply({
		// 		content: "This command is currently unavailable!",
		// 		ephemeral: true
		// 	});

		// 	return;

		// };

		const TeamName = interaction.options.getString('team-name');

		if (TeamName) {

			const result = await TeamDatabaseSchema.findOne({
				"teamname": {
					$regex: new RegExp(TeamName, "i")
				},
			});

			if (!result) {

				const aliasresult = await TeamDatabaseSchema.findOne({
					"teamalias": {
						$regex: new RegExp(TeamName, "i")
					}
				});

				if (!aliasresult) {

					interaction.reply({
						content: `**${TeamName}** wasn't found anywhere in our Database.`
					});
					return;

				};

				const DescriptionMessage = (`
				${aliasresult.teamname} (${aliasresult.sr}k) has the following roster: 
		
				<:coach:827176895196037192> Coach: ${aliasresult.coachone}
				<:coach:827176895196037192> Assistant Coach: ${aliasresult.coachtwo}
		
				<:manager:827176895358828544> Manager: ${aliasresult.manager}
		
				<:tank:827176897632141372> Main Tank: ${aliasresult.tankone}
				<:tank:827176897632141372> Off Tank: ${aliasresult.tanktwo}
		
				<:damage:827176895338512394> Hitscan DPS: ${aliasresult.dpsone}
				<:damage:827176895338512394> Projectile DPS: ${aliasresult.dpstwo}
		
				<:support:827176895539052565> Main Support: ${aliasresult.suppone}
				<:support:827176895539052565> Flex Support: ${aliasresult.supptwo}
		
				`);

				const SaveEmbed = new MessageEmbed()
					.setTitle(`2ez Team: ${aliasresult.teamname}`)
					.setDescription(DescriptionMessage)
					.setThumbnail(aliasresult.teamimage)
					.setColor('BLURPLE');

				interaction.reply({
					content: `Here is ${aliasresult.teamname}'s roster:`,
					embeds: [
						SaveEmbed
					]
				}).catch((e) => {
					console.log(e);
				});

				return;

			};

			const DescriptionMessage = (`
			${result.teamname} (${result.sr}k) has the following roster: 
	
			<:coach:827176895196037192> Coach: ${result.coachone}
			<:coach:827176895196037192> Assistent Coach: ${result.coachtwo}
	
			<:manager:827176895358828544> Manager: ${result.manager}
	
			<:tank:827176897632141372> Main Tank: ${result.tankone}
			<:tank:827176897632141372> Off Tank: ${result.tanktwo}
	
			<:damage:827176895338512394> Hitscan DPS: ${result.dpsone}
			<:damage:827176895338512394> Projectile DPS: ${result.dpstwo}
	
			<:support:827176895539052565> Main Support: ${result.suppone}
			<:support:827176895539052565> Flex Support: ${result.supptwo}
	
			`);

			const SaveEmbed = new MessageEmbed()
				.setTitle(`2ez Team: ${TeamName}`)
				.setDescription(DescriptionMessage)
				.setThumbnail(result.teamimage)
				.setColor('BLURPLE');

			interaction.reply({
				content: `Here is ${result.teamname}'s roster:`,
				embeds: [
					SaveEmbed
				]
			}).catch((e) => {
				console.log(e);
			});

		};
	},

};