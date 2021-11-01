module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setStatus('idle');
		const welcomechannel = client.channels.cache.get('589929952837894144');
		client.user.setPresence({
			activities: [{
				name: `/help | ${welcomechannel.guild.memberCount} friends!`
			}]
		});
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};