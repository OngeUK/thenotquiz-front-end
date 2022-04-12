import { memo } from "preact/compat";
import { questionsPerQuiz } from "./../../app";
import "./progress.scss";

const Progress = (props: IProps) => {
	const { progress } = props;
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
					<strong>{remainingQuestions > 0 ? remainingQuestions : 1}</strong> question{remainingQuestions > 1 ? "s" : ""} remaining
				</div>
			</article>
		</>
	);
};

export default memo(Progress);

interface IProps {
	progress: number;
}
