const {
	SlashCommandBuilder
} = require('@discordjs/builders');

const {
	MessageEmbed
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('give')
		.setDescription('Give out a role!')
		.addUserOption(option => option.setName('user').setDescription('The user you are giving the role to!').setRequired(true))
		.addRoleOption(option => option.setName('role').setDescription('The role you are giving out!').setRequired(true)),

	async execute(interaction) {

		/*		
		const Ceo = interaction.member.roles.cache.some(role => role.name === "CEO");
		const AdminRole = interaction.member.roles.cache.some(role => role.name === "Admin");
		const C_Rep = interaction.member.roles.cache.some(role => role.name === "Community Rep");
		const Game_Admin = interaction.member.roles.cache.some(role => role.name === "Game Admin");
		*/

		try {

			const Member = interaction.options.getMember('user');
			const Role = interaction.options.getRole('role');

			const AlreadyHasMentionedRole = Member.roles.cache.some(role => role === Role);

			if (!interaction.member.permissions.has("MANAGE_ROLES")) {

				if (interaction.channel.id !== "587956575315034114") {
					let Bad_Channel_Embed = new MessageEmbed()
						.setDescription(`> You can not use this command in this channel ${interaction.user}!`)
						.setColor('RED')

					interaction.reply({
						content: "The `give` command can only be used in a certain channel!",
						embeds: [
							Bad_Channel_Embed
						],
						ephemeral: true
					})
					return;
				}

			}

			if (!interaction.member.permissions.has("MANAGE_ROLES")) {

				if (!interaction.member.roles.cache.some(role => role.name === "Game Admin")) {

					if (!interaction.member.roles.cache.some(role => role.name === Role.name)) {
						let DontOwnRoleEmbed = new MessageEmbed()
							.setDescription(`> You tried to give ${Role}!`)
							.setColor('RED')

						interaction.reply({
							content: "You cant give out roles, which are not in your role cache!",
							embeds: [
								DontOwnRoleEmbed
							],
						})
						return;
					}
				}
			}

			if (AlreadyHasMentionedRole) {
				let AlreadyHasMentionedRoleEmbed = new MessageEmbed()
					.setDescription(`${Member} already has the ${Role} role!`)
					.setColor('RED')

				interaction.reply({
					content: "Looks like the user already has this role!",
					embeds: [
						AlreadyHasMentionedRoleEmbed
					],
					ephemeral: true
				})
				return;
			}

			let memberAvatar = Member.user.displayAvatarURL({
				dynamic: true
			})

			const embed = new MessageEmbed()
				.setTitle(`${Role.name} was given`)
				.setDescription(`> Gave **${Role.name}** to ${Member}`)
				.setThumbnail(memberAvatar)
				.setColor('RANDOM')
				.setFooter(`${Member.user.tag} | ${Member.id}`, memberAvatar)

			return Member.roles.add(Role).catch((e) => {

				embed.setTitle('ERROR')
				embed.setDescription('>' + " " + e)
				embed.setFooter(`${Member.user.tag} - Action failed!`)
				embed.setColor('RED')

			}).then(() => interaction.reply({
				embeds: [embed]
			}));

		} catch (e) {

			const errorembed = new MessageEmbed()
				.setTitle('You ran into an Error!')
				.setDescription('>' + " " + e)
				.setFooter('/give < user > < role >')
				.setColor('RED')
			
				await interaction.reply({
				content: "Something went wrong!",
				embeds: [
					errorembed
				],
			})

		}

	},
};