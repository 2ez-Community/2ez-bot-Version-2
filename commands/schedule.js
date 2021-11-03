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

module.exports = {
	data: new SlashCommandBuilder()
		.setName('schedule')

		.setDescription('Create a Team schedule! This allows you to mention 6 people!')

		.addUserOption(option => option.setName('user-one').setDescription('Add a user to mention in the schedule!'))

		.addUserOption(option => option.setName('user-second').setDescription('Add a user to mention in the schedule!'))

		.addUserOption(option => option.setName('user-third').setDescription('Add a user to mention in the schedule!'))

		.addUserOption(option => option.setName('user-fourth').setDescription('Add a user to mention in the schedule!'))

		.addUserOption(option => option.setName('user-fith').setDescription('Add a user to mention in the schedule!'))

		.addUserOption(option => option.setName('user-sixth').setDescription('Add a user to mention in the schedule!'))

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

				User_One_Array.push('-')

			};

			if (userSecond) {

				Check_User_Array.push(userSecond.user.username);
				User_Second_Array.push(`${neutralEmoji} ${userSecond}`);
				MentionMessage.push(`${userSecond}`);

			} else {

				User_Second_Array.push('-')

			};

			if (userThird) {

				Check_User_Array.push(userThird.user.username);
				User_Third_Array.push(`${neutralEmoji} ${userThird}`);
				MentionMessage.push(`${userThird}`);

			} else {

				User_Third_Array.push('-')

			};

			if (userFourth) {

				Check_User_Array.push(userFourth.user.username);
				User_Fourth_Array.push(`${neutralEmoji} ${userFourth}`);
				MentionMessage.push(`${userFourth}`);

			} else {

				User_Fourth_Array.push('-')

			};

			if (userFith) {

				Check_User_Array.push(userFith.user.username);
				User_Fith_Array.push(`${neutralEmoji} ${userFith}`);
				MentionMessage.push(`${userFith}`);

			} else {

				User_Fith_Array.push('-')

			};

			if (userSixth) {

				Check_User_Array.push(userSixth.user.username);
				User_Sixth_Array.push(`${neutralEmoji} ${userSixth}`);
				MentionMessage.push(`${userSixth}`);

			} else {

				User_Sixth_Array.push('-')

			};

			// Pushing Usernames in to clarify who can react! The top code is for the actual embed.

			Check_User_Array.push(interaction.member.username);

			console.log(`Pushed all users in ${interaction.channel.parent.name}!`);

		} catch (e) {

			interaction.reply({
				content: "Something didn't work...",
				ephemeral: true
			})
			console.log(e);

		}

		// ⬇ Description of the embed

		let UserMessages = ScrimDescripton.toString() + "\n" + "\n" + User_One_Array.toString() + "\n" + "\n" + User_Second_Array.toString() + "\n" + "\n" + User_Third_Array.toString() + "\n" + "\n" + User_Fourth_Array.toString() + "\n" + "\n" + User_Fith_Array.toString() + "\n" + "\n" + User_Sixth_Array.toString();

		let team = `${interaction.channel.parent.name}`; // get category name

		const ScheduleEmbed = new MessageEmbed()
			.setTitle(`${team}'s Schedule`)
			.setDescription(UserMessages)
			.setColor('GREY')
			.setFooter(`Created by ${interaction.member.user.username}`)
			.setTimestamp()

		const SuccesfullyEditedEmbed = new MessageEmbed()
			.setDescription('> Successfully changed your availability!')
			.setColor('DARK_BUT_NOT_BLACK')

		const NotAbleToReactEmbed = new MessageEmbed()
			//eligible
			.setDescription(`> Your User ID does not appear on the following list: !**Check_User_ID_Array** `)
			.setColor('DARK_BUT_NOT_BLACK')

		const NotAbleToDeleteEmbed = new MessageEmbed()
			//eligible
			.setDescription(`> Only the creator of this schedule , ${interaction.member.user.username}, can use this!`)
			.setColor('DARK_BUT_NOT_BLACK')

		const Buttons = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setCustomId('ButYes')
				.setEmoji('\<:2ez_yes:892497964243779604>')
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
				.setLabel('Edit')
				.setStyle("PRIMARY")
			)
			.addComponents(
				new MessageButton()
				.setCustomId('ButDelete')
				.setLabel('Delete')
				.setStyle("DANGER")
			)


		await interaction.reply(`Here is your schedule for the following users: ${MentionMessage}.`).then(

			await interaction.channel.send(`Fetching User Info and Data...`).then(sentMessage => {
				sentMessage.delete({
					timeout: 3000
				})
			}),

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

						const ScheduleEdit = new MessageEmbed()
							.setTitle(`${team}'s Schedule`)
							.setDescription(ScrimDescripton.toString() + "\n" + "\n" + User_One_Array.toString() + "\n" + "\n" + User_Second_Array.toString() + "\n" + "\n" + User_Third_Array.toString() + "\n" + "\n" + User_Fourth_Array.toString() + "\n" + "\n" + User_Fith_Array.toString() + "\n" + "\n" + User_Sixth_Array.toString())
							.setColor('GREEN')
							.setFooter(`Created by ${interaction.member.user.username} | Latest reaction by ${interaction.user.username}`)
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

						const ScheduleEdit = new MessageEmbed()
							.setTitle(`${team}'s Schedule`)
							.setDescription(ScrimDescripton.toString() + "\n" + "\n" + User_One_Array.toString() + "\n" + "\n" + User_Second_Array.toString() + "\n" + "\n" + User_Third_Array.toString() + "\n" + "\n" + User_Fourth_Array.toString() + "\n" + "\n" + User_Fith_Array.toString() + "\n" + "\n" + User_Sixth_Array.toString())
							.setColor('RED')
							.setFooter(`Created by ${interaction.member.user.username} | Latest reaction by ${interaction.user.username}`)
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

						const ScheduleEdit = new MessageEmbed()
							.setTitle(`${team}'s Schedule`)
							.setDescription(ScrimDescripton.toString() + "\n" + "\n" + User_One_Array.toString() + "\n" + "\n" + User_Second_Array.toString() + "\n" + "\n" + User_Third_Array.toString() + "\n" + "\n" + User_Fourth_Array.toString() + "\n" + "\n" + User_Fith_Array.toString() + "\n" + "\n" + User_Sixth_Array.toString())
							.setColor('BLURPLE')
							.setFooter(`Created by ${interaction.member.user.username} | Latest reaction by ${interaction.user.username}`)
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

					const ReadytoCollectMessagesEmbed = new MessageEmbed()
						.setDescription(`> I am now waiting for your next message!`)
						.setFooter(`You got one minute until timeout!`)
						.setColor('DARK_BUT_NOT_BLACK')

					if (i.customId === "ButEdit") {

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

						const MessageFilter = m => m.author.id === i.user.id;

						const MessageCollector = sentMessage.channel.createMessageCollector({
							MessageFilter,
							time: 60000
						});

						i.reply({
							content: `Alrigth ${i.user.username}, what do you want the new description to be?`,
							embeds: [
								ReadytoCollectMessagesEmbed
							],
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
									.setColor('LUMINOUS_VIVID_PINK')
									.setFooter(`Created by ${interaction.member.user.username} | Edited by ${i.user.tag}`)
									.setTimestamp()

								sentMessage.edit({
									embeds: [
										ScheduleEdit
									],
								});

								m.delete().catch(() => {

									console.log('Something went wrong when trying to delete the users new description!');

								})

							})

						)

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