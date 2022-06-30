const client = require('.././index.js');
const MessageEmbed = require('discord.js').MessageEmbed;

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {

		if (member.guild.id !== "272733246792531968") return;

		const welcomechannel = client.channels.cache.get('585883817458401342'); //585883817458401342

		const channel = client.channels.cache.get('589929952837894144'); //589929952837894144

		if (!channel) return console.log('welcome returned.');
		if (!welcomechannel) return console.log('no welcome channel found!');

		const content = (
			`Remember to read the rules in <#753238962050695228>.` + "\n" +
			`You can assign yourself the roles you want in <#985234109624381540>!`
		);

		const Welcomesentences = [
			`Please welcome **${member.displayName}** to the Server <:pogU:836244303034318908>`,
			`**${member.displayName}** just joined our Server <:pogU:836244303034318908>`,
			`Please welcome **${member.displayName}** <:pogU:836244303034318908>`,
			`**${member.displayName}** just joined 2ez <:pogU:836244303034318908>`
		];

		const randomwelcome = Welcomesentences[Math.floor(Math.random() * Welcomesentences.length)];

		const embedcontent = (
			randomwelcome + "\n" + "\n" +
			`**${channel.guild.name}** now has **${channel.guild.memberCount}** members`
		);

		const embed = new MessageEmbed()
			.setDescription(embedcontent.toString())
			.setColor('RANDOM')
			.setTimestamp()

		const welcomeembed = new MessageEmbed()
			.setTitle(`Welcome to the 2ez Community Server!`)
			.setDescription(content)
			.setImage('https://cdn.discordapp.com/attachments/914974246529273877/943158943860015194/2ezWelcome.jpg')
			.setColor('RANDOM')

		await channel.send({
			content: `Welcome to the Server ${member}!`,
			embeds: [welcomeembed]
		});

		welcomechannel.send({
			embeds: [embed]
		});

	},

};