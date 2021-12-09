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
            .setTitle('All 2ez Teams:')
            .addField('<:CritFarmers:869630471892516874> 2ez CritFarmers', '4500 <:grandmaster:829021760514031687>')
            .addField('<:Ethereal:850546276344135700> 2ez Ethereal', '4400 <:grandmaster:829021760514031687>')
            .addField('<:Kappybara:906576313568071710> 2ez Kappybara', '4200 <:grandmaster:829021760514031687>')
            .addField('<:ChickenContendies:837356394688282695> Chicken Contendies', '4200 <:grandmaster:829021760514031687>')
            .addField('<:VaeVictis:833644847360507905> Vae Victis', '4200 <:grandmaster:829021760514031687>')
            .addField('<:VaeVictisAcademy:852605496858640384> Vae Victis Academy', '4000 <:grandmaster:829021760514031687>')
            .addField('<:Magnus:836324096911999016> 2ez Magnus', '4000 <:grandmaster:829021760514031687>')
            .addField('<:RenaiCrew:798928959236341769> Renai Crew', '3700 <:master:829021761340178512>')
            .addField('<:Cosmos:850510292219592784> 2ez Cosmos', '3700 <:master:829021761340178512>')
            .addField('<:Glacial:860670067566182410> 2ez Glacial', '3600 <:master:829021761340178512>')
            .addField('<:MysteryHeroes:809786930639274036> Mystery Heros', '3600 <:diamond:829021760094601256>')
            .addField('<:BrassMonkeys:840224945837703199> Brass Monkeys', '3300 <:diamond:829021760094601256>')
            .addField('<:CoconutCrew:801091888492970035> Coconut Crew', '3200 <:diamond:829021760094601256>')
            .addField('<:UncoordinatedSheep:841305436463955988> Uncoordinated Sheep', '3200 <:diamond:829021760094601256>')
            .addField('<:ExiledKnights:848308958925291542> Exiled Knights', '2800 <:platinum:829021828021485589>')
            .addField('<:Phoenix:848303325212442675> 2ez Phoenix', '2700 <:platinum:829021828021485589>')
            .addField('<:CoconutGang:849615086674772009> Coconut Gang', '2700 <:platinum:829021828021485589>')

        interaction.reply({
            content: "Here is a list of all 2ez teams!",
            embeds: [
                Teamembed
            ],
        })


    },
};