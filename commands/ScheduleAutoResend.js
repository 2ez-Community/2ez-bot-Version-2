const {
	SlashCommandBuilder
} = require('@discordjs/builders');

const {
	MessageActionRow,
	MessageButton,
	MessageEmbed
} = require('discord.js');

const fs = require('fs');

var cron = require('node-cron');

//This code has been written by me, Marwin!

module.exports = {
	data: new SlashCommandBuilder()
		.setName('schedule-set-autoresend')

		.setDescription('This will send your saved schedule everyday at 20 CET')

		.addStringOption(option => option.setName('days').setDescription('Specify the days you want the schedule to be send at. For example: monday thursday sunday').setRequired(true)),

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

		let DayString = ("");
		let IntAuhtor = interaction.member.id;
		let SendChannel = interaction.channel;
		const url_taskMap = {}

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

		/**
		 * @type {Array<string>}  
		 * @author Marwin
		 * @reason This includes all the players that are in the preset schedule
		 */
		let MentionMessage = [

		];

		const SendingDays = interaction.options.getString('days');
		let team = interaction.channel.parent.name // get category name

		DayString = (`${SendingDays}`); //push in sending dates

		let yesEmoji = "<:2ez_Schedule_Yes:933802728130494524>";
		let noEmoji = "<:2ez_Schedule_No:933803257120313406>";
		let neutralEmoji = "<:2ez_neutral:892794587712745543>";
		let tentativeEmoji = "<:2ez_Schedule_tentative:933802728138899556>";

		const DidntFindSchedule = new MessageEmbed()
			.setDescription(`${noEmoji} Error / ID : FILE_NOT_FOUND / 1`)
			.setFooter({
				text: "Your error code: 1_FILE_NOT_FOUND/MISSING_MODULE"
			})
			.setColor('DARK_BUT_NOT_BLACK');

		const DidntDeleteSchedulePreset = new MessageEmbed()
			.setDescription(`> It looks like your an into an error!`)
			.setFooter({
				text: `Couldn't find a file called ${interaction.channel.parent.name}.json!`
			})
			.setColor('DARK_BUT_NOT_BLACK');

		const NotAbleToReactEmbed = new MessageEmbed()
			.setDescription(`> Your User ID does not appear on the following list: **Check_User_ID_Array** `)
			.setColor('DARK_BUT_NOT_BLACK');

		const NotAbleToDeleteEmbed = new MessageEmbed()
			.setDescription(`> Only the creator of the schedule, ${interaction.member.user.username}, can use this! `)
			.setColor('DARK_BUT_NOT_BLACK');

		const OnlyScheduleCreatorEmbed = new MessageEmbed()
			.setDescription(`This is only available to the person who activated the auto sending!`)
			.setColor('DARK_BUT_NOT_BLACK')

		const SuccessSaveEmbed = new MessageEmbed()
			.setDescription(`<:2ezBotV2_YES:951558270340972574> The bot will send your schedule on the days you selected!`)
			.setColor('GREEN');

		const SuccessStopCronEmbed = new MessageEmbed()
			.setDescription(`<:2ezBotV2_YES:951558270340972574> Your schedule will not be sent again!`)
			.setColor('GREEN');

		const DisableRemindersEmbed = new MessageEmbed()
			.setDescription(`<:2ezBotV2_YES:951558270340972574> You won't be notified for this schedule!`)
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
				.setCustomId('ButStopCron')
				.setLabel('Stop resending')
				.setStyle("PRIMARY")
			)
			.addComponents(
				new MessageButton()
				.setCustomId('ButDelete')
				.setLabel('Disable reminders')
				.setStyle("PRIMARY")
			);

		await interaction.reply({
			content: "Your schedule date has been set!",
			embeds: [
				SuccessSaveEmbed
			],
		});

		console.log(`Set an automatic schedule in ${interaction.channel.parent.name} - Author: ${interaction.member.user.username}`);

		var autoschedule = cron.schedule('0 8 * * *', () => { //0 8 * * *

			let date = new Date();
			let day = date.toLocaleString('en-gb', {
				weekday: 'long'
			});

			if (!DayString.toLowerCase().includes(day.toLocaleLowerCase())) { //check if current day is in sending string
				console.log('Date didnt appear in string!');
				console.log(`Expected ${day.toLocaleLowerCase()} - got ${DayString.toLocaleLowerCase()}`);
				return;
			};

			fs.readFile(`Schedule_${interaction.channel.parent.name}.json`, 'utf-8', async (err, jsonString, ) => {

				if (err) {

					SendChannel.send({
						embeds: [
							DidntFindSchedule
						],
					});

					autoschedule.stop();
					console.log('Automatic schedule returned early due to missing preset!', SendChannel.name);

					return;

				} else {

					Check_User_Array.length = 0;
					ScrimDescripton.length = 0;
					MentionMessage.length = 0;

					User_One_Array.length = 0;
					User_Second_Array.length = 0;
					User_Third_Array.length = 0;
					User_Fourth_Array.length = 0;
					User_Fith_Array.length = 0;
					User_Sixth_Array.length = 0;
					User_Seventh_Array.length = 0;
					User_Eighth_Array.length = 0;


					const data = JSON.parse(jsonString);

					// Push in all the IDs to make clear who can react!

					Check_User_Array.push(data.userOneIDJson);
					Check_User_Array.push(data.userSecondIDJson);
					Check_User_Array.push(data.userThirdIDJson);
					Check_User_Array.push(data.userFourthIDJson);
					Check_User_Array.push(data.userFithIDJson);
					Check_User_Array.push(data.userSixthIDJson);

					if (data.userSeventhJson == "-") {

						Check_User_Array.push(data.userOneIDJson);

					} else {

						Check_User_Array.push(data.userSeventhIDJson);

					};

					if (data.userEighthJson == "-") {

						Check_User_Array.push(data.userOneIDJson);

					} else {

						Check_User_Array.push(data.userEighthIDJson);

					};

					// Push in all users and the neutral emoji!
					//The following Arrays will be used as the embed Description!

					ScrimDescripton.push(data.ScrimDescriptonJson);

					User_One_Array.push(`${neutralEmoji} ${data.userOneJson}`);
					User_Second_Array.push(`${neutralEmoji} ${data.userSecondJson}`);
					User_Third_Array.push(`${neutralEmoji} ${data.userThirdJson}`);
					User_Fourth_Array.push(`${neutralEmoji} ${data.userFourthJson}`);
					User_Fith_Array.push(`${neutralEmoji} ${data.userFithJson}`);
					User_Sixth_Array.push(`${neutralEmoji} ${data.userSixthJson}`);

					if (data.userSeventhJson == "-") {

						User_Seventh_Array.push('');

					} else {

						User_Seventh_Array.push(`${neutralEmoji} ${data.userSeventhJson}`);

					};

					if (data.userEighthJson == "-") {

						User_Eighth_Array.push('');

					} else {

						User_Eighth_Array.push(`${neutralEmoji} ${data.userEighthJson}`);

					};

					//Push in all the Users, so they get pinged later on!

					MentionMessage.push(data.userOneJson);
					MentionMessage.push(data.userSecondJson);
					MentionMessage.push(data.userThirdJson);
					MentionMessage.push(data.userFourthJson);
					MentionMessage.push(data.userFithJson);
					MentionMessage.push(data.userSixthJson);

					if (data.userSeventhJson == "-") {

						MentionMessage.push('');

					} else {

						MentionMessage.push(data.userSeventhJson);

					};

					if (data.userEighthJson == "-") {

						MentionMessage.push('');

					} else {

						MentionMessage.push(data.userEighthJson);

					};

					let UserMessages = ScrimDescripton.toString() + "\n" + "\n" +
						User_One_Array.toString() + "\n" + "\n" +
						User_Second_Array.toString() + "\n" + "\n" +
						User_Third_Array.toString() + "\n" + "\n" +
						User_Fourth_Array.toString() + "\n" + "\n" +
						User_Fith_Array.toString() + "\n" + "\n" +
						User_Sixth_Array.toString() + "\n" + "\n" +
						User_Seventh_Array.toString() + "\n" + "\n" +
						User_Eighth_Array.toString();

					const ScheduleEmbed = new MessageEmbed()
						.setTitle(`${team}'s Schedule | Automatic schedule`)
						.setDescription(UserMessages)
						.setColor('GREYPLE')
						.setFooter({
							text: `Created by ${interaction.member.user.username} | This is a preset / saved schedule!`
						})
						.setTimestamp()

					SendChannel.send({
						content: `This is your schedule for ${MentionMessage}`,
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

						const StopCronScheduleCollector = sentMessage.createMessageComponentCollector({
							componentType: 'BUTTON'
						});

						const deletecollector = sentMessage.createMessageComponentCollector({
							componentType: 'BUTTON'
						});

						var reminderschedule = cron.schedule('45 17 * * *', () => { //45 17 * * *

							SendChannel.send(`${MentionMessage.toString().replace(/,/g, ' ')} here is your reminder for the scrim in 15 Minutes!`);

							console.log('Sent reminder message!');

						});

						url_taskMap['url'] = reminderschedule;
						let reminders = url_taskMap['url'];

						var closereminders = cron.schedule('47 17 * * *', () => { //45 18 * * *

							reminders.stop();

						});

						yescollector.on('collect', i => {

							if (i.customId === "ButYes") {

								if (!Check_User_Array.includes(i.user.id)) {
									i.reply({
										content: "You are not able to react here!",
										embeds: [
											NotAbleToReactEmbed
										],
										ephemeral: true
									})
									return;
								}

								try {

									if (i.member.user.id == data.userOneIDJson) {

										User_One_Array.pop();
										User_One_Array.push(`${yesEmoji} ${data.userOneJson}`);

									};

								} catch {

								};

								try {

									if (i.member.user.id == data.userSecondIDJson) {

										User_Second_Array.pop();
										User_Second_Array.push(`${yesEmoji} ${data.userSecondJson}`);

									};

								} catch {

								};

								try {

									if (i.member.user.id == data.userThirdIDJson) {

										User_Third_Array.pop();
										User_Third_Array.push(`${yesEmoji} ${data.userThirdJson}`);

									};

								} catch {

								};

								try {

									if (i.member.user.id == data.userFourthIDJson) {

										User_Fourth_Array.pop();
										User_Fourth_Array.push(`${yesEmoji} ${data.userFourthJson}`);

									};

								} catch {

								};

								try {

									if (i.member.user.id == data.userFithIDJson) {

										User_Fith_Array.pop();
										User_Fith_Array.push(`${yesEmoji} ${data.userFithJson}`);

									};

								} catch {

								};

								try {

									if (i.member.user.id == data.userSixthIDJson) {

										User_Sixth_Array.pop();
										User_Sixth_Array.push(`${yesEmoji} ${data.userSixthJson}`)

									}

								} catch {

								};

								try {

									if (i.member.user.id == data.userSeventhIDJson) {

										User_Seventh_Array.pop();
										User_Seventh_Array.push(`${yesEmoji} ${data.userSeventhJson}`);

									};

								} catch {

								};

								try {

									if (i.member.user.id == data.userEighthIDJson) {

										User_Eighth_Array.pop();
										User_Eighth_Array.push(`${yesEmoji} ${data.userEighthJson}`);

									};

								} catch {

								};

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

								i.deferUpdate()

							};

						});

						nocollector.on('collect', i => {

							if (i.customId === "ButNo") {

								if (!Check_User_Array.includes(i.user.id)) {
									i.reply({
										content: "You are not able to react here!",
										embeds: [
											NotAbleToReactEmbed
										],
										ephemeral: true
									})
									return;
								}

								try {

									if (i.member.user.id == data.userOneIDJson) {

										User_One_Array.pop();
										User_One_Array.push(`${noEmoji} ${data.userOneJson}`)

									}

								} catch {

								}

								try {

									if (i.member.user.id == data.userSecondIDJson) {

										User_Second_Array.pop();
										User_Second_Array.push(`${noEmoji} ${data.userSecondJson}`)

									}

								} catch {

								}

								try {

									if (i.member.user.id == data.userThirdIDJson) {

										User_Third_Array.pop();
										User_Third_Array.push(`${noEmoji} ${data.userThirdJson}`)

									}

								} catch {

								}

								try {

									if (i.member.user.id == data.userFourthIDJson) {

										User_Fourth_Array.pop();
										User_Fourth_Array.push(`${noEmoji} ${data.userFourthJson}`)

									}

								} catch {

								}

								try {

									if (i.member.user.id == data.userFithIDJson) {

										User_Fith_Array.pop();
										User_Fith_Array.push(`${noEmoji} ${data.userFithJson}`)

									}

								} catch {

								}

								try {

									if (i.member.user.id == data.userSixthIDJson) {

										User_Sixth_Array.pop();
										User_Sixth_Array.push(`${noEmoji} ${data.userSixthJson}`)

									}

								} catch {

								};

								try {

									if (i.member.user.id == data.userSeventhIDJson) {

										User_Seventh_Array.pop();
										User_Seventh_Array.push(`${noEmoji} ${data.userSeventhJson}`);

									};

								} catch {

								};

								try {

									if (i.member.user.id == data.userEighthIDJson) {

										User_Eighth_Array.pop();
										User_Eighth_Array.push(`${noEmoji} ${data.userEighthJson}`);

									};

								} catch {

								};

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

							}

						});

						idkcollector.on('collect', i => {

							if (i.customId === "ButIdk") {

								if (!Check_User_Array.includes(i.user.id)) {
									i.reply({
										content: "You are not able to react here!",
										embeds: [
											NotAbleToReactEmbed
										],
										ephemeral: true
									})
									return;
								}

								try {

									if (i.member.user.id == data.userOneIDJson) {

										User_One_Array.pop();
										User_One_Array.push(`${tentativeEmoji} ${data.userOneJson}`)

									}

								} catch {

								}

								try {

									if (i.member.user.id == data.userSecondIDJson) {

										User_Second_Array.pop();
										User_Second_Array.push(`${tentativeEmoji} ${data.userSecondJson}`)

									}

								} catch {

								}

								try {

									if (i.member.user.id == data.userThirdIDJson) {

										User_Third_Array.pop();
										User_Third_Array.push(`${tentativeEmoji} ${data.userThirdJson}`)

									}

								} catch {

								}

								try {

									if (i.member.user.id == data.userFourthIDJson) {

										User_Fourth_Array.pop();
										User_Fourth_Array.push(`${tentativeEmoji} ${data.userFourthJson}`)

									}

								} catch {

								}

								try {

									if (i.member.user.id == data.userFithIDJson) {

										User_Fith_Array.pop();
										User_Fith_Array.push(`${tentativeEmoji} ${data.userFithJson}`)

									}

								} catch {

								}

								try {

									if (i.member.user.id == data.userSixthIDJson) {

										User_Sixth_Array.pop();
										User_Sixth_Array.push(`${tentativeEmoji} ${data.userSixthJson}`)

									}

								} catch {

								};

								try {

									if (i.member.user.id == data.userSeventhIDJson) {

										User_Seventh_Array.pop();
										User_Seventh_Array.push(`${tentativeEmoji} ${data.userSeventhJson}`);

									};

								} catch {

								};

								try {

									if (i.member.user.id == data.userEighthIDJson) {

										User_Eighth_Array.pop();
										User_Eighth_Array.push(`${tentativeEmoji} ${data.userEighthJson}`);

									};

								} catch {

								};

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

							}

						});

						StopCronScheduleCollector.on('collect', i => {

							if (i.customId === "ButStopCron") {

								if (i.user.id !== IntAuhtor) {
									i.reply({
										content: "You are not able to use this!",
										embeds: [
											OnlyScheduleCreatorEmbed
										],
										ephemeral: true
									})
									return;
								}

								try {

									autoschedule.stop();
									reminders.stop();

									i.reply({
										embeds: [
											SuccessStopCronEmbed
										],
									});

								} catch {

									i.reply(`Error / ID : BAD_UNLINK_REQUEST / 9`);
									return;

								};

							};

						});

						deletecollector.on('collect', i => {

							if (i.customId === "ButDelete") {

								if (i.user.id !== IntAuhtor) {
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

									reminders.stop();
									console.log(`Disabled reminders for ${SendChannel.name}!`)

								} catch (e) {

									i.reply('Oops this is awkward... Something went wrong.');
									console.log(e);
									return;

								};

								i.reply({
									embeds: [
										DisableRemindersEmbed
									],
								})

							};

						});

					});

				};

			});

		});
	},
};