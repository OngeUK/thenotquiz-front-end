import { hydrate, render } from "preact";
import AsyncRoute from "preact-async-route";
import Router, { RouterOnChangeArgs } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import Nav from "./components/nav/nav";
import "./index.scss";
import { IQuestion } from "./types/question";
import { IState } from "./types/state";
import { fetchQuestions } from "./utils/fetchQuestions";
import quizDetails from "./utils/quizDetails";
import { QuizState } from "./utils/quizState";
import { setTheme } from "./utils/setTheme";

export const questionsPerQuiz = 20;
export let state: {
	[key: string]: IState;
};

const App = () => {
	const [hasQuizData, setHasQuizData] = useState(false);
	const [currentPage, setCurrentPage] = useState(window?.location?.pathname);
	const [isHome, setIsHome] = useState(window?.location?.pathname === "/");
	const handleRouteChange = (e: RouterOnChangeArgs<Record<string, string | undefined> | null>) => {
		// Update current page theme colours
		setTheme(e.path!.replace(/\//g, ""));

		setIsHome(window.location.pathname === "/");
		setCurrentPage(window.location.pathname);
	};

	// On first load fetch the quiz questions
	useEffect(() => {
		(async () => {
			try {
				const data = [];
				const questionsData: IQuestion[][] = await fetchQuestions();
				const globalAverageScores = await fetch(`${import.meta.env.VITE_DOMAIN}averages.json`).then((response) => response.json());

				// Create a new quiz state object for each quiz type
				for (const [key, value] of Object.entries(questionsData)) {
					data.push({
						[key]: new QuizState({ quizId: key, data: value, globalAverageScore: globalAverageScores[key] }),
					});
				}

				state = Object.assign({}, ...data);
				setHasQuizData(true);
			} catch (error) {
				console.error(error);
				throw new Error(`Error - ${error}`);
			}
		})();
	}, []);

	return (
		<ErrorBoundary>
			<Nav isHome={isHome} currentPage={currentPage} />
			<main class={`content-wrapper${isHome ? " content-wrapper__full" : ""}`}>
				<Router onChange={handleRouteChange}>
					{/* Use AsyncRoute to enable code-splitting */}
					<AsyncRoute path="/" getComponent={() => import("./components/homepage/homepage").then((module) => module.default)} />
					{quizDetails.map((quizDetails) => (
						<AsyncRoute
							path={`/${quizDetails.path}/`}
							quizDetails={quizDetails}
							hasQuizData={hasQuizData}
							getComponent={() => import("./components/quiz/quiz").then((module) => module.default)}
						/>
					))}
				</Router>
			</main>
		</ErrorBoundary>
	);
};

if (document.querySelector("body")!.hasChildNodes()) {
	hydrate(<App />, document.querySelector("body")!);
} else {
	render(<App />, document.querySelector("body")!);
}

// Register service worker
if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker.register("/sw.js").catch((error: Error) => {
			console.error("Service worker registration failed: ", error);
		});
	});
}
