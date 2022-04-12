import { StateUpdater } from "preact/hooks";
import { IIcon } from "./../../utils/quizDetails";
import Button from "./../button/button";
import FormatQuizName from "./../formatQuizName/formatQuizName";
import Loader from "./../loader/loader";
import "./quizLandingPage.scss";

const QuizLandingPage = (props: IProps) => {
	const { name, strapline, description, icon } = props.quizDetails;
	const { btnAction, hasQuizData } = props;

	return (
		<div class="quiz-landing">
			<FormatQuizName data={{ name: name, type: "xlarge", icon: icon }} />
			<span class="strapline">{strapline}</span>
			<p class="quiz-landing__desc">{description}</p>
			<div class="quiz-landing__btn">
				{hasQuizData ? (
					<Button
						label="Play now"
						action={() => {
							btnAction(true);
						}}
					/>
				) : (
					<>
						<span class="visually-hidden">Loading quiz questions</span>
						<div class="loader">
							<Loader />
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default QuizLandingPage;

interface IProps {
	quizDetails: {
		name: string;
		strapline: string;
		description: string;
		icon: IIcon;
	};
	btnAction: StateUpdater<boolean>;
	hasQuizData: boolean;
}
