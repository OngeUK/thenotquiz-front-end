// Generate random answers
export const answersGenerator = (answer: number) => {
	const date = new Date();
	const currentYear = date.getFullYear();
	const answersArray = [answer];

	// Set range of possible answers between +/-7 years (cannot use a date in the future)
	const max = answer + 7 > currentYear ? currentYear : answer + 7;
	const min = answer - 7;

	let counter = 0;

	// Get our three random wrong answers
	while (counter < 3) {
		const randomWrongAnswer = Math.floor(Math.random() * (max - min + 1)) + min;

		// If number is not already in array
		if (!answersArray.includes(randomWrongAnswer)) {
			answersArray.push(randomWrongAnswer);
			counter++;
		}
	}

	return answersArray;
};
