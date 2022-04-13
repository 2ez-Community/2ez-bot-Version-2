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
var cron = require('node-cron');

//This code has been written by me, Marwin!

module.exports = {
	data: new SlashCommandBuilder()
		.setName('schedulepreset')

		.setDescription('Send a preset schedule! This will only work if you have saved a schedule yet!'),

	async execute(interaction) {

		// if (interaction.member.id !== "420277395036176405") {

		// 	interaction.reply({
		// 		content: "This command is currently unavailable!",
		// 		ephemeral: true
		// 	});

		// 	return;

		// }

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
		 * @type {Array} - This is the array that will hold the reminder cron schedule
		 */
		const url_taskMap = {}

		let team = interaction.channel.parent.name // get category name

		const Schedulename = (`Schedule_${interaction.channel.parent.name}.json`);

		let yesEmoji = "<:2ez_Schedule_Yes:933802728130494524>";
		let noEmoji = "<:2ez_Schedule_No:933803257120313406>";
		let neutralEmoji = "<:2ez_neutral:892794587712745543>";
		let tentativeEmoji = "<:2ez_Schedule_tentative:933802728138899556>";

		const DidntFindSchedule = new MessageEmbed()
			.setDescription(`Error / ID : FILE_NOT_FOUND / 1 - Critical Error`)
			.setColor('DARK_BUT_NOT_BLACK');

		const DidntDeleteSchedulePreset = new MessageEmbed()
			.setDescription(`> It looks like your an into an error!`)
			.setFooter({
				text: `Couldn't find a file called ${interaction.channel.parent.name}.json!`
			})
			.setColor('DARK_BUT_NOT_BLACK');

		const DeletedSchedulePreset = new MessageEmbed()
			.setDescription(`<:2ezBotV2_YES:951558270340972574> Your Preset has been deleted!`)
			.setColor('GREEN')
			.setFooter({
				text: `Deleted: ${interaction.channel.parent.name}.json!`
			});

		const NotAbleToReactEmbed = new MessageEmbed()
			.setDescription(`> Your User ID does not appear on the following list: **Check_User_ID_Array** `)
			.setColor('DARK_BUT_NOT_BLACK');

		const NotAbleToDeleteEmbed = new MessageEmbed()
			.setDescription(`> Only the creator of the schedule, ${interaction.member.user.username}, can use this! `)
			.setColor('DARK_BUT_NOT_BLACK');

		const OnlyScheduleCreatorEmbed = new MessageEmbed()
			.setDescription(`This is only available to the person who saved the schedule!`)
			.setColor('DARK_BUT_NOT_BLACK')

		const DisableRemindersEmbed = new MessageEmbed()
			.setDescription(`<:2ezBotV2_YES:951558270340972574> You won't be notified for this schedule!`)
			.setColor('GREEN');

		const DMOptionsEmbed = new MessageEmbed()
			.setTitle('Choose your option')
			.setDescription(`What do you want to do with the schedule in ${interaction.channel} ?`)
			.setColor('DARK_BUT_NOT_BLACK')

		fs.readFile(`Schedule_${interaction.channel.parent.name}.json`, 'utf-8', async (err, jsonString, ) => {

			if (err) {

				interaction.reply({
					content: `I couldn't find a preset called ${interaction.channel.parent.name}.json !`,
					embeds: [
						DidntFindSchedule
					],
					ephemeral: true,
				})
				return;

			} else {

				const data = JSON.parse(jsonString);

				try {

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

					console.log('Check complete!');

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

					console.log('Users Push complete');

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

					console.log('Mention complete!');

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
						.setTitle(`${team}'s Schedule`)
						.setDescription(UserMessages)
						.setColor('GREYPLE')
						.setFooter({
							text: `Created by ${interaction.member.user.username} | This is a preset / saved schedule!`
						})
						.setTimestamp()

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
						)

					await interaction.reply(`> Here is your schedule preset for the following users: ${MentionMessage}.`).then(

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

							const deletecollector = sentMessage.createMessageComponentCollector({
								componentType: 'BUTTON'
							});

							var reminderschedule = nodeCron.schedule('45 17 * * *', () => { //45 17 * * * - Set a cron schedule for the bot to send reminders to the users.

								interaction.channel.send(`${MentionMessage.toString().replace(/,/g, ' ')} here is your reminder for the scrim in 15 Minutes!`);

							});

							url_taskMap['url'] = reminderschedule;
							let reminders = url_taskMap['url'];

							var closereminders = nodeCron.schedule('47 17 * * *', () => { //47 17 * * * This cron schedule deletes the reminders after the scrim has ended so it's not sent twice.

								reminders.stop();

							});

							console.log('Created Collectors / Sent message / Set reminder');

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

							//fs.unlink()

							ManageScheduleCollector.on('collect', async i => {

								if (i.customId === "ButManage") {

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

									const Options = new MessageActionRow()
										.addComponents(
											new MessageButton()
											.setCustomId('ButDestroy')
											.setLabel('Destroy Preset')
											.setStyle('SECONDARY'),
										)
										.addComponents(
											new MessageButton()
											.setCustomId('ButDisableReminder')
											.setLabel('Disable reminder')
											.setStyle('SECONDARY'),
										)

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

										const DestroyCollector = sentMessage.createMessageComponentCollector({
											componentType: 'BUTTON'
										});

										const DisableCollector = sentMessage.createMessageComponentCollector({
											componentType: 'BUTTON'
										});

										DestroyCollector.on('collect', async i => {

											if (i.customId === "ButDestroy") {

												if (i.user.id !== data.ScheduleCreatorID) {
													i.reply({
														content: "You are not able to use this!",
														embeds: [
															OnlyScheduleCreatorEmbed
														],
														ephemeral: true
													})
													return;
												};

												try {

													fs.unlink(Schedulename, async (err) => {

														if (err) {

															i.reply({
																content: `${err}`,
																embeds: [
																	DidntDeleteSchedulePreset
																],
																ephemeral: true
															})

															return;

														} else {

															console.log(`${i.user.tag} destroyed the Saved Schedule for ${interaction.channel.parent.name}`);

															i.reply({
																embeds: [
																	DeletedSchedulePreset
																],
																ephemeral: true
															})

														}

													})

												} catch {

													i.reply(`Error / ID : BAD_UNLINK_REQUEST / 9`)
													return;

												};

											};

										});

										DisableCollector.on('collect', async i => {

											if (i.customId === "ButDisableReminder") {

												try {

													reminders.stop();

												} catch {

													i.reply("Something went wrong! Please try again!");
													return;

												};

												i.reply({
													embeds: [
														DisableRemindersEmbed
													],
												});

											};

										});

									});

								};

							});

							deletecollector.on('collect', i => {

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
									}

									try {

										//clear all existing arrays for better performence

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

										reminders.stop();

									} catch {

										const embed = new MessageEmbed()
											.setDescription('Error ID: `BAD_UNLINK_REQUEST/ 9 ` Contact the Dev if you see this!')
											.setColor('RED')

										i.reply({
											content: 'Something went wrong...!',
											embeds: [
												embed
											],
											ephemeral: true
										});

										return;
									}

									//Delete schedule

									sentMessage.delete().catch(() => {

										console.log('Error ID: 10');

									});

									interaction.deleteReply().catch(() => {

										console.log('Error ID: 11');

									})

									i.reply({
										content: 'Everything has been deleted!',
										ephemeral: true
									});

								}

							});

						}),

					)

				} catch (err) {

					console.log('Error passing JSON', err)
					interaction.reply('Something went wrong! Error ID: 2');
					return;
				}

			}
		})
	},
};