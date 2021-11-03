const fs = require('fs');
const {
    Client,
    Collection,
    Intents,
    MessageEmbed
} = require('discord.js');

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

const AvailableCommands = [
    "give",
    "remove",
    "help",
    "teams",
    "ping",
]

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
            content: 'There was an error while executing this command!',
            ephemeral: true
        });
    }

});

/*

client.on('messageReactionAdd', async (reaction, user) => {
	// When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}

	// Now the message has been cached and is fully available
	console.log(`${reaction.message.author.username}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});
*/


client.on('messageCreate', message => {
    if (message.content === '*join') {

        if (message.author.id !== "420277395036176405");

        client.emit('guildMemberAdd', message.member);
    }
});

/*
client.on('guildMemberAdd', async member => {

    const welcomechannel = client.channels.cache.get('903909966061137943'); // The actual welcome message

    const channel = client.channels.cache.get('904026670053351494'); // Sends a small message with the name and a Guild Member Count

    if (!channel) return console.log('welcome returned.');
    
    if (!welcomechannel) return console.log('no welcome channel found!');

    channel.send({
        content: `Welcome to the Server ${member}!!!!!!!!!`,
        
    });

    welcomechannel.send(`${member.user.username} just joined our Server! It now has ${channel.guild.memberCount} members!`);

})
*/

client.login(process.env.token);