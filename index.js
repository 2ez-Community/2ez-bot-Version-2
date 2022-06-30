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
	MessageEmbed,
} = require('discord.js');

const {
	token,
} = require('./config.json');
const CoinSchema = require('./schemas/CoinSchema');

module.exports = client = new Client({
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