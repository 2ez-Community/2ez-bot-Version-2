const fs = require('fs');
const {
    Client,
    Collection,
    Intents,
    MessageEmbed
} = require('discord.js');
const {
    token
} = require('./config.json');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const AvailableCommands = [
    "give",
    "remove"
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

    if (!AvailableCommands.includes(interaction.commandName)) {
        console.log(interaction.commandName);
        await interaction.reply({
            content: 'This command is not out yet!',
            ephemeral: true
        });
        return;
    }

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

client.login(token);