import quizDetails, { IQuizDetails } from "./../../utils/quizDetails";
import FormatQuizName from "./../formatQuizName/formatQuizName";
import "./homepage.scss";

const Homepage = () => (
	<>
		<h1 class="visually-hidden">The Not Quiz</h1>
		<nav class="homepage__nav">
			<ul class="homepage__nav-wrapper">
				{quizDetails.map((quiz: IQuizDetails) => {
					return (
						<li class="homepage__nav-item">
							<a class="homepage__nav-link" href={`/${quiz.path}/`}>
								<FormatQuizName data={{ name: quiz.name, type: "large", icon: quiz.icon }} />
								<span class="strapline">{quiz.strapline}</span>
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	</>
);

export default Homepage;
