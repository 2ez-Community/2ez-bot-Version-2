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

		try {

			const Member = interaction.options.getMember('user');
			const Role = interaction.options.getRole('role');

			const DoesntHaveMentionedRole = !Member.roles.cache.some(role => role === Role);

			if (!interaction.member.permissions.has("MANAGE_ROLES")) {

				if (interaction.channel.id !== "587956575315034114") {
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
				})
				return;
			};

			let memberAvatar = Member.user.displayAvatarURL({
				dynamic: true
			});

			let footer = [
				"Thank you MYSFT#6969 for keeping the bot online!",
				"Thank you Cointree#8708 for keeping the bot online!",
				"Thank you Shadowss#5513 for keeping the bot online!",
				"Thank you MidoriRyuu#1222 for keeping the bot online!",
				"Thank you hjortsater#0890 for keeping the bot online!",
				`${Member.user.tag} | ${Member.id}`,
			];

			const randomFooter = footer[Math.floor(Math.random() * footer.length)];

			const embed = new MessageEmbed()
				.setTitle(`${Role.name} was removed`)
				.setDescription(`> Removed **${Role.name}** from ${Member} (${Member.user.tag})`)
				.setThumbnail(memberAvatar)
				.setColor('RANDOM')
				.setFooter({
					text: randomFooter,
					iconURL: memberAvatar
				});

			return Member.roles.remove(Role).catch((e) => {

				embed.setTitle('ERROR')
				embed.setDescription('>' + " " + e)
				embed.setFooter({
					text: `${Member.user.tag} - Action failed!`
				})
				embed.setColor('RED');

			}).then(() => interaction.reply({
				embeds: [embed]
			}));

		} catch (e) {

			const errorembed = new MessageEmbed()

				.setTitle('You ran into an Error!')
				.setDescription('>' + " " + e)
				.setFooter({
					text: '/remove < user > < role >'
				})
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