const {
	SlashCommandBuilder,
	SlashCommandSubcommandBuilder,
	SlashCommandSubcommandGroupBuilder
} = require('@discordjs/builders');

const {
	MessageEmbed
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')

		.setDescription('Get help on certain topics!')

		.addSubcommand(subcommand =>
			subcommand
			.setName('member-roles')
			.setDescription('How can I give roles to my Team mates?'))

		.addSubcommand(subcommand =>
			subcommand
			.setName('ringers')
			.setDescription('I can not see the Ringers VC! Why?'))
		.addSubcommand(subcommand =>
			subcommand
			.setName('help')
			.setDescription('Who do I ping for help?!')
		)
		.addSubcommand(subcommand =>
			subcommand
			.setName('minecraft')
			.setDescription('How do I join the Minecraft Server?')
		),

	async execute(interaction, client) {

		const member_rolesembed = new MessageEmbed()
			.setTitle('Info: `Member-Roles`')
			.setDescription(`
				**One of my Teammates needs a certain role!**

				You are able to give those roles yourself!

				If you are a Team Captain or Manager, go to <#587956575315034114>.

				You can use the 2ez Bot to manage roles here!

				Now, use either _/give_ or _/remove_ to give or to remove a role!
			`)
			.setColor('BLURPLE');

		const ringers_vcembed = new MessageEmbed()
			.setTitle('Info: `Ringers-VC`')
			.setDescription(`
				**Why can't I see the Ringers Voice Chat?**

				You must have the _Overwatch_ Role to be able to see the ringers VC!

				- **How can I get the Overwatch Role?**

				It's pretty easy! Go to <#916743783092207676> and click on the <:overwatch:822810522533232680> Reaction!

				If you already have the role, go check out <#705800933593972737>!
			`)
			.setColor('BLURPLE');

		const ping_helpembed = new MessageEmbed()
			.setTitle('Info: `Help`')
			.setDescription(`
				**Who do I ping for help?**

				You can ping <@&558750604076515373> for questions about the server!

				You can also ping <@&546828279537991731> for anything Channel and or Bot related!
			`)
			.setColor('BLURPLE');

		const minecraft_helpembed = new MessageEmbed()
			.setTitle('Info: `Minecraft`')
			.setDescription(`
				**How do I get on the Whitelist?**

				- DM the Minecraft Admins <@!109060095144361984> , <@!291985986274197505> or <@!83143091430621184> to get on the whitlist!

				**What's the IP Adress?**

				- The Vanilla IP Adress is: **2ezVanilla.mcpro.io**  (Running on Version 1.18)!
			`)
			.setColor('BLURPLE');

		if (interaction.options.getSubcommand() === 'member-roles') {

			interaction.reply({
				content: "Here you go!",
				embeds: [
					member_rolesembed
				]
			});

		}

		if (interaction.options.getSubcommand() === 'ringers') {

			interaction.reply({
				content: "Here you go!",
				embeds: [
					ringers_vcembed
				]
			});

		}

		if (interaction.options.getSubcommand() === 'help') {

			interaction.reply({
				content: "Here you go!",
				embeds: [
					ping_helpembed
				]
			});

		}
		
		if (interaction.options.getSubcommand() === 'minecraft') {

			interaction.reply({
				content: "Here you go!",
				embeds: [
					minecraft_helpembed
				]
			});

		}

	},
};