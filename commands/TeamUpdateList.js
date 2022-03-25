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
		.setName('team-update-list')
		.setDescription('Update your team list on the Database!')
		.addStringOption(option => option.setName('team-name').setDescription('The Name of your Team!').setRequired(true))
		.addStringOption(option => option.setName('sr').setDescription('The SR of your Team!'))
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

		const TeamName = interaction.options.getString('team-name');
		const SR = interaction.options.getString('sr');
		const TeamAlias = interaction.options.getString('team-alias');
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

		if (!result) {

			interaction.reply({
				content: `We couldn't find a team called **${TeamName}**. Make sure you added your team with the **/team-add-database** command`
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

		//Check if SR is number!
		if (SR) {
			if (isNaN(SR)) {
				console.log(`SR wasn't a Number - `, SR);
				interaction.reply({
					content: `Your provided SR: **${SR}** has to be a Number!`,
					ephemeral: true
				});
				return;
			};
		};

		let CoachOneString = (result.coachone.replace("!", ""));
		let CoachTwoString = (result.coachtwo.replace("!", ""));
		let ManagerString = (result.manager.replace("!", ""));
		let TankOneString = (result.tankone.replace("!", ""));
		let TankTwoString = (result.tanktwo.replace("!", ""));
		let DPSOneString = (result.dpsone.replace("!", ""));
		let DPSTwoString = (result.dpstwo.replace("!", ""));
		let SuppOneString = (result.suppone.replace("!", ""));
		let SuppTwoString = (result.supptwo.replace("!", ""));

		let NewAliasString = ("");
		let NewSRString = ("");
		let NewTeamImageString = ("");
		let NewCoachOneString = ("");
		let NewCoachTwoString = ("");
		let NewManagerString = ("");
		let NewTankOneString = ("");
		let NewTankTwoString = ("");
		let NewDPSOneString = ("");
		let NewDPSTwoString = ("");
		let NewSuppOneString = ("");
		let NewSuppTwoString = ("");

		try {

			if (SR) {

				NewSRString = SR;

			} else {

				NewSRString = result.sr;

			};

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

				NewAliasString = TeamAlias;

			} else {

				NewAliasString = result.teamalias

			};

			if (TeamLogo) {

				NewTeamImageString = TeamLogo;

			} else {

				NewTeamImageString = result.teamimage;

			};

			if (CoachOne) {

				if (CoachOneString.includes(CoachOne.toString().replace("!", ""))) {

					interaction.reply(`${CoachOne} already appears on that list!`);
					return;

				} else {

					NewCoachOneString = CoachOneString + " " + `${CoachOne}`;

				};

			} else {

				NewCoachOneString = result.coachone;

			};

			if (CoachTwo) {

				if (CoachTwoString.includes(CoachTwo.toString().replace("!", ""))) {

					interaction.reply(`${CoachTwo} already appears on that list!`);
					return;

				} else {

					NewCoachTwoString = CoachTwoString + " " + `${CoachTwo}`;

				};

			} else {

				NewCoachTwoString = (result.coachtwo);

			};

			if (Manager) {

				if (ManagerString.includes(Manager.toString().replace("!", ""))) {

					interaction.reply(`${Manager} already appears on that list!`);
					return;

				} else {

					NewManagerString = ManagerString + " " + `${Manager}`;

				};

			} else {

				NewManagerString = (result.manager);

			};

			if (TankOne) {

				if (TankOneString.includes(TankOne.toString().replace("!", ""))) {

					interaction.reply(`${TankOne} already appears on that list!`);
					return;

				} else {

					NewTankOneString = TankOneString + " " + `${TankOne}`;

				};

			} else {

				NewTankOneString = (result.tankone);

			};

			if (TankTwo) {

				if (TankTwoString.includes(TankTwo.toString().replace("!", ""))) {

					interaction.reply(`${TankTwo} already appears on that list!`);
					return;

				} else {

					NewTankTwoString = TankTwoString + " " + `${TankTwo}`;

				};

			} else {

				NewTankTwoString = (result.tanktwo);

			};

			if (DPSOne) {

				if (DPSOneString.includes(DPSOne.toString().replace("!", ""))) {

					interaction.reply(`${DPSOne} already appears on that list!`);
					return;

				} else {

					NewDPSOneString = DPSOneString + " " + `${DPSOne}`;

				};

			} else {

				NewDPSOneString = (result.dpsone);

			};

			if (DPSTwo) {

				if (DPSTwoString.includes(DPSTwo.toString().replace("!", ""))) {

					interaction.reply(`${DPSTwo} already appears on that list!`);
					return;

				} else {

					NewDPSTwoString = DPSTwoString + " " + `${DPSTwo}`;

				};

			} else {

				NewDPSTwoString = (result.dpstwo);

			};

			if (SuppOne) {

				if (SuppOneString.includes(SuppOne.toString().replace("!", ""))) {

					interaction.reply(`${SuppOne} already appears on that list!`);
					return;

				} else {

					NewSuppOneString = SuppOneString + " " + `${SuppOne}`;

				};

			} else {

				NewSuppOneString = (result.suppone);

			};

			if (SuppTwo) {

				if (SuppTwoString.includes(SuppTwo.toString().replace("!", ""))) {

					interaction.reply(`${SuppTwo} already appears on that list!`);
					return;

				} else {

					NewSuppTwoString = SuppTwoString + " " + `${SuppTwo}`;

				};

			} else {

				NewSuppTwoString = (result.supptwo);

			};

		} catch (e) {

			interaction.reply(`ERROR / ID: BAD_ARRAY_PUSH / 1 - Critical Error - File: TeamUpdateList.js - **${e}**`);
			console.log('An Error occured: ', e);
			return;

		};

		const filter = {
			teamname: TeamName
		};

		const NewRoster = {
			teamname: TeamName,
			teamalias: NewAliasString,
			sr: NewSRString,
			teamimage: NewTeamImageString,
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

		const DescriptionMessage = (`
		${TeamName}  (${NewSRString}k) has the following roster: 

		<:coach:827176895196037192> Coach: ${NewCoachOneString}
		<:coach:827176895196037192> Assistent Coach: ${NewCoachTwoString}

		<:manager:827176895358828544> Manager: ${NewManagerString}

		<:tank:827176897632141372> Main Tank: ${NewTankOneString}
		<:tank:827176897632141372> Off Tank: ${NewTankTwoString}

		<:damage:827176895338512394> Hitscan DPS: ${NewDPSOneString}
		<:damage:827176895338512394> Projectile DPS: ${NewDPSTwoString}

		<:support:827176895539052565> Main Support: ${NewSuppOneString}
		<:support:827176895539052565> Flex Support: ${NewSuppTwoString}
		`);

		const SaveEmbed = new MessageEmbed()
			.setTitle(`2ez Team: ${TeamName}`)
			.setDescription(DescriptionMessage)
			.setThumbnail(NewTeamImageString)
			.setColor('BLURPLE');

		interaction.reply({
			content: `You updated **${TeamName}**. Here is what that would look like:`,
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