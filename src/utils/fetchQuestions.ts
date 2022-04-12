import { IQuestion } from "./../types/question";
import quizDetails from "./quizDetails";

// Asynchronously load questions for all quiz types
export const fetchQuestions = async () => {
	const toFetch: Promise<Response | { [x: string]: IQuestion }>[] = [];

	quizDetails.map((quiz) => {
		toFetch.push(
			fetch(`${import.meta.env.VITE_DOMAIN}${quiz.path}.json`)
				.then((response) => response.json())
				.then((json) => {
					return {
						[quiz.path]: json,
					};
				})
				.catch((error) => {
					console.error(error);
					throw new Error(error);
				}),
		);
	});

	// Get all quizzes and return as an object, rather than an array
	return Promise.all(toFetch).then((data) => Object.assign({}, ...data));
};
