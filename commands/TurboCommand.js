const {
	SlashCommandBuilder
} = require('@discordjs/builders');

const wait = require('node:timers/promises').setTimeout;
const timer = ms => new Promise(res => setTimeout(res, ms))

module.exports = {
	data: new SlashCommandBuilder()
		.setName('turbo-give')
		.setDescription('Give out a role!')
		.addRoleOption(option => option.setName('role').setDescription('The role you are giving out!').setRequired(true))
		.addStringOption(option => option.setName('users').setDescription('The user you are giving the role to!').setRequired(true)),

	async execute(interaction) {

		const Members = interaction.options.getString('users');
		const Role = interaction.options.getRole('role');

		if (!interaction.member.permissions.has("MANAGE_ROLES")) return;

		interaction.reply('Looping...');

		await wait(2000);

		/**
		 * @type {function}
		 * @param {Discord.GuildMember} member
		 * @returns {Promise<void>}
		 * @author Marwin#0001
		 */
		async function loop() {
			
			try {

				for (i = 0; i < Members.split(" ").length; i++) {

					let member = interaction.guild.members.cache.get(Members.split(" ")[i]);
					let CurrentMember = Members.split(" ")[i];

					try {

						console.log(`Giving ${CurrentMember} the role ${Role.name}`);

						member.roles.add(Role.id);

					} catch {

						console.log(`${CurrentMember} is not a valid user!`);

						interaction.channel.send(`I was not able to give **${CurrentMember}** the role **${Role.name}**! - Continuing...`);

					};

					if (i === Members.split(" ").length - 1) {

						interaction.editReply({
							content: `> Successfully gave ${Role.name} (${Role.id}) to ${i+1} members!`,
						});

					};

					await timer(3000);

				};

			} catch {

				interaction.channel.send('Something went wrong! Continuing...');

			};
		
		};

		loop();

	},
};