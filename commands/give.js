const {
	SlashCommandBuilder
} = require('@discordjs/builders');

const {
	MessageEmbed
} = require('discord.js');

const PlayerBlacklistSchema = require('../schemas/PlayerBlacklistSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('give')
		.setDescription('Give out a role!')
		.addUserOption(option => option.setName('user').setDescription('The user you are giving the role to!').setRequired(true))
		.addRoleOption(option => option.setName('role').setDescription('The role you are giving out!').setRequired(true)),

	async execute(interaction) {

		try {

			const Member = interaction.options.getMember('user');
			const Role = interaction.options.getRole('role');

			const ValidChannels = ["587956575315034114","991692003593162814"];

			const AlreadyHasMentionedRole = Member.roles.cache.some(role => role === Role);

			if (!interaction.member.permissions.has("MANAGE_ROLES")) {

				if (!ValidChannels.includes(interaction.channel.id)) {
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
				};

			};


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
						console.log(`Returned ${interaction.member.user.username}'s request!`);
						return;
					};
				};
			};

			if (Member.user.id === "902277719180578867") {

				const NotThisUserEmbed = new MessageEmbed()
					.setDescription(`You cant give roles to the 2ez Bot!`)
					.setColor('RED')

				interaction.reply({
					content: 'You are not able to give Roles to that User!',
					embeds: [
						NotThisUserEmbed
					],
				});
				return;

			};

			if (AlreadyHasMentionedRole) {
				let AlreadyHasMentionedRoleEmbed = new MessageEmbed()
					.setDescription(`${Member} already has the ${Role} role!`)
					.setColor('RED')

				interaction.reply({
					content: "Looks like the user already has this role!",
					embeds: [
						AlreadyHasMentionedRoleEmbed
					],
				})
				return;
			}

			const FoundPlayerOnBlacklistEmbed = new MessageEmbed()
				.setTitle('Hold on!')
				.setDescription(`The tag **${Member.user.tag}** was found on our Blacklist! \n For more info, run the **/find-player-from-blacklist** command!`)
				.setColor('RED');


			console.log('Searching for Blacklisted Player in Database!');

			const BTagresult = await PlayerBlacklistSchema.findOne({

				btag: Member.user.tag.toLowerCase()

			}).catch(async (e) => {

				console.log('Couldnt fetch Data from Database! Connection is probably offline!');
				console.log(e);
				return;

			});

			const Discordresult = await PlayerBlacklistSchema.findOne({

				discordtag: Member.user.tag.toLowerCase()

			}).catch(async (e) => {

				console.log('Couldnt fetch Data from Database! Connection is probably offline!');
				console.log(e);
				return;

			});

			if (BTagresult) {

				await interaction.channel.send({
					content: "Found by Battle-Tag",
					embeds: [
						FoundPlayerOnBlacklistEmbed
					]
				});

			};

			if (Discordresult) {

				await interaction.channel.send({
					content: "Found by Discord-Tag",
					embeds: [
						FoundPlayerOnBlacklistEmbed
					]
				});

			};

			let memberAvatar = Member.user.displayAvatarURL({
				dynamic: true
			});

			const embed = new MessageEmbed()
				.setTitle(`${Role.name} was given`)
				.setDescription(`> Gave **${Role.name}** to ${Member} (${Member.user.tag})`)
				.setThumbnail(memberAvatar)
				.setColor('RANDOM')
				.setFooter({
					text: `${Member.user.tag} | ${Member.id}`,
					iconURL: memberAvatar
				});

			console.log(interaction.guild.id);

			if (interaction.guild.id == '991691998182514779') {

				Member.roles.add('994970137901932554')
				interaction.channel.send(`>  I added the **Team Player** role to ${Member.user.username}, as a feature of this server!`)

			};

			return Member.roles.add(Role).catch((e) => {

				embed.setTitle('ERROR')
				embed.setDescription('>' + " " + e)
				embed.setFooter({
					text: `${Member.user.tag} - Action failed!`
				});
				embed.setColor('RED')
			}).then(() => interaction.reply({
				embeds: [embed]
			}));

		} catch (e) {

			const errorembed = new MessageEmbed()
				.setTitle('You ran into an Error!')
				.setDescription('>' + " " + e)
				.setFooter({
					text: '/give < user > < role >'
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