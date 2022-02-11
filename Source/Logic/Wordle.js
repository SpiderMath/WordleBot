const { MessageEmbed } = require('discord.js');
const words = require('../../Assets/Words.json');
const displayBoard = require('./Utils/DisplayBoard');
const isAlphabetical = require('./Utils/isAlphabetical');

module.exports = class Wordle {
	constructor(interaction) {
		/**
		 * @description The main interaction I'm going to use to work with 'stuff'
		 * @type {import('discord.js').CommandInteraction} interaction
		 */
		this.interaction = interaction;

		/**
		 * @description The user ID of the player (use this to sort the inputs)
		 */
		this.player = this.interaction.user.id;

		/**
		 * @description The board to play on!
		 * @type {string[][]}
		 */
		this.board = [];

		/**
		 * @description The word the player is trying to guess
		 */
		this.answer = words[ Math.floor( Math.random() * words.length ) ];

		/**
		 * @description A counter to use
		 */
		this.count = 0;

		/**
		 * @description The win status
		 */
		this.win = false;

		console.log(this.answer);
	}

	async start() {
		console.log('Starting the game...');

		await this.interaction.reply({
			embeds: [this.getDisplayEmbed()],
		});

		while(this.count !== 6) {
			const guessedWord = await this.awaitMessage();
			console.log(guessedWord);

			if(typeof guessedWord === 'boolean') break;

			this.board[this.count] = guessedWord.split('');

			if(guessedWord === this.answer) {
				this.count = 5;
				this.win = true;
			}

			this.count++;

			this.interaction.editReply({
				embeds: [this.getDisplayEmbed()],
			});
		}
	}

	async awaitMessage() {
		const player = this.player;

		const messagesCollected = await this.interaction.channel
			.awaitMessages({
				max: 1,
				time: 2 * 60 * 1000, // 2 minutes
				/**
				 * @param {import('discord.js').Message} message 
				 */
				filter(message) {
					// Check if sent by author
					if(message.author.id !== player) return false;

					// Check if the message is completely alphabetical & if its 5 characters long
					if(message.content.length !== 5 || !isAlphabetical(message.content.toLowerCase())) return false;

					return true;
				}
			});

		if(messagesCollected.size === 0) return false;

		const message = messagesCollected.first();

		if(message.guild.me.permissionsIn(message.channel).has('MANAGE_MESSAGES')) message.delete();

		// I just require their content
		return message.content.toLowerCase();
	}

	getDisplayEmbed() {
		return new MessageEmbed()
			.setDescription(displayBoard(this.board, this.answer))
			.setFooter({
				text: this.interaction.user.tag,
				iconURL: this.interaction.user.displayAvatarURL({ dynamic: true }),
			});
	}
}
