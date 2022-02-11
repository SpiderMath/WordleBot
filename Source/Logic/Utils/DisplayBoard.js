/**
 * @param {string} char
 */
function blackAlphabets(char) {
	return "⬛";
}

/**
 * @param {string} char
 */
function greenAlphabets(char) {
	return "🟩";
}

/**
 * @param {string} char
 */
function yellowAlphabets(char) {
	return "🟨";
}

/**
 * @param {string[]} guessArray
 */
function getCharacters(guessArray, answer) {
	// Guess array contains either the players letters or [0, 0, 0, 0, 0]

	if(guessArray[0] === 0) return `${"⬛".repeat(5)}`;

	let string = "";

	for(let i = 0; i < 5; i++) {
		const index = answer.indexOf(guessArray[i]);

		string += index !== -1
			? index === i
				? greenAlphabets(guessArray[i])
					: yellowAlphabets(guessArray[i])
				: blackAlphabets(guessArray[i]);
	}

	return string;
}

module.exports = function display(board, answer) {
	/**
	 * @type {string[]}
	 */
	const stringArray = board
		.map((guessArr) => getCharacters(guessArr, answer));

	while(stringArray.length !== 6) {
		stringArray.push('⬛'.repeat(5));
	}

	return stringArray.join('\n');
}
