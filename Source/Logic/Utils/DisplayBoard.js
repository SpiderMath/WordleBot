const { createCanvas } = require("canvas");
const { MessageAttachment } = require("discord.js");

const black = '#A4AEC4';
const yellow = '#F3C237';
const green = '#79B851';

/**
 * @param {string[]} board 
 * @param {string} answer 
 */
function display(board, answer) {
	const canvas = createCanvas(256 * 5, 256 * 6);
	const ctx = canvas.getContext('2d');

	for(let line = 0; line <= 6	; line++) {
		const currentLine = board[line] || [null, null, null, null, null];

		currentLine.map((char, i) => {
			if(char) {
				ctx.fillStyle = getFill(char, answer, i);
				roundRect(ctx, i * 256, line * 256, 256, 256, 64, true);
				ctx.font = '256px Arial';
				ctx.fillStyle = '#ffffff';
				ctx.textAlign = 'center';
				ctx.fillText(char, 128 + (256 * i), (256 * (5 / 6)) + (line * 256));
			}
			else {
				ctx.fillStyle = 'white';
				ctx.strokeStyle = 'black';
				roundRect(ctx, i * 256, line * 256, 256, 256, 64, true);
			}
		});
	}

	return new MessageAttachment(canvas.toBuffer('image/png'), 'board.png');
}


/* Yes, I used StackOverflow for this function */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
	if (typeof stroke === 'undefined') {
		stroke = true;
	}
	if (typeof radius === 'undefined') {
		radius = 5;
	}
	if (typeof radius === 'number') {
		radius = {tl: radius, tr: radius, br: radius, bl: radius};
	} else {
		var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
		for (var side in defaultRadius) {
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


/**
 * @param {string} char 
 * @param {string} answer 
 * @param {number} index 
 */
function getFill(char, answer, index) {
	if(!answer.includes(char)) return black;
	else if(answer[index] === char) return green;
	else return yellow;
}


module.exports = display;