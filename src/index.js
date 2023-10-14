require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const TeamBuilder = require('./team builder/teambuilder-commands');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
    ],
});

client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} is online.`);
});


client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'teamup') {

        TeamBuilder(client, interaction);
    }

    
});

client.login(process.env.TOKEN);