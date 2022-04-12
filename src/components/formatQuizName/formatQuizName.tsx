import { IIcon } from "./../../utils/quizDetails";
import "./formatQuizName.scss";

// Format quiz names to wrap enable bold and non-bold text
const FormatQuizName = (props: IPropTypes) => {
	const { name, type, icon, svgType = "use" } = props.data;
	const [title, notTitle] = name.split(" or ");

	return (
		<span class={`quiz-name${type ? ` quiz-name_${type}` : ""}`}>
			<span class="quiz-name__icon">
				{/*
				Have one instance of our icon SVG code on the page to keep the DOM lean
				Implement <use> to reference the icon where else it would be a duplicate
				*/}
				{svgType === "embed" ? (
					<svg
						aria-hidden="true"
						viewBox={icon.viewBox}
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						dangerouslySetInnerHTML={{
							__html: icon.path,
						}}
					></svg>
				) : (
					<svg aria-hidden="true" viewBox={icon.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
						<use href={`#icon-${title.toLowerCase()}`}></use>
					</svg>
				)}
			</span>
			<span class="quiz-name__wrapper">
				<span class="quiz-name__title">{title}</span>
				<span class="quiz-name__or"> or </span>
				<span class="quiz-name__title">{notTitle}</span>
			</span>
		</span>
	);
};

export default FormatQuizName;

interface IPropTypes {
	data: {
		name: string;
		type?: string;
		icon: IIcon;
		svgType?: "embed" | "use";
	};
}
