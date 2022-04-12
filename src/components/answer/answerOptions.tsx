import { useRef, useState } from "preact/hooks";
import { IQuestion } from "./../../types/question";
import { IState } from "./../../types/state";
import { answersGenerator } from "./../../utils/answersGenerator";
import fireAnalyticsEvent from "./../../utils/fireAnalyticsEvent";
import { IQuizDetails } from "./../../utils/quizDetails";
import { randomiser } from "./../../utils/randomiser";
import Button from "./../button/button";
import AnswerIcon from "./answerIcon";

const AnswerOptions = (props: IProps) => {
	const { question, details, quizState, action } = props;
	const { shortName, subQuestion } = details;
	const { a: answer } = question;
	const [showSubQuestion, setShowSubQuestion] = useState(false);
	const [affirmativeAnswerFeedback, setAffirmativeAnswerFeedback] = useState(<></>);
	const [negativeAnswerFeedback, setNegativeAnswerFeedback] = useState(<></>);
	const [isDisabled, setIsDisabled] = useState(false);
	const [isSubDisabled, setIsDubDisabled] = useState(false);
	const [subAnswers] = useState(answer !== 0 ? randomiser(answersGenerator(answer)) : null);
	const [subAnswerGiven, setSubAnswerGiven] = useState<number | null>(null);
	const [isAnswerReveal, setAnswerReveal] = useState(false);
	const subBtnRef: any = useRef(null);
	const timeOutDuration = 1700;

	// Check the user's answer and update the UI accordingly
	const checkAnswer = (isCorrect: boolean, answerType: "affirmative" | "negative") => {
		fireAnalyticsEvent("Answer", { quiz: quizState.getQuizId });

		if (isCorrect) quizState.incrementScore();
		quizState.incrementTotal();

		// Disable answer buttons when an answer has been selected
		setIsDisabled(true);

		// Show tick/cross feedback for the user's given answer
		if (answer !== 0) {
			if (answerType === "affirmative") setAffirmativeAnswerFeedback(<AnswerIcon type="tick" />);
			if (answerType === "negative") setNegativeAnswerFeedback(<AnswerIcon type="cross" />);

			// Move to next question or show sub questions after a short delay
			setTimeout(() => {
				if (answerType === "affirmative") setShowSubQuestion(true);
				if (answerType === "negative") action();
			}, timeOutDuration);
		} else {
			if (answerType === "affirmative") setAffirmativeAnswerFeedback(<AnswerIcon type="cross" />);
			if (answerType === "negative") setNegativeAnswerFeedback(<AnswerIcon type="tick" />);

			// Move to next question after a short delay
			setTimeout(() => {
				action();
			}, timeOutDuration);
		}
	};

	// Check year based sub answer and update the UI accordingly
	const checkSubAnswer = (isCorrect: boolean, givenAnswer: number) => {
		fireAnalyticsEvent("Answer", { quiz: quizState.getQuizId });

		if (isCorrect) quizState.incrementScore();
		quizState.incrementTotal();

		// Disable answer buttons when an answer has been selected
		setIsDubDisabled(true);

		// Show tick/cross feedback for the user's given answer
		setSubAnswerGiven(givenAnswer);

		if (isCorrect) {
			// Move to next question after a short delay
			setTimeout(() => {
				action();
			}, timeOutDuration);
		} else {
			// Reveal correct answer after a short delay
			setTimeout(() => {
				setAnswerReveal(true);

				// Move to next question after a short delay
				setTimeout(() => {
					action();
				}, timeOutDuration * 1.3);
			}, timeOutDuration);
		}
	};

	return (
		<div class="answer__wrapper">
			<Button label={shortName} action={() => checkAnswer(answer !== 0, "affirmative")} isDisabled={isDisabled} cssClass="button_large">
				{affirmativeAnswerFeedback}
			</Button>
			<div class="answer__group">
				{!showSubQuestion ? (
					<>
						<div ref={subBtnRef}>
							<div class="separator">or</div>
							<Button
								label={`Not ${shortName}`}
								action={() => checkAnswer(answer === 0, "negative")}
								isDisabled={isDisabled}
								cssClass="button_large"
							>
								{negativeAnswerFeedback}
							</Button>
						</div>
					</>
				) : (
					<>
						{subAnswers && (
							<>
								{!isSubDisabled && subBtnRef.current && subBtnRef.current.innerHTML && (
									<div
										aria-hidden
										class="animate-out"
										dangerouslySetInnerHTML={{
											__html: subBtnRef.current.innerHTML,
										}}
									/>
								)}
								<fieldset class={`answer__subgroup${!isSubDisabled ? " animate-in" : ""}`}>
									<legend class="separator separator_light">{subQuestion}</legend>
									<div class="answer__subgroup-items">
										{subAnswers.map((answerChoice) => {
											return (
												<Button
													label={answerChoice.toString()}
													action={() => checkSubAnswer(answerChoice === answer, answerChoice)}
													isDisabled={isSubDisabled}
													cssClass={`button_subgroup${isAnswerReveal && answerChoice !== answer ? " button_subgroup-fade" : ""}`}
												>
													{/* When the user selects an answer, feedback whether they were correct or not */}
													{isSubDisabled && subAnswerGiven === answerChoice ? (
														<AnswerIcon type={answerChoice === answer ? "tick" : "cross"} isSmall={true} />
													) : (
														<>
															{/* Reveal the correct answer */}
															{isAnswerReveal && answerChoice === answer ? <AnswerIcon type="tick" isSmall={true} /> : <></>}
														</>
													)}
												</Button>
											);
										})}
									</div>
								</fieldset>
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default AnswerOptions;

interface IProps {
	question: IQuestion;
	details: IQuizDetails;
	quizState: IState;
	action: Function;
}
