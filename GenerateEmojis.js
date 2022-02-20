require('dotenv').config();
const { createCanvas } = require('canvas');
const { writeFileSync } = require('fs');

const letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

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

function generateCharacters(color, folderName) {
	for(const letter of letters) {
		const canvas = createCanvas(256, 256);
		const ctx = canvas.getContext('2d');

		ctx.fillStyle = color;
		roundRect(ctx, 0, 0, 256, 256, 64, true);

		ctx.font = '256px Arial';
		ctx.fillStyle = '#ffffff';
		ctx.textAlign = 'center';
		ctx.fillText(letter, canvas.width / 2, canvas.height * (5 / 6)); 

		writeFileSync(`./Images/${folderName}/${folderName}_${letter}.png`, canvas.toBuffer());
	}
}

async function main() {
	generateCharacters('#F3C237', 'Yellow');
	generateCharacters('#79B851', 'Green');
	generateCharacters('#A4AEC4', 'Black');
}

main();