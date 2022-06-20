const TeamDatabaseSchema = require('../schemas/TeamDatabaseSchema.js');
const MessageEmbed = require('discord.js').MessageEmbed;

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (interaction.isButton()) {

			setTimeout(() => {

				interaction.reply({
					content: `This schedule is no longer available.`,
					ephemeral: true
				}).catch((e) => {

					if (e);

				});

			}, 1000);

		} else {

			console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered ${interaction.commandName}.`);

		};

	},
};