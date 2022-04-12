import { useEffect, useRef, useState } from "preact/hooks";
import { questionsPerQuiz, state } from "./../../app";
import { IQuestion } from "./../../types/question";
import { hasAudio, pauseAudio } from "./../../utils/audioControls";
import fireAnalyticsEvent from "./../../utils/fireAnalyticsEvent";
import { IQuizDetails } from "./../../utils/quizDetails";
import AnswerOptions from "./../answer/answerOptions";
import FinalScore from "./../finalScore/finalScore";
import Progress from "./../progress/progress";
import "./question.scss";
import QuestionDetails from "./questionDetails";
import QuestionTransitionOut from "./questionTransitionOut";

const Question = (props: IProps) => {
	try {
		const defaultQuizStatus = {
			isGameOver: false,
		};

		const { details } = props;
		const [quizState] = useState(state[details.path]);
		const [currentQuestion, setCurrentQuestion] = useState(quizState.getQuestions!.next().value);
		const [nextQuestion, setNextQuestion] = useState(quizState.getQuestions!.next().value);
		const [quizStatus, setQuizStatus] = useState(defaultQuizStatus);
		const [playCounter, setPlayCount] = useState(0);
		const [isTransitioning, setIsTransitioning] = useState(false);
		const questionRef = useRef(null);

		useEffect(() => {
			fireAnalyticsEvent("Start", { quiz: quizState.getQuizId });

			// Reset quiz state on a new quiz play through
			quizState.resetProgress();
			quizState.resetScore();
			setPlayCount(playCounter + 1);
		}, []);

		// User has completed a question
		const moveToNextQuestion = () => {
			setIsTransitioning(true);

			// Fade out/pause any currently playing audio
			if (hasAudio()) pauseAudio();

			quizState.incrementProgress();

			if (quizState.getProgress === questionsPerQuiz - 1) setQuizStatus({ ...quizStatus });
			if (quizState.getProgress === questionsPerQuiz) setQuizStatus({ ...quizStatus, isGameOver: true });

			setCurrentQuestion(nextQuestion);
			setNextQuestion(quizState.getQuestions!.next().value);
		};

		return (
			<>
				{!quizStatus.isGameOver ? (
					<>
						<form ref={questionRef} class="question animate-in" key={currentQuestion}>
							<fieldset>
								<QuestionDetails question={currentQuestion as IQuestion} details={details} />
								<AnswerOptions
									question={currentQuestion as IQuestion}
									details={details}
									action={() => moveToNextQuestion()}
									quizState={quizState}
								/>
							</fieldset>
						</form>
						{isTransitioning && questionRef.current && (
							// Animate out previous question
							<QuestionTransitionOut element={questionRef.current} action={() => setIsTransitioning(false)} />
						)}
						<Progress progress={quizState.getProgress} />
					</>
				) : (
					<>
						<FinalScore quizState={quizState} action={() => setQuizStatus(defaultQuizStatus)} />
						{isTransitioning && questionRef.current && (
							// Animate out previous question
							<QuestionTransitionOut element={questionRef.current} action={() => setIsTransitioning(false)} />
						)}
						<Progress progress={quizState.getProgress} />
					</>
				)}
			</>
		);
	} catch (error) {
		throw new Error("Question error");
	}
};

export default Question;

interface IProps {
	details: IQuizDetails;
}
