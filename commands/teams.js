const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const {
	MessageEmbed
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('teams')
		.setDescription('Shows a list of all 2ez Teams!'),
	async execute(interaction) {

		const Teamembed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle('This is a list of all 2ez Teams:')
			.addField('<:Phoenix:922264237420728360> 2ez Phoenix', '4500 <:grandmaster:829021760514031687>')
			.addField('<:Neo:922838269291561030> 2ez Neo', '4500 <:grandmaster:829021760514031687>')
			.addField('<:Bagar:962689277148413952> 2ez Bagär', '4500 <:grandmaster:829021760514031687>')
			.addField('<:cz_blurry_eyes:590228437495709696> 2ez Super Secret Project', '4500 <:grandmaster:829021760514031687>')
			.addField('<:among:764960417160101939> 2ez ඞ', '4500 <:grandmaster:829021760514031687>')
			.addField('<:DunningKruger:953425503652569128> 2ez Dunning-Kruger', '4400 <:grandmaster:829021760514031687>')
			.addField('<:Jazz:942932076410335283> 2ez Jazz', '4400 <:grandmaster:829021760514031687>')
			.addField('<:PSG:952976640286273606> 2ez PSG', '4400 <:grandmaster:829021760514031687>')
			.addField('<:VaeVictisAcademy:852605496858640384> 2ez Vae Victis Academy', '4200 <:grandmaster:829021760514031687>')
			.addField('<:Kappybara:906576313568071710> 2ez Kappybara', '4200 <:grandmaster:829021760514031687>')
			.addField('<:Magnus:836324096911999016> 2ez Magnus', '4200 <:grandmaster:829021760514031687>')
			.addField('<:Padawans:950036734748545044> 2ez Padawans', '4200 <:grandmaster:829021760514031687>')
			.addField('<:Empire:945235520961777665> 2ez Empire', '4200 <:grandmaster:829021760514031687>');

		const Teamembed2 = new MessageEmbed()
			.setColor('BLUE')
			.setTitle('This is a list of all 2ez Teams:')
			.addField('<:CoconutCrew:801091888492970035> 2ez Coconut Crew', '4000 <:grandmaster:829021760514031687>')
			.addField('<:TerminalVelocity:945235535578927124> 2ez Terminal Velocity', '4000 <:grandmaster:829021760514031687>')
			.addField('<:Marmot:921785097299050546> 2ez Marmot', '4000 <:grandmaster:829021760514031687>')
			.addField('<:Storm:927401177610612746> 2ez Storm', '4000 <:grandmaster:829021760514031687>')
			.addField('<:Bullet:954557267888468008> 2ez Able Bubble', '4000 <:grandmaster:829021760514031687>')
			.addField('<:Glacial:860670067566182410> 2ez Glacial', '3800 <:master:829021761340178512>')
			.addField('<:flushedpotato:773678830690107403> 2ez no-potatoes', '3800 <:master:829021761340178512>')
			.addField('<:MysteryHeroes:809786930639274036> 2ez Mystery Heroes', '3800 <:master:829021761340178512>')
			.addField('<:CoconutGang:849615086674772009> 2ez Coconut Gang', '3700 <:master:829021761340178512>')
			.addField('<:CrimsonOsmium:921543534107037717> 2ez Crimson Osmium', '3600 <:master:829021761340178512>')
			.addField('<:MVPepega:876885999408533574> 2ez MVPepega', '3500 <:master:829021761340178512>')
			.addField('<:Phalanx:884231384309321749> 2ez Phalanx', '3500 <:master:829021761340178512>')
			.addField('<:UncoordinatedSheep:841305436463955988> 2ez Uncoordinated Sheep', '3200 <:diamond:829021760094601256>')
			.addField('<:Atomic:942932029824172092> 2ez Atomic', '2700 <:platinum:829021828021485589>');

		interaction.reply({
			embeds: [
				Teamembed, Teamembed2
			]
		});
	},
};