import { IAsyncRouteProps } from "preact-async-route";
import { memo } from "preact/compat";
import { useState } from "preact/hooks";
import Question from "./../question/question";
import QuizLandingPage from "./../quizLandingPage/quizLandingPage";

// Show quiz landing page or quiz question
const Quiz = (props: IAsyncRouteProps) => {
	const { quizDetails, hasQuizData } = props;
	const [quizStarted, setQuizStarted] = useState(false);

	return (
		<>
			{quizStarted ? (
				<Question details={quizDetails} />
			) : (
				<QuizLandingPage quizDetails={quizDetails} btnAction={setQuizStarted} hasQuizData={hasQuizData} />
			)}
		</>
	);
};

export default memo(Quiz);
