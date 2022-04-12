import quizDetails from "./quizDetails";

export const setTheme = (path: string) => {
	const body = document.querySelector("body")!;
	const metaTag = document.querySelector("meta[name='theme-color']");
	const themeDetails = quizDetails.find((quiz) => quiz.path === path);

	let themeColour: string = "#7336b5"; // Homepage theme colour

	// Update theme colour if applicable
	if (themeDetails) themeColour = themeDetails.settings.themeColour;

	// Update page background colour
	body.setAttribute("style", `background-color: ${themeColour}`);

	// Update theme colour meta tag value
	metaTag?.setAttribute("content", themeColour);
};
