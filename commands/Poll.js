const {
	SlashCommandBuilder
} = require('@discordjs/builders');

const {
	MessageActionRow,
	MessageButton,
	MessageEmbed
} = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')

		.setDescription('Create a poll!')

		.addStringOption(option => option.setName('poll_question').setDescription('What is this poll about?').setRequired(true))

		.addStringOption(option => option.setName('choice_one').setDescription('The first choice for the poll.').setRequired(true))

		.addStringOption(option => option.setName('choice_two').setDescription('The second choice for the poll.').setRequired(true)),

	async execute(interaction) {

		let MultiChoiceConfig = [""];
		let ChoiceOneInEmbed = ["No votes yet"];
		let ChoiceTwoInEmbed = ["No votes yet"];
		let ChoiceOneVoters = [""];
		let ChoiceTwoVoters = [""];
		let ChoiceOneVotersByNumber = 0;
		let ChoiceTwoVotersByNumber = 0;

		const PollQuestion = interaction.options.getString('poll_question');
		const ChoiceOne = interaction.options.getString('choice_one');
		const ChoiceTwo = interaction.options.getString('choice_two');

		const PollEmbed = new MessageEmbed()
			.setTitle(`${PollQuestion}`)
			.setColor('RANDOM')
			.setDescription(`A poll by **${interaction.member.user.username}**`)
			.addFields({
				name: `${ChoiceOne}`,
				value: `${ChoiceOneInEmbed.toString()}`,
				inline: true
			}, {
				name: `${ChoiceTwo}`,
				value: `${ChoiceTwoInEmbed.toString()}`,
				inline: true
			});

		const Buttons = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setCustomId('VoteOne')
				.setEmoji('1️⃣')
				.setStyle('SECONDARY'),
			)
			.addComponents(
				new MessageButton()
				.setCustomId('VoteTwo')
				.setEmoji('2️⃣')
				.setStyle('SECONDARY'),
			)
			.addComponents(
				new MessageButton()
				.setCustomId('EnableMultiChoice')
				.setLabel('Enable Multi-Choice')
				.setStyle('SUCCESS'),
			)
			.addComponents(
				new MessageButton()
				.setCustomId('StopPoll')
				.setLabel('Close the Poll')
				.setStyle('DANGER'),
			);

		interaction.reply({
			content: 'You can now vote by pressing one of the buttons below!',
		}).then(
			interaction.channel.send({
				content: `${interaction.member.user.username} wants your opinion on something!`,
				embeds: [PollEmbed],
				components: [
					Buttons
				],
			}).then(sentMessage => {

				const ChoiceOneCollector = sentMessage.createMessageComponentCollector({
					componentType: 'BUTTON'
				});

				const ChoiceTwoCollector = sentMessage.createMessageComponentCollector({
					componentType: 'BUTTON'
				});

				const EnableMultiChoiceCollector = sentMessage.createMessageComponentCollector({
					componentType: 'BUTTON'
				});

				const StopPollCollector = sentMessage.createMessageComponentCollector({
					componentType: 'BUTTON'
				});

				ChoiceOneCollector.on('collect', i => {

					if (i.customId === "VoteOne") {

						if (ChoiceTwoVoters.toString().length === 0) {

							ChoiceTwoVoters.push(`No votes yet`);

						};

						if (MultiChoiceConfig !== "true") {

							if (ChoiceTwoVoters.toString().replace(/,/g, '').includes(`${i.member.user.username}`)) {

								ChoiceTwoVoters = ChoiceTwoVoters.toString().replace(`\n ${i.member.user.username}`, ``);

								if (ChoiceTwoVoters.toString().replace(/,/g, '').trim().length === 0) {

									ChoiceTwoVoters = "No votes yet";

								};

							};

						};

						if (ChoiceOneVoters.toString() === "No votes yet") {

							ChoiceOneVoters = "";

						};

						if (ChoiceOneVoters.toString().replace(/,/g, '').includes(`${i.member.user.username}`)) {

							ChoiceOneVoters = ChoiceOneVoters.toString().replace(`\n ${i.member.user.username}`, ``);

							if (ChoiceOneVoters.toString().replace(/,/g, '').trim().length === 0) {

								ChoiceOneVoters = "No votes yet";

							};

						} else {

							let OldContent = ChoiceOneVoters.toString();

							ChoiceOneVoters = OldContent.toString().concat(`\n ${i.member.user.username},`).replace('No votes yet', '');

						};

						const NewPollEmbed = new MessageEmbed()
							.setTitle(`${PollQuestion}`)
							.setColor('RANDOM')
							.setDescription(`A poll by **${interaction.member.user.username}**`)
							.addFields({
								name: `${ChoiceOne}`,
								value: `${ChoiceOneVoters.toString().replace(/,/g, "")}`,
								inline: true
							}, {
								name: `${ChoiceTwo}`,
								value: `${ChoiceTwoVoters.toString().replace(/,/g, "")}`,
								inline: true
							});

						sentMessage.edit({
							embeds: [
								NewPollEmbed
							],
						}).catch((e) => {
							console.log(e);
							i.channel.send(`An error occured while trying to edit the poll!`);
							return;
						});

						i.deferUpdate();

					};

				});

				ChoiceTwoCollector.on('collect', i => {

					if (i.customId === "VoteTwo") {

						if (ChoiceOneVoters.toString().length === 0) {

							ChoiceOneVoters.push(`No votes yet`);

						};

						ChoiceTwoVoters.toString().replace('No votes yet', '');

						if (MultiChoiceConfig !== "true") {

							if (ChoiceOneVoters.toString().replace(/,/g, '').includes(`${i.member.user.username}`)) {

								ChoiceOneVoters = ChoiceOneVoters.toString().replace(`\n ${i.member.user.username}`, ``);

								if (ChoiceOneVoters.toString().replace(/,/g, '').trim().length === 0) {

									ChoiceOneVoters = "No votes yet";

								};

							};

						};

						if (ChoiceTwoVoters.toString().replace(/,/g, '').includes(`${i.member.user.username}`)) {

							ChoiceTwoVoters = ChoiceTwoVoters.toString().replace(`\n ${i.member.user.username}`, ``);

							if (ChoiceTwoVoters.toString().replace(/,/g, '').trim().length === 0) {

								ChoiceTwoVoters = "No votes yet";

							};

						} else {

							let OldContent = ChoiceTwoVoters.toString();

							ChoiceTwoVoters = OldContent.toString().concat(`\n ${i.member.user.username},`).replace('No votes yet', '');

						};

						const NewPollEmbed = new MessageEmbed()
							.setTitle(`${PollQuestion}`)
							.setColor('RANDOM')
							.setDescription(`A poll by **${interaction.member.user.username}**`)
							.addFields({
								name: `${ChoiceOne}`,
								value: `${ChoiceOneVoters.toString().replace(/,/g, "")}`,
								inline: true
							}, {
								name: `${ChoiceTwo}`,
								value: `${ChoiceTwoVoters.toString().replace(/,/g, "")}`,
								inline: true
							});

						sentMessage.edit({
							embeds: [
								NewPollEmbed
							],
						}).catch((e) => {
							console.log(e);
							i.channel.send(`An error occured while trying to edit the poll!`);
							return;
						});
						i.deferUpdate();
					};
				});

				EnableMultiChoiceCollector.on('collect', i => {

					if (i.customId === "EnableMultiChoice") {

						if (i.user.id !== interaction.member.user.id) {
							i.reply({
								content: "You are not able to use this!",
								ephemeral: true
							});
							return;
						};

						MultiChoiceConfig = "true";

						i.reply({
							content: `<:2ez_Schedule_Yes:933802728130494524> Users can now vote for more than one choice!`,
							ephemeral: true
						});

					};
				});

				StopPollCollector.on('collect', i => {

					if (i.customId === "StopPoll") {

						if (i.user.id !== interaction.member.user.id) {
							i.reply({
								content: "You are not able to use this!",
								ephemeral: true
							});
							return;
						};

						let CutChoiceOneVoters = ChoiceOneVoters.toString().replace(/,/g, "").replace(/\n/g, '').replace(/No votes yet/, '').trim().split(" ");
						let CutChoiceTwoVoters = ChoiceTwoVoters.toString().replace(/,/g, "").replace(/\n/g, '').replace(/No votes yet/, '').trim().split(" ");

						if (ChoiceOneVoters === 'No votes yet') {
							ChoiceOneVoters = 0;
						} else {
							ChoiceOneVotersByNumber = CutChoiceOneVoters.length;
						};

						if (ChoiceTwoVoters === 'No votes yet') {
							ChoiceTwoVoters = 0;
						} else {
							ChoiceTwoVotersByNumber = CutChoiceTwoVoters.length;
						};

						i.reply(`**${ChoiceOneVotersByNumber}** votes for **${ChoiceOne}** and **${ChoiceTwoVotersByNumber}** votes for **${ChoiceTwo}**!`);

						ChoiceOneVotersByNumber = 0;
						ChoiceTwoVotersByNumber = 0;
						ChoiceOneVoters = "";
						ChoiceTwoVoters = "";
						CutChoiceOneVoters = "";
						CutChoiceTwoVoters = "";
						MultiChoiceConfig = "";

						const NewButtons = new MessageActionRow()
						.addComponents(
							new MessageButton()
							.setCustomId('VoteOne')
							.setEmoji('1️⃣')
							.setStyle('SECONDARY')
							.setDisabled(true),
						)
						.addComponents(
							new MessageButton()
							.setCustomId('VoteTwo')
							.setEmoji('2️⃣')
							.setStyle('SECONDARY')
							.setDisabled(true),
						)
						.addComponents(
							new MessageButton()
							.setCustomId('EnableMultiChoice')
							.setLabel('Enable Multi-Choice')
							.setStyle('SUCCESS')
							.setDisabled(true),
						)
						.addComponents(
							new MessageButton()
							.setCustomId('StopPoll')
							.setLabel('Close the Poll')
							.setStyle('DANGER')
							.setDisabled(true),
						);

						sentMessage.edit({
							components: [
								NewButtons
							],
						}).catch((e) => {
							console.log(e);
							i.channel.send(`An error occured while trying to edit the poll!`);
							return;
						});

					};

				});
			}),
		);
	},
};