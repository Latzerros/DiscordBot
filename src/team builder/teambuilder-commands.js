const { EmbedBuilder } = require('discord.js');
const userList = [];

function TeamBuilder(client, interaction) {

    const selectedChannelID = interaction.options.get('channel')?.channel.id;
    const selectedChannelName = interaction.options.get('channel')?.channel.name;
    var teamAmount = interaction.options.get('teamamount')?.value;
    const discordChannel = client.channels.cache.get(selectedChannelID)

    //Check if selected channel is a voice channel
    if (discordChannel.type !== 2) {
        return interaction.reply('Please select a voice channel!')
    }

    //Set team amount if not given
    if (teamAmount === undefined) {
        teamAmount = 2;
    };

    //Get list of usernames of selected channel
    if (discordChannel.members.size == 0) {
        return interaction.reply('There are no user!')
    }
    if (discordChannel.members.size < teamAmount) {
        return interaction.reply('There are not enough user to match!')
    }

    discordChannel.members.forEach(element => {
        if (!userList.includes(element.user.username)) {
            userList.push(element.user.username)
        }
    });

    //randomize teams
    let shuffle = userList.sort(() => Math.random() - 0.5);

    function chunkArray(myArray, divider) {
        var index = 0;
        var arrayLength = myArray.length;
        var tempArray = [];

        for (index = 0; index < arrayLength; index += divider) {
            divide = myArray.slice(index, index + divider);
            tempArray.push(divide);
        }
        return tempArray;
    }

    var result = chunkArray(shuffle, (userList.length / teamAmount));
    console.log(result);

    //generate team table
    var teamObject = [];

    for (let i = 0; i < teamAmount; i++) {

        var teamMembers = ''
        result[i].forEach(teamMember => {
            teamMembers += teamMember.toString() + '\n'
        })

        teamObject.push({
            name: 'Team ' + (i + 1),
            value: teamMembers,
            inline: true
        });
    };

    //generate embed with teams
    const embed = new EmbedBuilder()
        .setTitle('Team Builder Result')
        .setDescription(`Generated Teams with users in channel: ${selectedChannelName}`)
        .setColor('Random')
        .addFields(teamObject);

    return interaction.reply({ embeds: [embed] })

}


module.exports = TeamBuilder;