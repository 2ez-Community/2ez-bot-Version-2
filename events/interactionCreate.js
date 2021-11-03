module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (interaction.isButton()) return;
		
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered ${interaction.commandName}.`);
	},
};