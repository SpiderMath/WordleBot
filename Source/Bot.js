require('dotenv').config();
const { Client, Intents } = require("discord.js");
const Wordle = require('./Testing/Wordle');

// Declaring stuff
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
	],
});

// Events
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag} successfully! ✅`);

	client.guilds.cache.get('839534136548786206').commands.create({
		name: 'play',
		description: 'Play a round of wordle!',
	});
});


client.on('interactionCreate', async (interaction) => {
	if(interaction.isCommand()) await (new Wordle(interaction)).start();
});


// Logging in as the bot
client.login(process.env.DISCORD_TOKEN);
