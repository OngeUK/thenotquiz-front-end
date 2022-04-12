import { CountUp } from "countup.js";
import { useEffect, useRef, useState } from "preact/hooks";
import { IState } from "./../../types/state";
import fireAnalyticsEvent from "./../../utils/fireAnalyticsEvent";
import quizDetails, { IQuizDetails } from "./../../utils/quizDetails";
import "./finalScore.scss";

const FinalScore = (props: IProps) => {
	const { quizState, action } = props;
	const dashArray = 629;
	const [dashOffset, setDashOffset] = useState(dashArray);
	const [scoreRevealed, setScoreRevealed] = useState(false);
	const refScore = useRef(null);
	const { getGlobalAverageScore: globalAverageScore, getQuizId } = quizState;

	// Calculate the score as a decimal
	const userScore = quizState.getScore.correct / quizState.getScore.total;

	// Calculate the score as a percentage
	const userScorePercentage = Math.round(userScore * 100);

	// Calculate the difference between the user's score and the global average score
	const difference = Math.round(userScorePercentage - globalAverageScore);

	useEffect(() => {
		if (refScore.current) {
			fireAnalyticsEvent(`Score (${getQuizId})`, { score: userScorePercentage });

			// Animate in the score after a short delay
			setTimeout(() => {
				setDashOffset(Math.round(dashArray - userScore * dashArray));

				const countUp = new CountUp(refScore.current as unknown as HTMLElement, userScorePercentage, {
					duration: 2.75,
				});
				countUp.start();
			}, 500);

			// Reveal global average score once the score has finished animating
			setTimeout(
				() => {
					setScoreRevealed(true);
				},
				userScore === 0 ? 1000 : 3300,
			);
		}
	}, []);

	return (
		<div class="final-score animate-in">
			<h1 class="final-score__heading">Score</h1>
			<div class="final-score__radial">
				<svg aria-hidden="true" class="final-score__radial-content" viewBox="-10 -10 220 220">
					<path
						d="M0,100 a100,100 0 1 0 200,0 a100,100 0 1 0 -200,0"
						fill="transparent"
						stroke="rgba(255, 255, 255, 0.35)"
						stroke-width="5"
						stroke-linecap="round"
					/>
					<path
						class="final-score__percentage-bar"
						d="M100,0 a100,100 0 0 1 0,200 a100,100 0 0 1 0,-200,0"
						fill="none"
						stroke={quizDetails.find((quiz: IQuizDetails) => quiz.path === window.location.pathname.replace(/\//g, ""))!.settings.themeColourDark}
						stroke-width="15"
						stroke-dasharray={dashArray}
						stroke-linecap="round"
						stroke-dashoffset={dashOffset} // Percentage bar size
					/>
				</svg>
				<span class={`final-score__percentage-value${scoreRevealed ? " final-score__percentage-value_moved" : ""}`}>
					<span ref={refScore}>{!scoreRevealed && 0}</span>%
				</span>
				<span class={`final-score__difference${scoreRevealed ? " final-score__difference_moved" : ""}`}>
					{difference >= 0 ? "▲" : "▼"}{" "}
					<strong>
						{+Math.abs(difference)}% {difference >= 0 ? "above" : "below"}
					</strong>{" "}
					global average
				</span>
			</div>
			<p class="final-score__summary">
				There are hundreds more questions
				<br />
				Can you beat your score?
			</p>
			<div class="final-score__btn-wrapper">
				<button
					class="button"
					onClick={() => {
						fireAnalyticsEvent("Replay", { quiz: getQuizId });
						quizState.resetProgress();
						quizState.resetScore();
						action();
					}}
				>
					Replay
				</button>
			</div>
		</div>
	);
};

export default FinalScore;

interface IProps {
	quizState: IState;
	action: Function;
}
