require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
const Agents = require('./valorant/agents');

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
  {
    name: 'valo_agent_picker',
    description: 'Build 2 Teams out of Channel Members.',
    options: [
      {
        name: 'channel',
        description: 'Give everyone in one channel random agents.',
        type: ApplicationCommandOptionType.Channel,
      },
      {
        name: 'user',
        description: 'Select a specific user to generate them random agents.',
        type: ApplicationCommandOptionType.User,
      }
    ]
  },
  {
    name: 'valo_add',
    description: 'Build 2 Teams out of Channel Members.',
    options: [
      {
        name: 'user',
        description: 'Select a specific user to generate them random agents.',
        type: ApplicationCommandOptionType.User,
        required: true,
      },
      {
        name: 'agents',
        description: 'Give everyone in one channel random agents.',
        type: ApplicationCommandOptionType.String,
        choices: Agents,
      },
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