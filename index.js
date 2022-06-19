const fs = require('fs');
const cron = require('node-cron');
const mongoose = require('mongoose');
const fetch = require('cross-fetch');
const SocialCreditSchema = require('./schemas/SocialCreditSchema');
const CoinSchemaConst = require('./schemas/CoinSchema');
const dotenv = require("dotenv");
dotenv.config();

const {
	Client,
	Collection,
	Intents,
	MessageEmbed
} = require('discord.js');

const {
	token,
} = require('./config.json');
const CoinSchema = require('./schemas/CoinSchema');
let SetupLockedArray = [""];
let BlockedUsersArray = [""];

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
};

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
};

client.on('ready', async () => {

	fetch(`http://127.0.0.1:3000/api/settings`).catch((e) => {
			console.log('I couldnt fetch the data', e);
			return;
		})
		.then(response => response.json()).catch(e => {
			console.log('Was not able to parse the data');
			return;
		})
		.then(data => {

			if (!data) return console.log('I couldnt fetch the data');

			console.log('Fetched the data');
			SetupLockedArray = data.slash_commands_lock;
			BlockedUsersArray = data.blocked_users.toString();

			console.log('Schedule Setup', SetupLockedArray);
			console.log('Blocked Users', BlockedUsersArray);

		});

});

/*------------------------------------------------------------------- Database Connection  ---------------------------------------------------------------------------*/


// client.on('ready', async () => {
// 	console.log('Trying to connect...');
// 	await mongoose.connect(process.env.MONGODB_SRV, {

// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 		keepAlive: true

// 	}).then(() => {

// 		console.log(`Connected to Database!`);

// 	}).catch((e) => {

// 		console.log(`Something went wrong: ${e}`);

// 	});
// });


/*------------------------------------------------------------------- /  Database Connection  ----------------------------------------*/

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	if (BlockedUsersArray.includes(interaction.member.user.tag)) return interaction.reply({
		content: 'You are blocked from using this bot.',
		ephemeral: true
	});

	if (SetupLockedArray === "true") return interaction.reply('Slash commands are currently locked. This should be resolved shortly.');

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: `There was an error while executing this command: ${error}`,
			ephemeral: true
		});
	};

});

// ------------------------------------------------Welcome message ------------------------------------------------//

client.on('guildMemberAdd', async member => {

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

});

// ------------------------------------------------Welcome message ------------------------------------------------//

client.on('messageCreate', async (message) => {

	if (message.content === "*reload") {

		fetch(`http://127.0.0.1:3000/api/settings`).catch((e) => {
				console.log('I couldnt fetch the data', e);
				return;
			})
			.then(response => response.json())
			.then(data => {

				if (!data) return console.log('I couldnt fetch the data');

				console.log('Fetched the data', data.slash_commands_lock);
				SetupLockedArray = "";
				BlockedUsersArray = "";

				SetupLockedArray = data.slash_commands_lock;
				BlockedUsersArray = data.blocked_users.toString();

				message.reply(`<:2ez_Bot_V2_Join:937798162163306548> Fetched API data.`);

			});

	};

});


client.on('messageCreate', async (message) => {
	if (message.content.toLocaleLowerCase().includes(":badlandsokay:")) {

		if (message.author.id !== "587041760006373416") return;

		const result = await CoinSchemaConst.findOne({
			"name": "coin"
		});

		message.channel.send(`Coin said <:badlandsokay:926309204208279552> ${result.count + 1} times`);

		const filter = {
			name: "coin"
		};

		const NewMessage = {
			count: result.count + 1
		};

		await CoinSchemaConst.findOneAndUpdate(filter, NewMessage, {
			new: true
		}).catch((e) => {
			message.reply('Oops this is awkward. Something went wrong!');
			console.log(`Something went wrong when trying to update the Coin count: ${e} `);
			return;
		});

	};
});

client.login(token);