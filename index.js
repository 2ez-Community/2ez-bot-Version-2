const fs = require('fs');
const cron = require('node-cron');
const mongoose = require('mongoose');

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

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS],
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
}

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: 'There was an error while executing this command.',
			ephemeral: true
		});
	}

});

mongoose.connect(process.env.MONGODB_SRV, {

	useNewUrlParser: true,
	useUnifiedTopology: true,
	keepAlive: true

}).then(() => {

	console.log(`Connected to Database!`);

}).catch((e) => {

	console.log(`Something went wrong: ${e}`);

})


client.login(token);