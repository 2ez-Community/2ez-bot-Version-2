const {
	SlashCommandBuilder
} = require('@discordjs/builders');

const {
	MessageEmbed
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Remove a Role!')
		.addUserOption(option => option.setName('user').setDescription('The user you are removing the role from!').setRequired(true))
		.addRoleOption(option => option.setName('role').setDescription('The role you are removing!').setRequired(true)),

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

			const DoesntHaveMentionedRole = !Member.roles.cache.some(role => role === Role);

			if (!interaction.member.permissions.has("MANAGE_ROLES")) {

				if (interaction.channel.id !== "821393051561361493") {
					let Bad_Channel_Embed = new MessageEmbed()
						.setDescription(`> You can not use this command in this channel ${interaction.user}!`)
						.setColor('RED')

					interaction.reply({
						content: "The `remove` command can only be used in a certain channel!",
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
							.setDescription(`> You tried to remove ${Role}!`)
							.setColor('RED')

						interaction.reply({
							content: "You cant remove roles, which are not in your role cache!",
							embeds: [
								DontOwnRoleEmbed
							],
						})
						return;
					}
				}
			}

			if (DoesntHaveMentionedRole) {
				let DoesntHaveMentionedRoleEmbed = new MessageEmbed()
					.setDescription(`${Member} doesn't have the ${Role} role!`)
					.setColor('RED')

				interaction.reply({
					content: "Looks like the user doesn't have this role!",
					embeds: [
						DoesntHaveMentionedRoleEmbed
					],
					ephemeral: true
				})
				return;
			}

			let memberAvatar = Member.user.displayAvatarURL({
				dynamic: true
			})

			const embed = new MessageEmbed()
				.setTitle(`${Role.name} was removed`)
				.setDescription(`> Removed **${Role.name}** from ${Member}`)
				.setThumbnail(memberAvatar)
				.setColor('RANDOM')
				.setFooter(`${Member.user.tag} | ${Member.id}`, memberAvatar)

			return Member.roles.remove(Role).catch((e) => {

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
				.setFooter('/remove < user > < role >')
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