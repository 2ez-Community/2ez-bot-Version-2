const {
	SlashCommandBuilder
} = require('@discordjs/builders');

const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

const {
	MessageEmbed,
	MessageComponentInteraction,
	MessageReaction
} = require('discord.js');

const fs = require('fs');
const nodeCron = require('node-cron');

//This code has been written by me, Marwin!

module.exports = {
	data: new SlashCommandBuilder()
		.setName('schedule')

		.setDescription('Create a Team schedule! This allows you to mention 8 people!')

		.addUserOption(option => option.setName('user-one').setDescription('Add a user to mention in the schedule!').setRequired(true))

		.addUserOption(option => option.setName('user-second').setDescription('Add a user to mention in the schedule!'))

		.addUserOption(option => option.setName('user-third').setDescription('Add a user to mention in the schedule!'))

		.addUserOption(option => option.setName('user-fourth').setDescription('Add a user to mention in the schedule!'))

		.addUserOption(option => option.setName('user-fith').setDescription('Add a user to mention in the schedule!'))

		.addUserOption(option => option.setName('user-sixth').setDescription('Add a user to mention in the schedule!'))

		.addUserOption(option => option.setName('user-seventh').setDescription('Add a user to mention in the schedule!'))

		.addUserOption(option => option.setName('user-eighth').setDescription('Add a user to mention in the schedule!'))

		.addStringOption(option => option.setName('reminder-date').setDescription('The date of the day you want to be reminded at!'))

		.addStringOption(option => option.setName('description').setDescription('This will be the description of your schedule!')),

	async execute(interaction) {

		// if (interaction.member.id !== "420277395036176405") {

		// 	interaction.reply({
		// 		content: "This command is currently unavailable!",
		// 		ephemeral: true
		// 	});

		// 	return;

		// }

		const NonValidChannels = ["Social", "Server"]

		if (NonValidChannels.includes(interaction.channel.parent.name)) {
			interaction.reply({
				content: "This command is not available in this category!",
				ephemeral: true
			})
			return;
		};

		let AllUsersWithEmojis = [

		];

		let YesVoters = [

		];

		let WillNotPingArray = [

		];

		let Check_User_Array = [

		];

		let User_One_Array = [

		];

		let User_Second_Array = [

		];

		let User_Third_Array = [

		];

		let User_Fourth_Array = [

		];

		let User_Fith_Array = [

		];

		let User_Sixth_Array = [

		];

		let User_Seventh_Array = [

		];

		let User_Eighth_Array = [

		];

		let ScrimDescripton = [

		];
		let MentionMessage = [


		];

		/**
		 * @type {string} - 1-8 All users mentioned in the schedule.
		 */
		const userOne = interaction.options.getMember('user-one');

		const userSecond = interaction.options.getMember('user-second');

		const userThird = interaction.options.getMember('user-third');

		const userFourth = interaction.options.getMember('user-fourth');

		const userFith = interaction.options.getMember('user-fith');

		const userSixth = interaction.options.getMember('user-sixth');

		const userSeventh = interaction.options.getMember('user-seventh');

		const userEighth = interaction.options.getMember('user-eighth');

		let ReminderDay = interaction.options.getString('reminder-date');

		const OptionalScrimDescription = interaction.options.getString('description');

		if (ReminderDay) { //checks if date is valid
			if (isNaN(ReminderDay)) return interaction.reply('Please enter a number!');
			if (ReminderDay > 31) return interaction.reply('Please enter a number less than or equal to 31!');
			var result = (ReminderDay - Math.floor(ReminderDay)) !== 0;
			if (result) return interaction.reply('Please enter a valid number!');
		} else {
			ReminderDay = "*";
		};

		// -------------------------------------------------- Reminder Schedules --------------------------------------------------// 
		var reminderschedule = nodeCron.schedule('* * * * *', () => { //45 17 * * * - Set a cron schedule for the bot to send reminders to the users.
			for (let i = 0; i < AllUsersWithEmojis.length; i++) {

				if (AllUsersWithEmojis[i].includes(`<:2ez_Schedule_Yes:933802728130494524>`)) {

					if (YesVoters.includes(AllUsersWithEmojis[i])) {

						YesVoters.push("");

					} else {

						YesVoters.push(AllUsersWithEmojis[i]);

					};

				};

			};

			RealReminder = YesVoters.toString().replace(/<:2ez_Schedule_Yes:933802728130494524>/g, '').replace(/,/g, ' ').replace(`${WillNotPingArray}`, '').replace(/,/g, '').trim();

			if (RealReminder.length == 0) {

				console.log('Reminder was not sent because either no users were mentioned or no users voted yes!');

			} else {

				interaction.channel.send(`${RealReminder} here is your reminder for the scrim in 15 minutes!`);

			};
		}, {
			scheduled: true
		});

		var closereminders = nodeCron.schedule('47 17 * * *', () => { //47 17 * * * This cron schedule deletes the reminders after the scrim has ended so it's not sent twice.
			reminderschedule.stop();
		}, {
			scheduled: true
		});

		var customreminder = nodeCron.schedule(`45 17 ${ReminderDay} * *`, () => { // 45 17 ${ReminderDay} * *- Set a cron schedule for the bot to send reminders to the users.
			for (let i = 0; i < AllUsersWithEmojis.length; i++) {

				if (AllUsersWithEmojis[i].includes(`<:2ez_Schedule_Yes:933802728130494524>`)) {

					if (YesVoters.includes(AllUsersWithEmojis[i])) {

						YesVoters.push("");

					} else {

						YesVoters.push(AllUsersWithEmojis[i]);

					};

				};

			};

			PrepareReminder = YesVoters.toString().replace(/<:2ez_Schedule_Yes:933802728130494524>/g, '').replace(/,/g, ' ').replace(`${WillNotPingArray}`, '').replace(/,/g, '').trim();

			if (RealReminder.length == 0) {

				console.log('Reminder was not sent because either no users were mentioned or no users voted yes!');

			} else {

				interaction.channel.send(`${RealReminder} here is your reminder for the scrim in 15 minutes!`);

			};
		}, {
			scheduled: false
		});

		var stopcustomreminder = nodeCron.schedule(`47 17 ${ReminderDay} * *`, () => { //` 47 17 ${ReminderDay} * * - Set a cron schedule for the bot to send reminders to the users.
			customreminder.stop();
		}, {
			scheduled: false
		});
		// -------------------------------------------------- Reminder Schedules --------------------------------------------------// 

		if (ReminderDay !== "*") { //only runs if date isnt default

			customreminder.start();
			stopcustomreminder.start();

			console.log(`Started custom reminder! - Day: ${ReminderDay}!`);

			reminderschedule.stop();
			closereminders.stop();

		} else {
			console.log('Never initalized custom reminder!');
		};

		try {

			ScrimDescripton.push(OptionalScrimDescription);

		} catch (e) {

			console.log(e);
			ScrimDescripton.push('React to change your availability!');

		};

		if (OptionalScrimDescription == ">" || !OptionalScrimDescription) {

			ScrimDescripton.push("React to change your availability!");

		};

		let yesEmoji = "<:2ez_Schedule_Yes:933802728130494524>";
		let noEmoji = "<:2ez_Schedule_No:933803257120313406>";
		let neutralEmoji = "<:2ez_neutral:892794587712745543>";
		let tentativeEmoji = "<:2ez_Schedule_tentative:933802728138899556>";

		try { //Push in every user + their emoji in their personal array 

			if (userOne) {

				//Push everything in, if a user was mentioned

				Check_User_Array.push(userOne.user.username);
				User_One_Array.push(`${neutralEmoji} ${userOne}`);
				MentionMessage.push(`${userOne}`);

			} else {

				// else, push in a "-"

				User_One_Array.push('')

			};

			if (userSecond) {

				Check_User_Array.push(userSecond.user.username);
				User_Second_Array.push(`${neutralEmoji} ${userSecond}`);
				MentionMessage.push(`${userSecond}`);

			} else {

				User_Second_Array.push('')

			};

			if (userThird) {

				Check_User_Array.push(userThird.user.username);
				User_Third_Array.push(`${neutralEmoji} ${userThird}`);
				MentionMessage.push(`${userThird}`);

			} else {

				User_Third_Array.push('');

			};

			if (userFourth) {

				Check_User_Array.push(userFourth.user.username);
				User_Fourth_Array.push(`${neutralEmoji} ${userFourth}`);
				MentionMessage.push(`${userFourth}`);

			} else {

				User_Fourth_Array.push('')

			};

			if (userFith) {

				Check_User_Array.push(userFith.user.username);
				User_Fith_Array.push(`${neutralEmoji} ${userFith}`);
				MentionMessage.push(`${userFith}`);

			} else {

				User_Fith_Array.push('')

			};

			if (userSixth) {

				Check_User_Array.push(userSixth.user.username);
				User_Sixth_Array.push(`${neutralEmoji} ${userSixth}`);
				MentionMessage.push(`${userSixth}`);

			} else {

				User_Sixth_Array.push('')

			};

			if (userSeventh) {

				Check_User_Array.push(userSeventh.user.username);
				User_Seventh_Array.push(`${neutralEmoji} ${userSeventh}`);
				MentionMessage.push(`${userSeventh}`);

			} else {

				User_Seventh_Array.push('')

			};

			if (userEighth) {

				Check_User_Array.push(userEighth.user.username);
				User_Eighth_Array.push(`${neutralEmoji} ${userEighth}`);
				MentionMessage.push(`${userEighth}`);

			} else {

				User_Eighth_Array.push('')

			};

			Check_User_Array.push(interaction.member.user.username);


			console.log(`Pushed all users in ${interaction.channel.parent.name}!`);

		} catch (e) {

			interaction.reply({
				content: "Oops, something went wrong! Please try again!",
			})
			console.log(e);
			return;

		};

		// ⬇ Description of the embed
		let UserMessages =
			(` ${ScrimDescripton.toString()}
		
			${User_One_Array.toString()}

			${User_Second_Array.toString()}

			${User_Third_Array.toString()}

			${User_Fourth_Array.toString()}

			${User_Fith_Array.toString()}

			${User_Sixth_Array.toString()}

			${User_Seventh_Array.toString()} 

			${User_Eighth_Array.toString()}`);

		let team = `${interaction.channel.parent.name}`; // get category name

		const ScheduleEmbed = new MessageEmbed()
			.setTitle(`${team}'s Schedule`)
			.setDescription(UserMessages)
			.setColor('GREYPLE')
			.setFooter({
				text: `Created by ${interaction.member.user.username}`
			})
			.setTimestamp();

		const NotAbleToReactEmbed = new MessageEmbed()
			.setDescription(`> Your User ID doesn't appear in the following Array: SCHEDULE_USER_ID_ARRAY `)
			.setColor('DARK_BUT_NOT_BLACK')

		const NotAbleToDeleteEmbed = new MessageEmbed()
			.setDescription(`> Only the creator of this schedule , ${interaction.member.user.username}, can use this!`)
			.setColor('DARK_BUT_NOT_BLACK')

		const DMOptionsEmbed = new MessageEmbed()
			.setTitle('Choose your option')
			.setDescription(`What do you want to do with the schedule in ${interaction.channel} ?`)
			.setColor('DARK_BUT_NOT_BLACK')

		const DisableReminderForEveryoneEmbed = new MessageEmbed()
			.setDescription(`<:2ezBotV2_YES:951558270340972574> I won't send a reminder for this schedule!`)
			.setColor('GREEN');

		const DisableReminderForYouEmbed = new MessageEmbed()
			.setDescription(`<:2ezBotV2_YES:951558270340972574> I won't ping you for this schedule!`)
			.setColor('GREEN');

		const SuccessfullyDeletedEmbed = new MessageEmbed()
			.setDescription(`<:2ezBotV2_YES:951558270340972574> Your schedule has been deleted!`)
			.setFooter({
				text: "All running reminders have been stopped!"
			})
			.setColor('GREEN');

		const Buttons = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setCustomId('ButYes')
				.setEmoji('<:2ez_Schedule_Yes:933802728130494524>')
				.setStyle('SECONDARY'),
			)
			.addComponents(
				new MessageButton()
				.setCustomId('ButNo')
				.setEmoji('<:2ez_Schedule_No:933803257120313406>')
				.setStyle('SECONDARY'),
			)
			.addComponents(
				new MessageButton()
				.setCustomId('ButIdk')
				.setEmoji('<:2ez_Schedule_tentative:933802728138899556>')
				.setStyle('SECONDARY'),
			)
			.addComponents(
				new MessageButton()
				.setCustomId('ButManage')
				.setLabel('Manage schedule')
				.setStyle("PRIMARY")
			)
			.addComponents(
				new MessageButton()
				.setCustomId('ButDelete')
				.setLabel('Delete')
				.setStyle("DANGER")
			);

		await interaction.reply(`Here is your schedule for the following users: ${MentionMessage}.`).then(

			interaction.channel.send({
				embeds: [
					ScheduleEmbed
				],
				components: [
					Buttons
				]

			}).then(sentMessage => {

				const yescollector = sentMessage.createMessageComponentCollector({
					componentType: 'BUTTON'
				});

				const nocollector = sentMessage.createMessageComponentCollector({
					componentType: 'BUTTON'
				});

				const idkcollector = sentMessage.createMessageComponentCollector({
					componentType: 'BUTTON'
				});

				const ManageScheduleCollector = sentMessage.createMessageComponentCollector({
					componentType: 'BUTTON'
				});

				const DeleteCollector = sentMessage.createMessageComponentCollector({
					componentType: 'BUTTON'
				});

				yescollector.on('collect', i => {

					if (i.customId === "ButYes") {

						if (!Check_User_Array.includes(i.user.username)) {
							i.reply({
								content: "You are not able to react here!",
								embeds: [
									NotAbleToReactEmbed
								],
								ephemeral: true
							})
							return;
						};

						AllUsersWithEmojis.length = 0;

						try {

							if (i.member.user.id == userOne.user.id) {

								User_One_Array.pop();
								User_One_Array.push(`${yesEmoji} ${userOne}`)

							};

							if (i.member.user.id == userSecond.user.id) {

								User_Second_Array.pop();
								User_Second_Array.push(`${yesEmoji} ${userSecond}`)

							};

							if (i.member.user.id == userThird.user.id) {

								User_Third_Array.pop();
								User_Third_Array.push(`${yesEmoji} ${userThird}`)

							};

							if (i.user.id == userFourth.user.id) {

								User_Fourth_Array.pop();
								User_Fourth_Array.push(`${yesEmoji} ${userFourth}`)

							};

							if (i.user.id == userFith.user.id) {

								User_Fith_Array.pop();
								User_Fith_Array.push(`${yesEmoji} ${userFith}`)

							};

							if (i.user.id == userSixth.user.id) {

								User_Sixth_Array.pop();
								User_Sixth_Array.push(`${yesEmoji} ${userSixth}`)

							};

							if (i.user.id == userSeventh.user.id) {

								User_Seventh_Array.pop();
								User_Seventh_Array.push(`${yesEmoji} ${userSeventh}`)

							};

							if (i.user.id == userEighth.user.id) {

								User_Eighth_Array.pop();
								User_Eighth_Array.push(`${yesEmoji} ${userEighth}`)

							};

						} catch {

						};

						AllUsersWithEmojis.push(User_One_Array.toString(), User_Second_Array.toString(), User_Third_Array.toString(), User_Fourth_Array.toString(), User_Fith_Array.toString(), User_Sixth_Array.toString(), User_Seventh_Array.toString(), User_Eighth_Array.toString());

						ScheduleEmbed.setDescription(ScrimDescripton.toString() + "\n" + "\n" + User_One_Array.toString() + "\n" + "\n" + User_Second_Array.toString() + "\n" + "\n" + User_Third_Array.toString() + "\n" + "\n" + User_Fourth_Array.toString() + "\n" + "\n" + User_Fith_Array.toString() + "\n" + "\n" + User_Sixth_Array.toString() + "\n" + "\n" + User_Seventh_Array.toString() + "\n" + "\n" + User_Eighth_Array.toString());
						ScheduleEmbed.setColor('GREEN');
						ScheduleEmbed.setFooter({
							text: `Created by ${interaction.member.user.username} | Latest reaction by ${i.user.username}`
						});
						ScheduleEmbed.setTimestamp();

						sentMessage.edit({
							embeds: [
								ScheduleEmbed
							],
						});
						i.deferUpdate();
					};
				});

				nocollector.on('collect', i => {

					if (i.customId === "ButNo") {

						if (!Check_User_Array.includes(i.user.username)) {
							i.reply({
								content: "You are not able to react here!",
								embeds: [
									NotAbleToReactEmbed
								],
								ephemeral: true
							})
							return;
						};

						AllUsersWithEmojis.length = 0;

						try {

							if (i.member.user.id == userOne.user.id) {

								User_One_Array.pop();
								User_One_Array.push(`${noEmoji} ${userOne}`)

							};

							if (i.member.user.id == userSecond.user.id) {

								User_Second_Array.pop();
								User_Second_Array.push(`${noEmoji} ${userSecond}`)

							};

							if (i.member.user.id == userThird.user.id) {

								User_Third_Array.pop();
								User_Third_Array.push(`${noEmoji} ${userThird}`)

							};

							if (i.user.id == userFourth.user.id) {

								User_Fourth_Array.pop();
								User_Fourth_Array.push(`${noEmoji} ${userFourth}`)

							};

							if (i.user.id == userFith.user.id) {

								User_Fith_Array.pop();
								User_Fith_Array.push(`${noEmoji} ${userFith}`)

							};

							if (i.user.id == userSixth.user.id) {

								User_Sixth_Array.pop();
								User_Sixth_Array.push(`${noEmoji} ${userSixth}`)

							};

							if (i.user.id == userSeventh.user.id) {

								User_Seventh_Array.pop();
								User_Seventh_Array.push(`${noEmoji} ${userSeventh}`)

							};

							if (i.user.id == userEighth.user.id) {

								User_Eighth_Array.pop();
								User_Eighth_Array.push(`${noEmoji} ${userEighth}`)

							};

						} catch {

						};

						AllUsersWithEmojis.push(User_One_Array.toString(), User_Second_Array.toString(), User_Third_Array.toString(), User_Fourth_Array.toString(), User_Fith_Array.toString(), User_Sixth_Array.toString(), User_Seventh_Array.toString(), User_Eighth_Array.toString());

						ScheduleEmbed.setDescription(ScrimDescripton.toString() + "\n" + "\n" + User_One_Array.toString() + "\n" + "\n" + User_Second_Array.toString() + "\n" + "\n" + User_Third_Array.toString() + "\n" + "\n" + User_Fourth_Array.toString() + "\n" + "\n" + User_Fith_Array.toString() + "\n" + "\n" + User_Sixth_Array.toString() + "\n" + "\n" + User_Seventh_Array.toString() + "\n" + "\n" + User_Eighth_Array.toString());
						ScheduleEmbed.setColor('RED');
						ScheduleEmbed.setFooter({
							text: `Created by ${interaction.member.user.username} | Latest reaction by ${i.user.username}`
						});
						ScheduleEmbed.setTimestamp();

						sentMessage.edit({
							embeds: [
								ScheduleEmbed
							],
						});
						i.deferUpdate();
					};
				});

				idkcollector.on('collect', i => {

					if (i.customId === "ButIdk") {

						if (!Check_User_Array.includes(i.user.username)) {
							i.reply({
								content: "You are not able to react here!",
								embeds: [
									NotAbleToReactEmbed
								],
								ephemeral: true
							})
							return;
						};

						AllUsersWithEmojis.length = 0;

						try {

							if (i.member.user.id == userOne.user.id) {

								User_One_Array.pop();
								User_One_Array.push(`${tentativeEmoji} ${userOne}`)

							};

							if (i.member.user.id == userSecond.user.id) {

								User_Second_Array.pop();
								User_Second_Array.push(`${tentativeEmoji} ${userSecond}`)

							};

							if (i.member.user.id == userThird.user.id) {

								User_Third_Array.pop();
								User_Third_Array.push(`${tentativeEmoji} ${userThird}`)

							};

							if (i.user.id == userFourth.user.id) {

								User_Fourth_Array.pop();
								User_Fourth_Array.push(`${tentativeEmoji} ${userFourth}`)

							};

							if (i.user.id == userFith.user.id) {

								User_Fith_Array.pop();
								User_Fith_Array.push(`${tentativeEmoji} ${userFith}`)

							};

							if (i.user.id == userSixth.user.id) {

								User_Sixth_Array.pop();
								User_Sixth_Array.push(`${tentativeEmoji} ${userSixth}`)

							};

							if (i.user.id == userSeventh.user.id) {

								User_Seventh_Array.pop();
								User_Seventh_Array.push(`${tentativeEmoji} ${userSeventh}`)

							};

							if (i.user.id == userEighth.user.id) {

								User_Eighth_Array.pop();
								User_Eighth_Array.push(`${tentativeEmoji} ${userEighth}`)

							};

						} catch {

						};

						AllUsersWithEmojis.push(User_One_Array.toString(), User_Second_Array.toString(), User_Third_Array.toString(), User_Fourth_Array.toString(), User_Fith_Array.toString(), User_Sixth_Array.toString(), User_Seventh_Array.toString(), User_Eighth_Array.toString());

						ScheduleEmbed.setDescription(ScrimDescripton.toString() + "\n" + "\n" + User_One_Array.toString() + "\n" + "\n" + User_Second_Array.toString() + "\n" + "\n" + User_Third_Array.toString() + "\n" + "\n" + User_Fourth_Array.toString() + "\n" + "\n" + User_Fith_Array.toString() + "\n" + "\n" + User_Sixth_Array.toString() + "\n" + "\n" + User_Seventh_Array.toString() + "\n" + "\n" + User_Eighth_Array.toString());
						ScheduleEmbed.setColor('BLURPLE');
						ScheduleEmbed.setFooter({
							text: `Created by ${interaction.member.user.username} | Latest reaction by ${i.user.username}`
						});
						ScheduleEmbed.setTimestamp();

						sentMessage.edit({
							embeds: [
								ScheduleEmbed
							],
						});
						i.deferUpdate();
					};
				});

				ManageScheduleCollector.on('collect', async i => {

					if (i.customId === "ButManage") {

						if (!Check_User_Array.includes(i.user.username)) {
							i.reply({
								content: "You are not able to use this!",
								embeds: [
									NotAbleToReactEmbed
								],
								ephemeral: true,
							});
							return;
						};

						const Options = new MessageActionRow()
							.addComponents(
								new MessageButton()
								.setCustomId('ButSave')
								.setLabel('Save this schedule')
								.setStyle('SUCCESS'),
							)
							.addComponents(
								new MessageButton()
								.setCustomId('ButManageReminder')
								.setLabel('Manage reminder')
								.setStyle('DANGER'),
							);

						i.reply({
							content: "I sent you a DM!",
							ephemeral: true
						});

						i.member.send({
							embeds: [
								DMOptionsEmbed
							],
							components: [
								Options
							],
						}).then(sentMessage => {

							const SaveCollector = sentMessage.createMessageComponentCollector({
								componentType: 'BUTTON'
							});

							const ManageReminderCollector = sentMessage.createMessageComponentCollector({
								componentType: 'BUTTON'
							});

							SaveCollector.on('collect', async i => {

								if (i.customId === "ButSave") {

									if (i.user.id !== interaction.member.user.id) {
										i.reply({
											content: "You are not able to use this!",
											embeds: [
												NotAbleToDeleteEmbed
											],
										})
										return;
									};

									if (!userOne || !userSecond || !userThird || !userFourth || !userFith || !userSixth) {
										i.reply({
											content: "Your schedule is not eligible for saving! It needs to fill out at least all 6 player slots!",
										});

										return;

									};

									let UserSeventhString = ("");
									let UserSeventhIDString = ("");
									let UserEighthString = ("");
									let UserEighthIDString = ("");

									if (userSeventh) {

										UserSeventhString = `${userSeventh}`;
										UserSeventhIDString = `${userSeventh.user.id}`;

									} else {

										UserSeventhString = "-";
										UserSeventhIDString = "-";
									};

									if (userEighth) {

										UserEighthString = `${userEighth}`;
										UserEighthIDString = `${userEighth.user.id}`;

									} else {

										UserEighthString = "-";
										UserEighthIDString = "-";
									};


									const NewScheduleData = {
										ScheduleCreator: `${interaction.member}`,
										ScheduleCreatorID: `${interaction.member.user.id}`,
										userOneJson: `${userOne}`,
										userOneIDJson: `${userOne.user.id}`,
										userSecondJson: `${userSecond}`,
										userSecondIDJson: `${userSecond.user.id}`,
										userThirdJson: `${userThird}`,
										userThirdIDJson: `${userThird.user.id}`,
										userFourthJson: `${userFourth}`,
										userFourthIDJson: `${userFourth.user.id}`,
										userFithJson: `${userFith}`,
										userFithIDJson: `${userFith.user.id}`,
										userSixthJson: `${userSixth}`,
										userSixthIDJson: `${userSixth.user.id}`,
										userSeventhJson: `${UserSeventhString}`,
										userSeventhIDJson: `${UserSeventhIDString}`,
										userEighthJson: `${UserEighthString}`,
										userEighthIDJson: `${UserEighthIDString}`,
										ScrimDescriptonJson: `${ScrimDescripton}`,
										InteractionChannelJson: `${interaction.channel}`
									};

									let JSONuserMessage =
										`Hey there ${i.user.username} 👋` + "\n" +
										"You just saved this schedule:" + "\n" + "\n" +
										`Description: ${ScrimDescripton}` + "\n" +
										`First User: ${userOne}` + "\n" +
										`Second User: ${userSecond}` + "\n" +
										`Third User: ${userThird}` + "\n" +
										`Fourth User: ${userFourth}` + "\n" +
										`Fith User: ${userFith}` + "\n" +
										`Sixth User: ${userSixth}` + "\n" +
										`Seventh User: ${UserSeventhString}` + "\n" +
										`Eighth User: ${UserEighthString}` + "\n" + "\n" +
										`If you use /schedulepreset now, this will be your schedule!` + "\n" + "\n" +
										`🥰 Your 2ez Bot!` + "\n" + "\n" +
										`Your File: **Schedule_${interaction.channel.parent.name}.json**` + "\n" +
										`Access: **${interaction.channel.parent.name}** through **${interaction.member.user.username}**`;

									fs.writeFile(`Schedule_${interaction.channel.parent.name}.json`, JSON.stringify(NewScheduleData, null, 2), async (err) => {

										if (err) {

											i.reply(`Something didnt work! Check the error for more info: ${err}`);
											console.log(err);
											return;

										} else {

											await i.reply({
												content: `Your data has been saved successfully. Your file: **${interaction.channel.parent.name}.json**. For more info, check your DMs!`,
											});
											console.log(`Saved Schedule Data in: Schedule_${interaction.channel.parent.name}.json`);

											i.channel.send(JSONuserMessage).catch((e) => {

												console.log(`Couldnt send the message! Error: ${e}`);

											});
										};
									});
								};
							});

							ManageReminderCollector.on('collect', async i => {

								if (i.customId === "ButManageReminder") {

									if (!Check_User_Array.includes(i.user.username)) {
										i.reply({
											content: "You are not able to use this!",
											embeds: [
												NotAbleToReactEmbed
											],
											ephemeral: true
										})
										return;
									};

									const ReminderOptions = new MessageActionRow()
										.addComponents(
											new MessageButton()
											.setCustomId('ButDisableReminderForYou')
											.setLabel('Disable for you')
											.setStyle('DANGER'),
										)
										.addComponents(
											new MessageButton()
											.setCustomId('ButDisableReminderForEveryone')
											.setLabel('Disable for everyone')
											.setStyle('DANGER'),
										);

									i.channel.send({
										content: "What do you want to do?",
										components: [
											ReminderOptions
										],
									}).then(sentMessage => {

										const DisableReminderForYou = sentMessage.createMessageComponentCollector({
											componentType: 'BUTTON'
										});

										const DisableReminderForEveryone = sentMessage.createMessageComponentCollector({
											componentType: 'BUTTON'
										});

										DisableReminderForYou.on('collect', async i => {

											if (i.customId === 'ButDisableReminderForYou') {

												WillNotPingArray.push(`${i.user}`);

												console.log(`${i.user.username} wont be notified for this schedule!`);

												i.reply({
													embeds: [
														DisableReminderForYouEmbed
													]
												});

											};

										});

										DisableReminderForEveryone.on('collect', async i => {

											if (i.customId === "ButDisableReminderForEveryone") {

												if (i.user.id !== interaction.member.user.id) {
													i.reply({
														content: "You are not able to use this!",
														embeds: [
															NotAbleToDeleteEmbed
														],
													})
													return;
												};

												console.log(`${i.user.username} has disabled the reminder for everyone!`);

												try {

													reminderschedule.stop();
													closereminders.stop();
													customreminder.stop();
													stopcustomreminder.stop();

												} catch (e) {

													i.reply("Something went wrong! Please try again! If this error doesn't go away, please contact the developer!");
													console.log(`Something went wrong! Error: ${e}`);
													return;

												};

												i.reply({
													embeds: [
														DisableReminderForEveryoneEmbed
													],
												});
											};
										});
									});
									i.deferUpdate();
								};
							});
						});
					};
				});

				DeleteCollector.on('collect', async (i) => {

					if (i.customId === "ButDelete") {

						if (i.user.id !== interaction.member.user.id) {
							i.reply({
								content: "You are not able to use this!",
								embeds: [
									NotAbleToDeleteEmbed
								],
								ephemeral: true
							})
							return;
						};

						try {

							User_One_Array.pop();

							User_Second_Array.pop();

							User_Third_Array.pop();

							User_Fourth_Array.pop();

							User_Fith_Array.pop();

							User_Sixth_Array.pop();

							User_Seventh_Array.pop();

							User_Eighth_Array.pop();

							ScrimDescripton.pop();

							MentionMessage.pop();

							closereminders.stop();

							reminderschedule.stop();

							customreminder.stop();

							stopcustomreminder.stop();

						} catch {

							const embed = new MessageEmbed()
								.setDescription('Error ID: `BAD_ARRAY_POP / 9 ` Contact the Dev if you see this!')
								.setColor('RED');

							i.reply({
								content: 'Something went wrong...!',
								embeds: [
									embed
								],
								ephemeral: true
							});
							return;
						};

						sentMessage.delete().catch(() => {

							console.log('Error ID: 10');

						});

						interaction.deleteReply().catch(() => {

							console.log('Error ID: 11 | Interaction could not be deleted!');

						});

						console.log(`Schedule in ${interaction.channel.parent.name} got deleted!`);

						i.reply({
							embeds: [
								SuccessfullyDeletedEmbed
							],
							ephemeral: true,
						});
					};
				});
			}),
		);
	},
};