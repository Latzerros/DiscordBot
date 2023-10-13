require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
  {
    name: 'teamup',
    description: 'Build 2 Teams out of Channel Members.',
    options: [
        {
            name: 'channel',
            description: 'Select a channel to team up',
            type: ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: 'teamamount',
            description: 'Select amount of teams to team up',
            type: ApplicationCommandOptionType.Number,
        }
    ]
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();