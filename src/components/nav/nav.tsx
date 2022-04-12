import quizDetails, { IQuizDetails } from "./../../utils/quizDetails";
import FormatQuizName from "./../formatQuizName/formatQuizName";
import "./nav.scss";

const Nav = (props: IProps) => {
	const { isHome, currentPage } = props;
	const aria = isHome ? { "aria-hidden": true } : {};
	const cssClass = isHome ? " nav_hidden" : "";

	return (
		<>
			<nav class={`nav${cssClass}`} {...aria}>
				<span class="nav__bar" />
				<ul class="nav__wrapper">
					{quizDetails.map((quiz: IQuizDetails) => {
						const isActive = currentPage.replace(/\//g, "") === `${quiz.path}`;

						return (
							<li class="nav__item">
								<a
									href={`/${quiz.path}/`}
									class="nav__link"
									{...(isActive || isHome ? { tabIndex: -1 } : {})}
									{...(isActive ? { "aria-current": "page" } : {})}
								>
									<FormatQuizName data={{ name: quiz.name, icon: quiz.icon, svgType: "embed" }} />
								</a>
							</li>
						);
					})}
				</ul>
				<span class="nav__bar" />
			</nav>
		</>
	);
};

export default Nav;

interface IProps {
	isHome: boolean;
	currentPage: string;
}
