//@ts-ignore
const Prerenderer = require("puppeteer-prerender");
//@ts-ignore
const fs = require("fs-extra");
import quizDetails, { IQuizDetails } from "../src/utils/quizDetails";

// Static site generation for quiz pages
async function ssg(quiz: IQuizDetails) {
	const prerender = new Prerenderer();

	try {
		// Get markup for quiz page
		let { html } = await prerender.render(`http://localhost:4173/${quiz.path}`);

		if (quiz.shortName !== "Home") {
			// Update title tag
			html = html.replace(/<title>(.*?)<\/title>/, `<title>${quiz.name} &ndash; ${quiz.strapline} - The Not Quiz</title>`);

			// Update og:title meta data
			html = html.replace(/<meta property="og:title" content="(.*?)">/, `<meta property="og:title" content="${quiz.name} - The Not Quiz">`);

			// Update twitter:title meta data
			html = html.replace(/<meta name="twitter:title" content="(.*?)">/, `<meta name="twitter:title" content="${quiz.name} - The Not Quiz">`);

			// Update theme colour
			html = html.replace(/<meta name="theme-color" content="(.*?)">/, `<meta name="theme-color" content="${quiz.settings.themeColour}">`);

			// Update description meta data
			html = html.replace(/<meta name="description" content="(.*?)">/, `<meta name="description" content="${quiz.description}. Play ${quiz.name} now!">`);

			// Update og:description meta data
			html = html.replace(
				/<meta property="og:description" content="(.*?)">/,
				`<meta property="og:description" content="${quiz.description}. Play ${quiz.name} now!">`,
			);

			// Update twitter:description meta data
			html = html.replace(
				/<meta name="twitter:description" content="(.*?)">/,
				`<meta name="twitter:description" content="${quiz.description}. Play ${quiz.name} now!">`,
			);
		}

		// Remove whitespace from markup to minify
		html = html.replace(/\s+/g, " ");

		// Write markup to file
		await fs.outputFile(`build/${quiz.path}/index.html`, html);
		console.log(`Generated ${quiz.shortName} index.html`);
	} catch (e) {
		console.error(e);
	}

	await prerender.close();
}

// Add a record for the homepage
quizDetails.push({
	name: "",
	shortName: "Home",
	path: "",
	strapline: "",
	description: "",
	subQuestion: "",
	// @ts-ignore
	settings: {},
	// @ts-ignore
	icon: "",
});

// Loop through each quiz and generate a static page
for (const quiz of quizDetails) {
	ssg(quiz);
}
