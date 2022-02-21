const { createCanvas } = require('canvas');
const { MessageAttachment } = require('discord.js');


module.exports = class DisplayBoard {
	constructor(answer) {
		/**
		 * @type {string}
		 */
		this.answer = answer;
		this.lineCount = 0;
		this.unit = 128;
		this.canvas = createCanvas(256 * 6, 256 * 5);

		// Initialising the blank board
		for (let i = 0; i <= 5; i++) for (let j = 0; j <= 4; j++) this.fillCell(i, j);
	}

	/**
	 * @param {string} word
	 */
	addWord(word) {
		word
			.split('')
			.map((letter, idx) => this.fillCell(this.lineCount, idx, letter));

		this.lineCount++;
	}

	fillCell(lineNumber, letterIndex, char) {
		const ctx = this.canvas.getContext('2d');

		if (char) {
			ctx.fillStyle = this.getFill(char, letterIndex);
			this.roundRect(ctx, letterIndex * 256, lineNumber * 256, 256, 256, 64, true);

			char = char.toUpperCase();

			ctx.font = `${this.unit}px Arial`;
			ctx.fillStyle = '#ffffff';
			ctx.textAlign = 'center';
			ctx.fillText(char, 128 + (256 * letterIndex), (256 * (5 / 6)) + (lineNumber * 256));
		}
		else {
			ctx.fillStyle = 'white';
			ctx.strokeStyle = 'black';
			this.roundRect(ctx, letterIndex * 256, lineNumber * 256, 256, 256, 64, true, true);
		}
	}

	returnAttachment() {
		return new MessageAttachment(
			this.canvas.toBuffer('image/png'),
			'board.png',
		);
	}

	getFill(char, index) {
		const black = '#A4AEC4';
		const yellow = '#F3C237';
		const green = '#79B851';

		if (!this.answer.includes(char)) return black;
		else if (this.answer[index] === char) return green;
		else return yellow;
	}

	/* Yes, I used StackOverflow for this function */
	roundRect(ctx, x, y, width, height, radius, fill, stroke) {
		if (typeof stroke === 'undefined') {
			stroke = true;
		}
		if (typeof radius === 'undefined') {
			radius = 5;
		}
		if (typeof radius === 'number') {
			radius = { tl: radius, tr: radius, br: radius, bl: radius };
		}
		else {
			const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
			for (const side in defaultRadius) {
				radius[side] = radius[side] || defaultRadius[side];
			}
		}

		ctx.beginPath();
		ctx.moveTo(x + radius.tl, y);
		ctx.lineTo(x + width - radius.tr, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
		ctx.lineTo(x + width, y + height - radius.br);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
		ctx.lineTo(x + radius.bl, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
		ctx.lineTo(x, y + radius.tl);
		ctx.quadraticCurveTo(x, y, x + radius.tl, y);
		ctx.closePath();

		if (fill) {
			ctx.fill();
		}

		if (stroke) {
			ctx.stroke();
		}
	}

};