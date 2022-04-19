import { memo } from "preact/compat";
import { IRemainingLabel } from "../../utils/quizDetails";
import { questionsPerQuiz } from "./../../app";
import "./progress.scss";

const Progress = (props: IProps) => {
	const { progress, remainingLabel } = props;
	const remainingQuestions = questionsPerQuiz - progress;

	return (
		<>
			<article class="progress">
				<div
					{...(remainingQuestions === 0
						? { "aria-hidden": true, class: "progress__content progress__content_offscreen" }
						: { class: "progress__content" })}
				>
					{/* Never show zero to the user - we'll just animate out the progress element instead */}
					<strong>{remainingQuestions > 0 ? remainingQuestions : 1}</strong> {remainingQuestions > 1 ? remainingLabel.plural : remainingLabel.single}{" "}
					remaining
				</div>
			</article>
		</>
	);
};

export default memo(Progress);

interface IProps {
	progress: number;
	remainingLabel: IRemainingLabel;
}
