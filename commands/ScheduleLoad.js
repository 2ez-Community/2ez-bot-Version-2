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

module.exports = {
	data: new SlashCommandBuilder()
		.setName('schedulepreset')

		.setDescription('Send a preset schedule! This will only work if you have saved a schedule yet!'),

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

		let team = interaction.channel.parent.name // get category name

		let yesEmoji = "<:2ez_yes:892497964243779604>";
		let noEmoji = "<:2ez_no:892498012000096306>";
		let neutralEmoji = "<:2ez_neutral:892794587712745543>";
		let tentativeEmoji = "<:2ez_tentative:892800624754823228>";

		const DidntFindSchedule = new MessageEmbed()
			.setDescription(`Error / ID : FILE_NOT_FOUND / 1 - Critical Error`)
			.setColor('DARK_BUT_NOT_BLACK')

		const DidntDeleteSchedulePreset = new MessageEmbed()
			.setDescription(`> It looks like your an into an error!`)
			.setFooter(`Couldn't find a file called ${interaction.channel.parent.name}.json!`)
			.setColor('DARK_BUT_NOT_BLACK')

		const DeletedSchedulePreset = new MessageEmbed()
			.setDescription(`> Your Preset has been deleted!`)
			.setFooter(`Deleted: ${interaction.channel.parent.name}.json!`)

		const NotAbleToReactEmbed = new MessageEmbed()
			//eligible
			.setDescription(`> Your User ID does not appear on the following list: **Check_User_ID_Array** `)
			.setColor('DARK_BUT_NOT_BLACK')

		const NotAbleToDeleteEmbed = new MessageEmbed()
			.setDescription(`> Only the creator of the schedule, ${interaction.member.user.username}, can use this! `)
			.setColor('DARK_BUT_NOT_BLACK')

		const SuccesfullyEditedEmbed = new MessageEmbed()
			.setDescription('> Successfully changed your availability!')
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
					User_Seventh_Array.push(`-`);
					User_Eighth_Array.push(`-`);

					console.log('Users Push complete');

					//Push in all the Users, so they get pinged later on!

					MentionMessage.push(data.userOneJson);
					MentionMessage.push(data.userSecondJson);
					MentionMessage.push(data.userThirdJson);
					MentionMessage.push(data.userFourthJson);
					MentionMessage.push(data.userFithJson);
					MentionMessage.push(data.userSixthJson);

					console.log('Mention complete!');

					console.log(`Users which are able to react: ${Check_User_Array}`);

					let UserMessages = ScrimDescripton.toString() + "\n" + "\n" + User_One_Array.toString() + "\n" + "\n" + User_Second_Array.toString() + "\n" + "\n" + User_Third_Array.toString() + "\n" + "\n" + User_Fourth_Array.toString() + "\n" + "\n" + User_Fith_Array.toString() + "\n" + "\n" + User_Sixth_Array.toString() + "\n" + "\n" + User_Seventh_Array.toString() + "\n" + "\n" + User_Eighth_Array.toString();

					const ScheduleEmbed = new MessageEmbed()
						.setTitle(`${team}'s Schedule`)
						.setDescription(UserMessages)
						.setColor('GREYPLE')
						.setFooter(`Created by ${interaction.member.user.username} | This is a preset / saved schedule!`)
						.setTimestamp()

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
							.setCustomId('ButDestroyP')
							.setLabel('Destroy Preset')
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

							const DestroyPcollector = sentMessage.createMessageComponentCollector({
								componentType: 'BUTTON'
							});

							const deletecollector = sentMessage.createMessageComponentCollector({
								componentType: 'BUTTON'
							});

							console.log('Created Collectors / Sent message!');

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
											User_One_Array.push(`${yesEmoji} ${data.userOneJson}`)

										}

									} catch {

									}

									try {

										if (i.member.user.id == data.userSecondIDJson) {

											User_Second_Array.pop();
											User_Second_Array.push(`${yesEmoji} ${data.userSecondJson}`)

										}

									} catch {

									}

									try {

										if (i.member.user.id == data.userThirdIDJson) {

											User_Third_Array.pop();
											User_Third_Array.push(`${yesEmoji} ${data.userThirdJson}`)

										}

									} catch {

									}

									try {

										if (i.member.user.id == data.userFourthIDJson) {

											User_Fourth_Array.pop();
											User_Fourth_Array.push(`${yesEmoji} ${data.userFourthJson}`)

										}

									} catch {

									}

									try {

										if (i.member.user.id == data.userFithIDJson) {

											User_Fith_Array.pop();
											User_Fith_Array.push(`${yesEmoji} ${data.userFithJson}`)

										}

									} catch {

									}

									try {

										if (i.member.user.id == data.userSixthIDJson) {

											//User_Sixth_Array.pop();
											User_Sixth_Array.push(`${yesEmoji} ${userSixthJson}`)

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
										embeds: [
											SuccesfullyEditedEmbed
										],
										ephemeral: true
									});

								}

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
											User_Sixth_Array.push(`${noEmoji} ${userSixthJson}`)

										}

									} catch {

									}

									const ScheduleEdit = new MessageEmbed()
										.setTitle(`${team}'s Schedule`)
										.setDescription(ScrimDescripton.toString() + "\n" + "\n" + User_One_Array.toString() + "\n" + "\n" + User_Second_Array.toString() + "\n" + "\n" + User_Third_Array.toString() + "\n" + "\n" + User_Fourth_Array.toString() + "\n" + "\n" + User_Fith_Array.toString() + "\n" + "\n" + User_Sixth_Array.toString() + "\n" + "\n" + User_Seventh_Array.toString() + "\n" + "\n" + User_Eighth_Array.toString())
										.setColor('DARK_RED')
										.setFooter(`Created by ${interaction.member.user.username} | Latest reaction by ${i.user.username}`)
										.setTimestamp()

									sentMessage.edit({
										embeds: [
											ScheduleEdit
										],
									});

									i.reply({
										embeds: [
											SuccesfullyEditedEmbed
										],
										ephemeral: true
									});

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
											User_Sixth_Array.push(`${tentativeEmoji} ${userSixthJson}`)

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
										embeds: [
											SuccesfullyEditedEmbed
										],
										ephemeral: true
									});

								}

							});

							//fs.unlink()

							DestroyPcollector.on('collect', i => {

								if (i.customId === "ButDestroyP") {

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

										fs.unlink(`Schedule_${interaction.channel.parent.name}.json`, async (err) => {

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

												console.log(`${i.member.user.username} destroyed the Saved Schedule for ${interaction.channel.parent.name}`);

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

									}



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