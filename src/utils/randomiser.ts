export const randomiser = (data: any[]) => {
	// https://stackoverflow.com/a/12646864
	for (let i = data.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[data[i], data[j]] = [data[j], data[i]];
	}

	return data;
};
