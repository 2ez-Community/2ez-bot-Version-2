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
		.setName('presetinfo')

		.setDescription('If saved, this will show all the data stored in your schedule!'),

	async execute(interaction) {

		fs.readFile(`Schedule_${interaction.channel.parent.name}.json`, 'utf-8', async (err, jsonString, ) => {

			if (err) {

				const DidntFindSchedule = new MessageEmbed()
					.setTitle('Hold on!')
					.setDescription(`The Bot wasn't able to find a schedule for you!`)
					.setFooter('Make sure you saved a schedule before!')
					.setColor('RED')

				interaction.reply({
					content: `I couldn't find a preset called **${interaction.channel.parent.name}.json** !`,
					embeds: [
						DidntFindSchedule
					],
					ephemeral: true,
				})
				return;

			} else {

				const data = JSON.parse(jsonString);

				const ScheduleDescription = data.ScrimDescriptonJson;

				const userOne = data.userOneJson;
				const userSecond = data.userSecondJson;
				const userThird = data.userThirdJson;
				const userFourth = data.userFourthJson;
				const userFith = data.userFithJson;
				const userSixth = data.userSixthJson;

				let InteractionChannel = data.InteractionChannelJson;

				let InfoString = `
				
					**${interaction.channel.parent.name}** Preset Information: \n
					Available Info: \n \n
					This is your Schedule Description: **${ScheduleDescription}** \n
					First User: **${userOne}** \n
					Second User: **${userSecond}** \n
					Third User: **${userThird}** \n
					Fourth User: **${userFourth}** \n
					Fith User: **${userFith}** \n
					Sixth User: **${userSixth}** \n 
					This preset was made by **${data.ScheduleCreator}**! \n \n
					You can find the schedule in this channel: **${InteractionChannel}**!
				
				`;

				const Infoembed = new MessageEmbed()
					.setDescription(InfoString)
					.setColor('DEFAULT')
					.setFooter('♥ This is all the info we can provide! ♥');

				interaction.reply({
					content: `Here is your Preset Info:`,
					embeds:[
						Infoembed
					],
				})

			}

		});

	}

}