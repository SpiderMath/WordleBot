/**
 * @param {string} str
 */
function isAlphabetical(str) {
	let result = true,
		i = 0;

	while (i !== str.length) {
		if (!str.at(i).match(/^[a-z]/)) {
			result = false;
			break;
		}

		i++;
	}

	return result;
}

module.exports = isAlphabetical;