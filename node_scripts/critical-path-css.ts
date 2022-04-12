//@ts-ignore
const critical = require("critical");
//@ts-ignore
const fs = require("fs-extra");
import quizDetails from "../src/utils/quizDetails";

// Run critical to and inline extract critical path CSS for each quiz
for (const quiz of quizDetails) {
	critical.generate({
		inline: true,
		base: "build/",
		src: `${quiz.path}/index.html`,
		target: {
			html: `${quiz.path}/index.html`,
		},
		width: 1300,
		height: 900,
	});

	console.log(`Critical CSS generated for ${quiz.shortName}`);
}

// Couldn't get critical to work on homepage unless it's in a sub-folder
// Move index.html to home directory, add critical css, move back to root
fs.move("./build/index.html", "./build/home/index.html", (err: Error) => {
	if (err) return console.error(err);

	critical.generate(
		{
			inline: true,
			src: "./build/home/index.html",
			target: {
				html: "./build/home/index.html",
			},
			width: 1300,
			height: 900,
		},
		() => {
			fs.move("./build/home/index.html", "./build/index.html", { overwrite: true })
				.then(() => {
					console.log("Critical CSS generated for Homepage");
				})
				.then(() => {
					// Delete temp home directory
					fs.remove("./build/home");
				})
				.catch((err: Error) => {
					console.error(err);
				});
		},
	);
});
