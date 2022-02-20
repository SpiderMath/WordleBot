require('dotenv').config();
const { Client, Intents } = require('discord.js');
const { writeFileSync } = require('fs');

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
	],
});

const greenEmojis = {};
const yellowEmojis = {};
const blackEmojis = {};

/**
 * @param {import('discord.js').Guild} guild 
 */
function saveEmojis(guild) {
	guild.emojis.cache
		.map((emote) => {
			const emoName = `<:${emote.name}:${emote.id}>`;

			if(emote.name.startsWith('Green')) greenEmojis[emote.name.at(6)] = emoName;
			if(emote.name.startsWith('Yellow')) yellowEmojis[emote.name.at(7)] = emoName;
			if(emote.name.startsWith('Black')) blackEmojis[emote.name.at(6)] = emoName;
		});
}

async function sleep(seconds) {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

client.on('ready', async () => {
	saveEmojis(client.guilds.cache.get('944578864087187496'));
	saveEmojis(client.guilds.cache.get('943449603863371807'));

	console.log('hmm');
	await sleep(60);
	console.log('Ive awoken');
	writeFileSync('BlackEmojis.json', JSON.stringify(blackEmojis, null, '\t'));
	writeFileSync('GreenEmojis.json', JSON.stringify(greenEmojis, null, '\t'));
	writeFileSync('YellowEmojis.json', JSON.stringify(yellowEmojis, null, '\t'));
});

client.login(process.env.DISCORD_TOKEN);
