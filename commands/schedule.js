const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const exp = require('constants');

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

		.addStringOption(option => option.setName('description').setDescription('This will be the description of your schedule!')),

	async execute(interaction) {

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

		const userOne = interaction.options.getMember('user-one');

		const userSecond = interaction.options.getMember('user-second');

		const userThird = interaction.options.getMember('user-third');

		const userFourth = interaction.options.getMember('user-fourth');

		const userFith = interaction.options.getMember('user-fith');

		const userSixth = interaction.options.getMember('user-sixth');

		const userSeventh = interaction.options.getMember('user-seventh');

		const userEighth = interaction.options.getMember('user-eighth');

		const OptionalScrimDescription = interaction.options.getString('description');

		try {

			ScrimDescripton.push(OptionalScrimDescription);

		} catch (e) {

			console.log(e);
			ScrimDescripton.push('> React to change your availability!');
		}

		if (OptionalScrimDescription == ">" || !OptionalScrimDescription) {

			ScrimDescripton.push("React to change your availability.");

		}

		let yesEmoji = "<:2ez_yes:892497964243779604>";
		let noEmoji = "<:2ez_no:892498012000096306>";
		let neutralEmoji = "<:2ez_neutral:892794587712745543>";
		let tentativeEmoji = "<:2ez_tentative:892800624754823228>";

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
				content: "Something didn't work...",
				ephemeral: true
			})
			console.log(e);
			return;

		}

		console.log('Exported name!');

		// ⬇ Description of the embed
		let UserMessages = ScrimDescripton.toString() + "\n" + "\n" +

			User_One_Array.toString() + "\n" + "\n" +

			User_Second_Array.toString() + "\n" + "\n" +

			User_Third_Array.toString() + "\n" + "\n" +

			User_Fourth_Array.toString() + "\n" + "\n" +

			User_Fith_Array.toString() + "\n" + "\n" +

			User_Sixth_Array.toString() + "\n" + "\n" +

			User_Seventh_Array.toString() + "\n" + "\n" +

			User_Eighth_Array.toString();

		let team = `${interaction.channel.parent.name}`; // get category name

		const ScheduleEmbed = new MessageEmbed()
			.setTitle(`${team}'s Schedule`)
			.setDescription(UserMessages)
			.setColor('GREYPLE')
			.setFooter(`Created by ${interaction.member.user.username}`)
			.setTimestamp()

		const SuccesfullyEditedEmbed = new MessageEmbed()
			.setDescription('> Successfully changed your availability!')
			.setColor('DARK_BUT_NOT_BLACK')

		const NotAbleToReactEmbed = new MessageEmbed()
			//eligible
			.setDescription(`> Your User ID does not appear on the following list: **Check_User_ID_Array** `)
			.setColor('DARK_BUT_NOT_BLACK')

		const NotAbleToDeleteEmbed = new MessageEmbed()
			//eligible
			.setDescription(`> Only the creator of this schedule , ${interaction.member.user.username}, can use this!`)
			.setColor('DARK_BUT_NOT_BLACK')

		const Buttons = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setCustomId('ButYes')
				.setEmoji('<:2ez_yes:892497964243779604>')
				.setStyle('SECONDARY'),
			)
			.addComponents(
				new MessageButton()
				.setCustomId('ButNo')
				.setEmoji('<:2ez_no:892498012000096306>')
				.setStyle('SECONDARY'),
			)
			.addComponents(
				new MessageButton()
				.setCustomId('ButIdk')
				.setEmoji('<:2ez_tentative:892800624754823228>')
				.setStyle('SECONDARY'),
			)
			.addComponents(
				new MessageButton()
				.setCustomId('ButEdit')
				.setLabel('Save')
				.setStyle("PRIMARY")
			)
			.addComponents(
				new MessageButton()
				.setCustomId('ButDelete')
				.setLabel('Delete')
				.setStyle("DANGER")
			)

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

				const editcollector = sentMessage.createMessageComponentCollector({
					componentType: 'BUTTON'
				});

				const deletecollector = sentMessage.createMessageComponentCollector({
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
						}

						try {

							if (i.member.user.id == userOne.user.id) {

								User_One_Array.pop();
								User_One_Array.push(`${yesEmoji} ${userOne}`)

							}

						} catch {

						}

						try {

							if (i.member.user.id == userSecond.user.id) {

								User_Second_Array.pop();
								User_Second_Array.push(`${yesEmoji} ${userSecond}`)

							}

						} catch {

						}

						try {

							if (i.member.user.id == userThird.user.id) {

								User_Third_Array.pop();
								User_Third_Array.push(`${yesEmoji} ${userThird}`)

							}

						} catch {

						}

						try {

							if (i.user.id == userFourth.user.id) {

								User_Fourth_Array.pop();
								User_Fourth_Array.push(`${yesEmoji} ${userFourth}`)

							}

						} catch {

						}

						try {

							if (i.user.id == userFith.user.id) {

								User_Fith_Array.pop();
								User_Fith_Array.push(`${yesEmoji} ${userFith}`)

							}

						} catch {

						}

						try {

							if (i.user.id == userSixth.user.id) {

								User_Sixth_Array.pop();
								User_Sixth_Array.push(`${yesEmoji} ${userSixth}`)

							}

						} catch {

						}

						try {

							if (i.user.id == userSeventh.user.id) {

								User_Seventh_Array.pop();
								User_Seventh_Array.push(`${yesEmoji} ${userSeventh}`)

							}

						} catch {

						}

						try {

							if (i.user.id == userEighth.user.id) {

								User_Eighth_Array.pop();
								User_Eighth_Array.push(`${yesEmoji} ${userEighth}`)

							}

						} catch {

						}

						const ScheduleEdit = new MessageEmbed()
							.setTitle(`${team}'s Schedule`)
							.setDescription(ScrimDescripton.toString() + "\n" + "\n" + User_One_Array.toString() + "\n" + "\n" + User_Second_Array.toString() + "\n" + "\n" + User_Third_Array.toString() + "\n" + "\n" + User_Fourth_Array.toString() + "\n" + "\n" + User_Fith_Array.toString() + "\n" + "\n" + User_Sixth_Array.toString() + "\n" + "\n" + User_Seventh_Array.toString() + "\n" + "\n" + User_Eighth_Array.toString())
							.setColor('GREEN')
							.setFooter(`Created by ${interaction.member.user.username} | Latest reaction by ${i.user.username}`)
							.setTimestamp()

						sentMessage.edit({
							embeds: [
								ScheduleEdit
							],
						});

						i.reply({

							content: "Changed your availability!",
							embeds: [
								SuccesfullyEditedEmbed
							],
							ephemeral: true

						});

					}

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
						}

						try {

							if (i.member.user.id == userOne.user.id) {

								User_One_Array.pop();
								User_One_Array.push(`${noEmoji} ${userOne}`)

							}

						} catch {

						}

						try {

							if (i.member.user.id == userSecond.user.id) {

								User_Second_Array.pop();
								User_Second_Array.push(`${noEmoji} ${userSecond}`)

							}

						} catch {

						}

						try {

							if (i.member.user.id == userThird.user.id) {

								User_Third_Array.pop();
								User_Third_Array.push(`${noEmoji} ${userThird}`)

							}

						} catch {

						}

						try {

							if (i.user.id == userFourth.user.id) {

								User_Fourth_Array.pop();
								User_Fourth_Array.push(`${noEmoji} ${userFourth}`)

							}

						} catch {

						}

						try {

							if (i.user.id == userFith.user.id) {

								User_Fith_Array.pop();
								User_Fith_Array.push(`${noEmoji} ${userFith}`)

							}

						} catch {

						}

						try {

							if (i.user.id == userSixth.user.id) {

								User_Sixth_Array.pop();
								User_Sixth_Array.push(`${noEmoji} ${userSixth}`)

							}

						} catch {

						}

						try {

							if (i.user.id == userSeventh.user.id) {

								User_Seventh_Array.pop();
								User_Seventh_Array.push(`${noEmoji} ${userSeventh}`)

							}

						} catch {

						}

						try {

							if (i.user.id == userEighth.user.id) {

								User_Eighth_Array.pop();
								User_Eighth_Array.push(`${noEmoji} ${userEighth}`)

							}

						} catch {

						}


						const ScheduleEdit = new MessageEmbed()
							.setTitle(`${team}'s Schedule`)
							.setDescription(ScrimDescripton.toString() + "\n" + "\n" + User_One_Array.toString() + "\n" + "\n" + User_Second_Array.toString() + "\n" + "\n" + User_Third_Array.toString() + "\n" + "\n" + User_Fourth_Array.toString() + "\n" + "\n" + User_Fith_Array.toString() + "\n" + "\n" + User_Sixth_Array.toString() + "\n" + "\n" + User_Seventh_Array.toString() + "\n" + "\n" + User_Eighth_Array.toString())
							.setColor('RED')
							.setFooter(`Created by ${interaction.member.user.username} | Latest reaction by ${i.user.username}`)
							.setTimestamp()

						sentMessage.edit({
							embeds: [
								ScheduleEdit
							],
						});

						i.reply({

							content: "Changed your availability!",
							embeds: [
								SuccesfullyEditedEmbed
							],
							ephemeral: true

						});

					}

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
						}

						try {

							if (i.member.user.id == userOne.user.id) {

								User_One_Array.pop();
								User_One_Array.push(`${tentativeEmoji} ${userOne}`)

							}

						} catch {

						}

						try {

							if (i.member.user.id == userSecond.user.id) {

								User_Second_Array.pop();
								User_Second_Array.push(`${tentativeEmoji} ${userSecond}`)

							}

						} catch {

						}

						try {

							if (i.member.user.id == userThird.user.id) {

								User_Third_Array.pop();
								User_Third_Array.push(`${tentativeEmoji} ${userThird}`)

							}

						} catch {

						}

						try {

							if (i.user.id == userFourth.user.id) {

								User_Fourth_Array.pop();
								User_Fourth_Array.push(`${tentativeEmoji} ${userFourth}`)

							}

						} catch {

						}

						try {

							if (i.user.id == userFith.user.id) {

								User_Fith_Array.pop();
								User_Fith_Array.push(`${tentativeEmoji} ${userFith}`)

							}

						} catch {

						}

						try {

							if (i.user.id == userSixth.user.id) {

								User_Sixth_Array.pop();
								User_Sixth_Array.push(`${tentativeEmoji} ${userSixth}`)

							}

						} catch {

						}

						try {

							if (i.user.id == userSeventh.user.id) {

								User_Seventh_Array.pop();
								User_Seventh_Array.push(`${tentativeEmoji} ${userSeventh}`)

							}

						} catch {

						}

						try {

							if (i.user.id == userEighth.user.id) {

								User_Eighth_Array.pop();
								User_Eighth_Array.push(`${tentativeEmoji} ${userEighth}`)

							}

						} catch {

						}

						const ScheduleEdit = new MessageEmbed()
							.setTitle(`${team}'s Schedule`)
							.setDescription(ScrimDescripton.toString() + "\n" + "\n" + User_One_Array.toString() + "\n" + "\n" + User_Second_Array.toString() + "\n" + "\n" + User_Third_Array.toString() + "\n" + "\n" + User_Fourth_Array.toString() + "\n" + "\n" + User_Fith_Array.toString() + "\n" + "\n" + User_Sixth_Array.toString() + "\n" + "\n" + User_Seventh_Array.toString() + "\n" + "\n" + User_Eighth_Array.toString())
							.setColor('BLURPLE')
							.setFooter(`Created by ${interaction.member.user.username} | Latest reaction by ${i.user.username}`)
							.setTimestamp()

						sentMessage.edit({
							embeds: [
								ScheduleEdit
							],
						});

						i.reply({

							content: "Changed your availability!",
							embeds: [
								SuccesfullyEditedEmbed
							],
							ephemeral: true

						});

					}

				});

				editcollector.on('collect', async i => {

					const ReadytoCollectMessagesEmbed = new MessageEmbed()
						.setDescription(`I am now waiting for your next message!`)
						.setFooter(`You got 30 seconds until timeout!`)
						.setColor('DARK_BUT_NOT_BLACK')

					if (i.customId === "ButEdit") {

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

						if (!userOne || !userSecond || !userThird || !userFourth || !userFith || !userSixth) {

							i.reply({
								content: "You can only save a schedule if it features at least `6 people`!",
								ephemeral: true
							});
							return;

						}

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
							ScrimDescriptonJson: `${ScrimDescripton}`
						}

						let JSONuserMessage =
							`Hey there ${i.user.username} 👋` + "\n" +
							"You just saved this schedule:" + "\n" + "\n" +
							`Description: ${ScrimDescripton}` + "\n" +
							`First User: ${userOne}` + "\n" +
							`Second User: ${userSecond}` + "\n" +
							`Third User: ${userThird}` + "\n" +
							`Fourth User: ${userFourth}` + "\n" +
							`Fith User: ${userFith}` + "\n" +
							`Sixth User: ${userSixth}` + "\n" + "\n" +
							`If you use /schedulepreset now, this will be your schedule!` + "\n" + "\n" +
							`🥰 Your 2ez Bot!` + "\n" + "\n" +
							`Your File: **Schedule_${interaction.channel.parent.name}.json**` + "\n" +
							`Access: **${interaction.channel.parent.name}** through **${interaction.member.user.username}**`

						fs.writeFile(`Schedule_${interaction.channel.parent.name}.json`, JSON.stringify(NewScheduleData, null, 2), async (err) => {

							if (err) {

								i.reply(`Something didnt work! Check the error for more info: ${err}`);
								console.log(err);
								return;

							} else {

								await i.reply({
									content: `Your data has been saved successfully. Your file: **${interaction.channel.parent.name}.json**. For more info, check your DMs!`,
									ephemeral: true
								});
								console.log(`Saved Schedule Data in: Schedule_${interaction.channel.parent.name}.json`);

								i.user.send(JSONuserMessage).catch((e) => {

									console.log(`Couldnt send the message! Error: ${e}`);

								})

							}

						})

						/*
						const MessageFilter = m => m.author.id === i.user.id;
						const MessageCollector = sentMessage.channel.createMessageCollector({
							MessageFilter,
							time: 30000
						});

						
						i.reply({
							content: `Alrigth ${i.user.username}, what do you want the new description to be?`,
							embeds: [
								ReadytoCollectMessagesEmbed
							],
							ephemeral: true
							

						await i.user.send({
								embeds: [
									MessageEditChoiceEmbed
								]
							}),

							i.reply({

								content: "I sent a message into your DMs!",
								ephemeral: true

							}).then(

								MessageCollector.on('collect', m => {

									if (m.author.id !== i.user.id) return;

									try {

										ScrimDescripton.pop()

									} catch {

										i.channel.send({
											content: "Something didn't work when trying to delete the old description!",
											ephemeral: true
										})
										return;

									}

									try {

										ScrimDescripton.push(m.content);

									} catch {

										i.channel.send({
											content: "Something didn't work when tring to update the description!",
											ephemeral: true
										})
										return;

									}

									const ScheduleEdit = new MessageEmbed()
										.setTitle(`${team}'s Schedule`)
										.setDescription(ScrimDescripton.toString() + "\n" + "\n" + User_One_Array.toString() + "\n" + "\n" + User_Second_Array.toString() + "\n" + "\n" + User_Third_Array.toString() + "\n" + "\n" + User_Fourth_Array.toString() + "\n" + "\n" + User_Fith_Array.toString() + "\n" + "\n" + User_Sixth_Array.toString())
										.setColor('DARK_BUT_NOT_BLACK')
										.setFooter(`Created by ${interaction.member.user.username} | Edited by ${i.user.tag}`)
										.setTimestamp()

									try {

										sentMessage.edit({
											embeds: [
												ScheduleEdit
											],
										});

										MessageCollector.time = 0;

									} catch {

										const ErrorEmbed = new MessageEmbed()
											.setDescription('Error: `BAD_INTERACTION_PUSH / 8` - Contact the Dev if you see this!')
											.setColor('RED')

										i.channel.send({
											embeds: [
												ErrorEmbed
											]
										})

									}

									m.delete().catch(() => {

										console.log('Something went wrong when trying to delete the users new description!');
										return;

									})

								})

							)
							*/

					}

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

						} catch {

							const embed = new MessageEmbed()
								.setDescription('Error ID: `BAD_ARRAY_POP / 9 ` Contact the Dev if you see this!')
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

						i.reply({
							content: 'Everything has been deleted!',
							ephemeral: true
						});

					}

				});

			})

		)
	},
}