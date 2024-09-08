require("dotenv").config();
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const { token } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.commandArray = [];

const handleEvents = async () => {
  try {
    const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));
    for (const file of eventFiles) {
      const event = require(`./events/${file}`);
      if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
      else client.on(event.name, (...args) => event.execute(...args, client));
    }
  } catch (error) {
    console.error('Error handling events:', error);
  }
};

const handleCommands = async () => {
  try {
    const commandFolders = fs.readdirSync('./commands');
    for (const folder of commandFolders) {
      const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));

      for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
        client.commandArray.push(command.data.toJSON());
      }
    }

    const clientId = "1282047748585033728"; 
    const guildId = "1282030074400477380"; 
    const rest = new REST({ version: '9' }).setToken(token);

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: client.commandArray,
    });
    console.log("Slash commands uploaded");
  } catch (error) {
    console.error('Error handling commands:', error);
  }
};

client.handleEvents = handleEvents;
client.handleCommands = handleCommands;

(async () => {
  try {
    await client.handleEvents();
    await client.handleCommands();
    client.login(token);
  } catch (error) {
    console.error('Error during startup:', error);
  }
})();
