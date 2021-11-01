const {
    SlashCommandBuilder
} = require('@discordjs/builders');

const {
    MessageEmbed,
    MessageComponentInteraction,
    MessageReaction
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('schedule')

        .setDescription('Create a Team schedule! This allows you to mention 6 people!')

        .addUserOption(option => option.setName('userone').setDescription('Add a user to mention in the schedule!').setRequired(true))

        .addUserOption(option => option.setName('usersecond').setDescription('Add a user to mention in the schedule!').setRequired(true))

        .addUserOption(option => option.setName('userthird').setDescription('Add a user to mention in the schedule!').setRequired(true))

        .addUserOption(option => option.setName('userfourth').setDescription('Add a user to mention in the schedule!').setRequired(true))

        .addUserOption(option => option.setName('userfith').setDescription('Add a user to mention in the schedule!').setRequired(true))

        .addUserOption(option => option.setName('usersixth').setDescription('Add a user to mention in the schedule!').setRequired(true))

        .addStringOption(option => option.setName('description').setDescription('This will be the description of your status!')),

    async execute(interaction) {

        let Check_User_Array = [

        ];

        let User_One_Array = [

        ];

        let User_Second_Array = [

        ];

        let User_Third_Array = [

        ];

        let User_Fourth_Array = [

        ];

        let User_Fith_Array = [

        ];

        let User_Sixth_Array = [

        ];

        let ScrimDescripton = [

        ];

        const userOne = interaction.options.getMember('userone');
        const userSecond = interaction.options.getMember('usersecond');
        const userThird = interaction.options.getMember('userthird');
        const userFourth = interaction.options.getMember('userfourth');
        const userFith = interaction.options.getMember('userfith');
        const userSixth = interaction.options.getMember('usersixth');

        const OptionalScrimDescription = interaction.options.getString('description');

        try {

            ScrimDescripton.push(OptionalScrimDescription);

        } catch (e) {

            console.log(e);
            ScrimDescripton.push('> React to change your availability!');
        }

        if (OptionalScrimDescription == ">" || !OptionalScrimDescription) {

            ScrimDescripton.push("React to change your availability.");

        }

        let yesEmoji = "<:2ez_yes:892497964243779604>";
        let noEmoji = "<:2ez_no:892498012000096306>";
        let neutralEmoji = "<:2ez_neutral:892794587712745543>";
        let tentativeEmoji = "<:2ez_tentative:892800624754823228>";

        try { //Push in every user + their emoji in their personal array

            if (userOne) {

                //Push everything in, if a user was mentioned

                Check_User_Array.push(userOne.username);
                User_One_Array.push(`${neutralEmoji} ${userOne}`);

            } else {

                // else, push in a "-"

                User_One_Array.push('-')

            };

            if (userSecond) {

                Check_User_Array.push(userSecond.username);
                User_Second_Array.push(`${neutralEmoji} ${userSecond}`);

            } else {

                User_Second_Array.push('-')

            };

            if (userThird) {

                Check_User_Array.push(userThird.username);
                User_Third_Array.push(`${neutralEmoji} ${userThird}`);

            } else {

                User_Third_Array.push('-')

            };

            if (userFourth) {

                Check_User_Array.push(userFourth.username);
                User_Fourth_Array.push(`${neutralEmoji} ${userFourth}`);

            } else {

                User_Fourth_Array.push('-')

            };

            if (userFith) {

                Check_User_Array.push(userFith.username);
                User_Fith_Array.push(`${neutralEmoji} ${userFith}`);

            } else {

                User_Fith_Array.push('-')

            };

            if (userSixth) {

                Check_User_Array.push(userSixth.username);
                User_Sixth_Array.push(`${neutralEmoji} ${userSixth}`);

            } else {

                User_Sixth_Array.push('-')

            };

            // Pushing Usernames in to clarify who can react! The top code is for the actual embed.

            Check_User_Array.push(interaction.member.username);

            console.log(`Pushed all users in ${interaction.channel.parent.name}!`);

        } catch (e) {

            interaction.reply({
                content: "Something didn't work...",
                ephemeral: true
            })
            console.log(e);

        }

        // ⬇ Description of the embed

        let UserMessages = ScrimDescripton.toString() + "\n" + "\n" + User_One_Array.toString() + "\n" + "\n" + User_Second_Array.toString() + "\n" + "\n" + User_Third_Array.toString() + "\n" + "\n" + User_Fourth_Array.toString() + "\n" + "\n" + User_Fith_Array.toString() + "\n" + "\n" + User_Sixth_Array.toString();

        let team = `${interaction.channel.parent.name}`; // get category name

        const ScheduleEmbed = new MessageEmbed()
            .setTitle(`${team}'s Schedule`)
            .setDescription(UserMessages)
            .setColor('GREY')
            .setFooter(`Created by ${interaction.member.user.username}`)
            .setTimestamp()

        interaction.channel.send({
            embeds: [ScheduleEmbed]

        }).then(sentMessage => {
            sentMessage.react('👍'); // test emoji - Pass in yes later
            sentMessage.react('<:2ez_no:892498012000096306>');
            sentMessage.react('<:2ez_tentative:892800624754823228>');
            sentMessage.react('<:2ez_edit:893598269937172501>');
            sentMessage.react('🗑️')

            //All of the stuff below is test stuff!

            const filter = (reaction, user) => {
                return reaction.emoji.name === '👍' && user.id === message.author.id;
            };

            const collector = sentMessage.createReactionCollector({
                filter,
                time: 15000
            });

            collector.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);

                interaction.channel.send("Changed!").then(sentMessage => sentMessage.delete({
                    timeout: 3000
                }));

            });

            return interaction.reply("Nah bro... This does't work that way...")

            yescollector.on('collect', (reaction, user) => {

                console.log(user);

                if (user.bot) return;
                reaction.users.remove(user.id)

                if (!Check_User_Array.includes(user.username)) {
                    return;
                }

                try {

                    if (user.id == userOne.id) {

                        User_One_Array.pop();

                        User_One_Array.push(`${yesEmoji} ${userOne}`);

                    }
                } catch {

                }

                try {

                    if (user.id == userSecond.id) {

                        User_Second_Array.pop();

                        User_Second_Array.push(`${yesEmoji} ${userSecond}`);

                    }

                } catch {

                }

                try {

                    if (user.id == userThird.id) {

                        User_Third_Array.pop();

                        User_Third_Array.push(`${yesEmoji} ${userThird}`);

                    }

                } catch {

                }

                try {

                    if (user.id == userFourth.id) {

                        User_Fourth_Array.pop();

                        User_Fourth_Array.push(`${yesEmoji} ${userFourth}`);

                    }

                } catch {

                };

                try {

                    if (user.id == userFith.id) {

                        User_Fith_Array.pop();

                        User_Fith_Array.push(`${yesEmoji} ${userFith}`);

                    }

                } catch {

                };

                try {

                    if (user.id == userSixth.id) {

                        User_Sixth_Array.pop();
                        User_Sixth_Array.push(`${yesEmoji} ${userSixth}`);

                    }

                } catch {

                };

                const ScheduleEdit = new MessageEmbed()
                    .setTitle(`${team}'s Schedule`)
                    .setDescription(UserMessages)
                    .setColor('GREEN')
                    .setFooter(`Created by ${message.author.username} | Latest reaction by ${user.username}`)
                    .setTimestamp()

                m.edit(ScheduleEdit);

            });

            return;

            const nofilter = (reaction, user) => reaction.emoji.name === '2ez_no';
            const nocollector = m.createReactionCollector(nofilter, {
                max: 100,
            });

            nocollector.on('collect', async (reaction, user) => {

                if (user.bot) return;
                reaction.users.remove(user.id)

                if (!Check_User_Array.includes(user.username)) {
                    return;
                }

                try {

                    if (user.id == userOne.id) {

                        User_One_Array.pop();
                        User_One_Array.push(`${noEmoji} ${userOne}`);

                    }

                } catch {

                }

                try {

                    if (user.id == userSecond.id) {

                        User_Second_Array.pop();
                        User_Second_Array.push(`${noEmoji} ${userSecond}`);

                    }

                } catch {

                }

                try {

                    if (user.id == userThird.id) {

                        User_Third_Array.pop();
                        User_Third_Array.push(`${noEmoji} ${userThird}`);

                    }

                } catch {

                }

                try {

                    if (user.id == userFourth.id) {

                        User_Fourth_Array.pop();
                        User_Fourth_Array.push(`${noEmoji} ${userFourth}`);

                    }

                } catch {

                }

                try {

                    if (user.id == userFith.id) {

                        User_Fith_Array.pop();
                        User_Fith_Array.push(`${noEmoji} ${userFith}`);

                    }

                } catch {

                }

                try {

                    if (user.id == userSixth.id) {

                        User_Sixth_Array.pop();
                        User_Sixth_Array.push(`${noEmoji} ${userSixth}`);

                    }

                } catch {

                }

                const ScheduleEdit = new MessageEmbed()
                    .setTitle(`${team}'s Schedule`)
                    .setDescription(UserMessages)
                    .setColor('RED')
                    .setFooter(`Created by ${message.author.username} | Latest reaction by ${user.username}`)
                    .setTimestamp()

                m.edit(ScheduleEdit);

            });

            const NotSurefilter = (reaction, user) => reaction.emoji.name === '2ez_tentative';
            const NotSurecollector = m.createReactionCollector(NotSurefilter, {
                max: 100,
            });

            NotSurecollector.on('collect', async (reaction, user) => {

                if (user.bot) return;
                reaction.users.remove(user.id)

                if (!Check_User_Array.includes(user.username)) {
                    return;
                }

                try {

                    if (user.id == userOne.id) {

                        User_One_Array.pop();
                        User_One_Array.push(`${tentativeEmoji} ${userOne}`);

                    }

                } catch {

                }

                try {

                    if (user.id == userSecond.id) {

                        User_Second_Array.pop();
                        User_Second_Array.push(`${tentativeEmoji} ${userSecond}`);

                    }

                } catch {

                }

                try {

                    if (user.id == userThird.id) {

                        User_Third_Array.pop();
                        User_Third_Array.push(`${tentativeEmoji} ${userThird}`);

                    }

                } catch {

                }

                try {

                    if (user.id == userFourth.id) {

                        User_Fourth_Array.pop();
                        User_Fourth_Array.push(`${tentativeEmoji} ${userFourth}`);

                    }

                } catch {

                }

                try {

                    if (user.id == userFith.id) {

                        User_Fith_Array.pop();
                        User_Fith_Array.push(`${tentativeEmoji} ${userFith}`);
                    }

                } catch {

                }

                try {

                    if (user.id == userSixth.id) {

                        User_Sixth_Array.pop();
                        User_Sixth_Array.push(`${tentativeEmoji} ${userSixth}`);
                    }

                } catch {

                }

                const ScheduleEdit = new MessageEmbed()
                    .setTitle(`${team}'s Schedule`)
                    .setDescription(UserMessages)
                    .setColor('BLUE')
                    .setFooter(`Created by ${message.author.username} | Latest reaction by ${user.username}`)
                    .setTimestamp()

                m.edit(ScheduleEdit);

            });

            const Editfilter = (reaction, user) => reaction.emoji.name === '2ez_edit';
            const Editcollector = m.createReactionCollector(Editfilter, {
                max: 100,
            });

            Editcollector.on('collect', async (reaction, user) => {

                if (user.bot) return;
                reaction.users.remove(user.id)

                if (!Check_User_Array.includes(user.username)) {
                    return;
                }

                let MessageFilter = m => m.author.id === user.id;
                await user.send(`${user.username}, you can now edit this message. Just type anything in ${message.channel}!`).then(() => {
                    message.channel.awaitMessages(MessageFilter, {
                            max: 1,
                            time: "60000",
                            errors: ['time']
                        })
                        .then(message => {
                            message = message.first();

                            try {

                                ScrimDescripton.pop();

                            } catch {

                                message.channel.send('Error ID: ARRAY_NOT_FOUND / ID: 1 - Critical Error!').then(m => m.delete({
                                    timeout: 10000
                                }));
                                message.delete();
                                return;
                            }

                            ScrimDescripton.push(`> ${message.content}`);

                            message.delete().catch(() => {
                                console.log('I could not delete the user edit message...!');
                            })

                            message.channel.send('The Scrim Description has been updated!').then(m => m.delete({
                                timeout: 3000
                            }));

                            const ScheduleEdit = new MessageEmbed()
                                .setTitle(`${team}'s Schedule`)
                                .setDescription(UserMessages)
                                .setColor('YELLOW')
                                .setFooter(`Description edited by ${user.username}`)
                                .setTimestamp()

                            m.edit(ScheduleEdit);

                        })
                        .catch((e) => {
                            message.channel.send(`${user}, your message has timed out! React again to edit in time!`).then(m => m.delete({
                                timeout: 5000
                            }));
                        })
                });

            });

            const Deletefilter = (reaction, user) => reaction.emoji.name === '🗑️';
            const Deletecollector = m.createReactionCollector(Deletefilter, {
                max: 100,
            });

            Deletecollector.on('collect', async (reaction, user) => {

                if (user.bot) return;
                reaction.users.remove(user.id)

                if (!Check_User_Array.includes(user.username)) {
                    return;
                }

                if (user.id !== message.author.id) {

                    return message.channel.send(`Only the author of the schedule, ${message.author.username}, can use this!`).then(m => m.delete({
                        timeout: 5000
                    }));
                }

                m.delete().catch((e) => {

                    message.channel.send('Something went wrong...');
                    console.log(e);

                })

                message.channel.send('Everything has been deleted!').then(m => m.delete({
                    timeout: 6000
                }));

            });

        });
    },
}