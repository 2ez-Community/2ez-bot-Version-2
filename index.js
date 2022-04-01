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

client.on('messageCreate', message => {

	if (message.content === "*run") {

		if (message.author.id !== "420277395036176405") return;

		console.log('Christmas messages initiated!')

		var myStringArray = [
			/*1*/
			"The use of the term ‘Xmas’ dates back to the 16th century. The ‘X’ in the word Xmas comes from the ancient Greek language. In Greek, Christ begins with the letter X. So, Xmas simply means Christmas.",
			/*2*/
			"Santa Claus initially wore clothes that were in green, purple, or blue. For many years, this was the common theme for the jolly old man at the North Pole. However, Coca Cola decided to dress him up in colours that matched their brand, and that stuck. So this is why he is always in red clothes now!",
			/*3*/
			"One of the reasons Santa can make his marathon runs through the day and give gifts to the kids all over the world is due to the help of elves. The merry spirit of Christmas is because of these cheerful workers and their commitment to the kids of the world.",
			/*4*/
			"A mistletoe is supposed to be a symbol of love, laughter, and compassion. And the tradition of a kiss under the mistletoe is supposed to be a way of asking for the blessings of the spirits of Christmas through the mistletoe.",
			/*5*/
			"We all know the same few handfuls of Christmas songs play at stores and on the radio in a loop all season long. But one of them has been adapted more than others. Silent Night ears that title, as the most-recorded Christmas song in history. It's had more than 733 different versions copyrighted since 1978.",
			/*6*/
			"The tradition of nailing Christmas stockings near a fireplace came about in order to help Santa have a place to stuff candies and goodies for bright and cheerful children of the world. It also serves as an endless supply of socks for Santa.",
			/*7*/
			"The traditional Christmas meal in England before turkey became the obvious choice of food for the holidays was a pig’s head covered with mustard.",
			/*8*/
			"Christmas decorations feel like they appear in stores earlier every year, not to mention ads for gifts everywhere. That's because the majority of Americans really do jingle bell rock their way right through the season: about 85 percent of us. Not all of those celebrate the religious basis of the holiday, though.",
			/*9*/
			"It's hard to imagine what you'd want to rock out to if you were to ever float among the stars. But the crew of NASA's Gemini 6A space flight got into the Christmas spirit and made history when they played **Jingle Bells** on December 16, 1965, earning the jolly jingle the Guinness World Record for being the first song ever played in space.",
			/*10*/
			"Standing over 150 feet tall and weighing 225 tons, the Statue of Liberty is an impressive figure. And since it was considered a holiday gift when it was given to the U.S. by France in 1886, it's officially the largest Christmas present in the world. That's a lot of wrapping paper and ribbon!",
		];

		var read = function (x) {

			var splicing = myStringArray.splice(0, x);

			myStringArray = myStringArray.concat(splicing);

			return splicing;
		}

		let date = Date(Date.now());

		let NewDate = date.toString();

		cron.schedule('* * * * *', () => { //currently runs every minute!

			message.channel.send(`**Here is another Christmas Fact:** \n\n${read(1).toString()}`);

		});

		// every day at 9am is: 0 9 * * *
		//${Date(Date.now()).toString()}
	}

})

client.on('messageCreate', message => {
	if (message.content === '*join') {

		//message.channel.send(`Here you go: <t:1639600837:R>`) 

		client.emit('guildMemberAdd', message.member);
	}
});

client.on('messageCreate', message => {
	if (message.content === '*unban') {

		message.guild.members.unban('361850367849398274');
		console.log('User has been unbanned!');
	}
});

// guild.members.unban(id);


client.on('guildMemberAdd', async member => {

	console.log('Someone joined!');

	console.log(`${member.user.username} just joined!`);

	const welcomechannel = client.channels.cache.get('903909966061137943'); // The actual welcome message

	const BANID = "334681592293490688";

	if (member.user.id === BANID) {
		await member.send(`
		Hey ${member.user.username}!

		It looks like you just got banned!

		This happened because of an Instant - Ban System!

		We aren't planning on doing anything about it!
		`);

		try {

			member.ban({
				reason: ('Automatic Ban - Join ID matches preset!'),
			});

			console.log(`I just banned  ${member.user.username}! - Automatic Ban!`);

		} catch (e) {

			console.log(e)

		};

	}

})


client.login(token);