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
		.setName('team-remove-player-from-list')
		.setDescription('Remove a player from your Teamlist!')
		.addStringOption(option => option.setName('team-name').setDescription('The Name of your Team!').setRequired(true))
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

		const TeamName = interaction.options.getString('team-name');
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

		if (!result) {

			interaction.reply({
				content: `We couln't find a team called **${TeamName}**. Use the  **/team-add-list** command to add your Team!`
			});
			return;

		};

		//Check if author has team role!
		if (!interaction.member.roles.cache.some(role => role.name.toLowerCase() === TeamName.toLowerCase())) {
			console.log(`Author didn't have fitting team role - `, TeamName);
			interaction.reply({
				content: `**${TeamName}** wasn't found anywhere in your roles! You can only update teams of wich you own the role!`,
				ephemeral: true
			});
			return;
		};

		let CoachOneString = (result.coachone);
		let CoachTwoString = (result.coachtwo);
		let ManagerString = (result.manager);
		let TankOneString = (result.tankone);
		let TankTwoString = (result.tanktwo);
		let DPSOneString = (result.dpsone);
		let DPSTwoString = (result.dpstwo);
		let SuppOneString = (result.suppone);
		let SuppTwoString = (result.supptwo);


		let NewCoachOneString = ("");
		let NewCoachTwoString = ("");
		let NewManagerString = ("");
		let NewTankOneString = ("");
		let NewTankTwoString = ("");
		let NewDPSOneString = ("");
		let NewDPSTwoString = ("");
		let NewSuppOneString = ("");
		let NewSuppTwoString = ("");

		console.log('Filled arrays with Database info');

		try {

			if (CoachOne) {

				if (CoachOneString.includes(CoachOne)) {

					NewCoachOneString = CoachOneString.replace(CoachOne, `**LFT MT ( ${result.sr}k)**`);

				} else {

					interaction.reply(`**${CoachOne}** wasn't part of that list!`);
					return;

				};

			} else {

				NewCoachOneString = (result.coachone);

			};

			if (CoachTwo) {

				if (CoachTwoString.includes(CoachTwo)) {

					NewCoachTwoString = CoachTwoString.replace(CoachTwo, '');

				} else {

					interaction.reply(`**${CoachTwo}** wasn't part of that list!`);
					return;

				};

			} else {

				NewCoachTwoString = (result.coachtwo);

			};

			if (Manager) {

				if (ManagerString.includes(Manager)) {

					NewManagerString = ManagerString.replace(Manager, '');

				} else {

					interaction.reply(`**${Manager}** wasn't part of that list!`);
					return;

				};

			} else {

				NewManagerString = (result.manager);

			};

			if (TankOne) {

				if (TankOneString.includes(TankOne)) {

					NewTankOneString = TankOneString.replace(TankOne, '');

				} else {

					interaction.reply(`**${TankOne}** wasn't part of that list!`);
					return;

				};

			} else {

				NewTankOneString = (result.tankone);

			};

			if (TankTwo) {

				if (TankTwoString.includes(TankTwo)) {

					NewTankTwoString = TankTwoString.replace(TankTwo, '');

				} else {

					interaction.reply(`**${TankTwo}** wasn't part of that list!`);
					return;

				};

			} else {

				NewTankTwoString = (result.tanktwo);

			};

			if (DPSOne) {

				if (DPSOneString.includes(DPSOne)) {

					NewDPSOneString = DPSOneString.replace(DPSOne, '');

				} else {

					interaction.reply(`**${DPSOne}** wasn't part of that list!`);
					return;

				};

			} else {

				NewDPSOneString = (result.dpsone);

			};

			if (DPSTwo) {

				if (DPSTwoString.includes(DPSTwo)) {

					NewDPSTwoString = DPSTwoString.replace(DPSTwo, '');

				} else {

					interaction.reply(`**${DPSTwo}** wasn't part of that list!`);
					return;

				};

			} else {

				NewDPSTwoString = (result.dpstwo);

			};

			if (SuppOne) {

				if (SuppOneString.includes(SuppOne)) {

					NewSuppOneString = SuppOneString.replace(SuppOne, '');

				} else {

					interaction.reply(`**${SuppTwo}** wasn't part of that list!`);
					return;

				};

			} else {

				NewSuppOneString = (result.suppone);

			};

			if (SuppTwo) {

				if (SuppTwoString.includes(SuppTwo)) {

					NewSuppTwoString = SuppTwoString.replace(SuppTwo, '');

				} else {

					interaction.reply(`**${SuppTwo}** wasn't part of that list!`);
					return;

				};

			} else {

				NewSuppTwoString = (result.supptwo);

			};

		} catch (e) {

			interaction.reply(`ERROR / ID: BAD_ARRAY_PUSH / 1 - Critical Error - File: TeamRemovePlayer.js - **${e}**`);
			console.log('An Error occured: ', e);
			return;

		};

		const filter = {
			teamname: TeamName
		};

		const NewRoster = {
			teamname: TeamName,
			sr: result.sr,
			teamimage: result.teamimage,
			coachone: NewCoachOneString,
			coachtwo: NewCoachTwoString,
			manager: NewManagerString,
			tankone: NewTankOneString,
			tanktwo: NewTankTwoString,
			dpsone: NewDPSOneString,
			dpstwo: NewDPSTwoString,
			suppone: NewSuppOneString,
			supptwo: NewSuppTwoString,
		};

		await TeamDatabaseSchema.findOneAndUpdate(filter, NewRoster, {
			new: true
		}).catch((e) => {
			console.log(`Something went wrong when trying to update the team roster: ${e} `);
			return;
		});

		const ItemChangeMessage = (`
		** ${TeamName} has been updated <:PogU:836244303034318908> **

		${TeamName}  (${result.sr}k) has the following roster: 

		<:coach:827176895196037192> Coach: ${NewCoachOneString}
		<:coach:827176895196037192> Assistant Coach: ${NewCoachTwoString}

		<:manager:827176895358828544> Manager: ${NewManagerString}

		<:tank:827176897632141372> Main Tank: ${NewTankOneString}
		<:tank:827176897632141372> Off Tank: ${NewTankTwoString}

		<:damage:827176895338512394> Hitscan DPS: ${NewDPSOneString}
		<:damage:827176895338512394> Projectile DPS: ${NewDPSTwoString}

		<:support:827176895539052565> Main Support: ${NewSuppOneString}
		<:support:827176895539052565> Flex Support: ${NewSuppTwoString}

	`);

		const SaveEmbed = new MessageEmbed()
			.setDescription(ItemChangeMessage)
			.setThumbnail(result.image)
			.setColor('BLURPLE');

		interaction.reply({
			content: `You updated Team **${TeamName}**. Here is what that would look like:`,
			embeds: [
				SaveEmbed
			]
		}).catch((e) => {
			interaction.reply({
				content: `Something went wrong. Make sure your Team Logo is an actual image! |  ${e}`
			});
		});

	},

};