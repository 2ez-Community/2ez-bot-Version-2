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
		.setName('team-add-to-list')
		.setDescription('Add your team to the Database so others can look at it!')
		.addStringOption(option => option.setName('team-name').setDescription('The Name of your Team!').setRequired(true))
		.addStringOption(option => option.setName('sr').setDescription('The SR of your Team!').setRequired(true))
		.addStringOption(option => option.setName('team-alias').setDescription('The alias of your team. This allows people to find your team faster!'))
		.addStringOption(option => option.setName('team-logo').setDescription('A Logo of your Team. Use your Team emoji for this!'))
		.addUserOption(option => option.setName('coach-one').setDescription('The coach of your team. You can have 2 coaches!'))
		.addUserOption(option => option.setName('coach-two').setDescription('The second coach, if you have one!'))
		.addUserOption(option => option.setName('manager').setDescription('The Manager of your team! Add one if possible.'))
		.addUserOption(option => option.setName('tank-one').setDescription('The first tank of your team!'))
		.addUserOption(option => option.setName('tank-two').setDescription('The second tank of your team!'))
		.addUserOption(option => option.setName('dps-one').setDescription('The first DPS of your team!'))
		.addUserOption(option => option.setName('dps-two').setDescription('The second DPS of your team!'))
		.addUserOption(option => option.setName('support-one').setDescription('The first Support of your team!'))
		.addUserOption(option => option.setName('support-two').setDescription('The second Support of your team!')),
	async execute(interaction, client) {

		// if (interaction.member.id !== "420277395036176405") {

		// 	interaction.reply({
		// 		content: "This command is currently unavailable!",
		// 		ephemeral: true
		// 	});

		// 	return;

		// }

		const TeamName = interaction.options.getString('team-name');
		const TeamAlias = interaction.options.getString('team-alias');
		const SR = interaction.options.getString('sr');
		const TeamLogo = interaction.options.getString('team-logo');
		const CoachOne = interaction.options.getMember('coach-one');
		const CoachTwo = interaction.options.getMember('coach-two');
		const Manager = interaction.options.getMember('manager');
		const TankOne = interaction.options.getMember('tank-one');
		const TankTwo = interaction.options.getMember('tank-two');
		const DPSOne = interaction.options.getMember('dps-one');
		const DPSTwo = interaction.options.getMember('dps-two');
		const SuppOne = interaction.options.getMember('support-one');
		const SuppTwo = interaction.options.getMember('support-two');

		const result = await TeamDatabaseSchema.findOne({
			"teamname": {
				$regex: new RegExp(TeamName, "i")
			},
		});

		if (result) {

			interaction.reply({
				content: `A Team called **${TeamName}** was already found! If you want to update your team, use the **/team-update-list** command!`
			});
			return;

		};

		// let TeamLogoArray = [];
		let TeamAliasArray = [];
		let CoachOneArray = [];
		let CoachTwoArray = [];
		let ManagerArray = [];
		let TankOneArray = [];
		let TankTwoArray = [];
		let DPSOneArray = [];
		let DPSTwoArray = [];
		let SuppOneArray = [];
		let SuppTwoArray = [];

		//Check if author has team role!
		if (!interaction.member.roles.cache.some(role => role.name.toLowerCase() === TeamName.toLowerCase())) {
			console.log(`Author didn't have fitting team role - `, TeamName);
			interaction.reply({
				content: `**${TeamName}** wasn't found anywhere in your roles! You can only add teams of wich you own the role! Do **NOT** add non-team roles!`,
				ephemeral: true
			});
			return;
		};

		try {

			if (TeamAlias) {

				const aliasresult = await TeamDatabaseSchema.findOne({
					"teamalias": {
						$regex: new RegExp(TeamAlias, "i")
					},
				});

				if (aliasresult) {
					interaction.reply("That alias is already taken!");
					return;
				};

				TeamAliasArray.push(TeamAlias);
			} else {
				TeamAliasArray.push('-');
			};

			if (CoachOne) {
				CoachOneArray.push(CoachOne);
			} else {
				CoachOneArray.push(``);
			};

			if (CoachTwo) {
				CoachTwoArray.push(CoachTwo);
			} else {
				CoachTwoArray.push(``);
			};

			if (Manager) {
				ManagerArray.push(Manager);
			} else {
				ManagerArray.push(``);
			};

			if (TankOne) {
				TankOneArray.push(TankOne);
			} else {
				TankOneArray.push(``);
			};

			if (TankTwo) {
				TankTwoArray.push(TankTwo);
			} else {
				TankTwoArray.push(``);
			};

			if (DPSOne) {
				DPSOneArray.push(DPSOne);
			} else {
				DPSOneArray.push(``);
			};

			if (DPSTwo) {
				DPSTwoArray.push(DPSTwo);
			} else {
				DPSTwoArray.push(``);
			};

			if (SuppOne) {
				SuppOneArray.push(SuppOne);
			} else {
				SuppOneArray.push(``);
			};

			if (SuppTwo) {
				SuppTwoArray.push(SuppTwo);
			} else {
				SuppTwoArray.push(``);
			};

		} catch (e) {
			interaction.reply(`ERROR / ID: BAD_ARRAY_PUSH / 1 - Critical Error - File: TeamDatabase.js - **${e}**`);
			console.log('An Error occured: ', e);
			return;
		};

		try {

			await new TeamDatabaseSchema({
				teamname: TeamName,
				teamalias: TeamAliasArray.toString(),
				sr: SR,
				teamimage: TeamLogo,
				coachone: CoachOneArray.toString(),
				coachtwo: CoachTwoArray.toString(),
				manager: ManagerArray.toString(),
				tankone: TankOneArray.toString(),
				tanktwo: TankTwoArray.toString(),
				dpsone: DPSOneArray.toString(),
				dpstwo: DPSTwoArray.toString(),
				suppone: SuppOneArray.toString(),
				supptwo: SuppTwoArray.toString(),
			}).save()

		} catch (e) {

			interaction.reply(`ERROR / ID: ${e} / 2 - Please contact the Dev as soon as possible!`);
			console.log('Couldnt Save Team in Database error:', e);
			return;

		};

		const DescriptionMessage = (`
			${TeamName} (${SR}k) has the following roster: 

			<:coach:827176895196037192> Coach: ${CoachOneArray.toString()}
			<:coach:827176895196037192> Assistent Coach: ${CoachTwoArray.toString()}

			<:manager:827176895358828544> Manager: ${ManagerArray.toString()}

			<:tank:827176897632141372> Main Tank: ${TankOneArray.toString()}
			<:tank:827176897632141372> Off Tank: ${TankTwoArray.toString()}

			<:damage:827176895338512394> Hitscan DPS: ${DPSOneArray.toString()}
			<:damage:827176895338512394> Projectile DPS: ${DPSTwoArray.toString()}

			<:support:827176895539052565> Main Support: ${SuppOneArray.toString()}
			<:support:827176895539052565> Flex Support: ${SuppTwoArray.toString()}
		`);

		const SaveEmbed = new MessageEmbed()
			.setTitle(`2ez Team: ${TeamName}`)
			.setDescription(DescriptionMessage)
			.setThumbnail(TeamLogo)
			.setColor('BLURPLE');

		interaction.reply({
			content: `You added Team ${TeamName}. Here is what that would look like:`,
			embeds: [
				SaveEmbed
			]
		}).catch((e) => {
			interaction.reply({
				content: `**ERROR / ID: BAD_EMBED_REPLY / 3 - TeamDatabase.js** - **👀 Your team has been pushed into the Database though!** - ${e}`
			});
			return;
		});

		// TeamLogoArray.pop();
		CoachOneArray.pop();
		CoachTwoArray.pop();
		ManagerArray.pop();
		TankOneArray.pop();
		TankTwoArray.pop();
		DPSOneArray.pop();
		DPSTwoArray.pop();
		SuppOneArray.pop();
		SuppTwoArray.pop();
	},
};