// Take a duplicate of the just answered question to animate out over the incoming next question
const QuestionTransitionOut = (props: IProps) => {
	const { element, action } = props;

	return (
		<form
			onAnimationEnd={() => action()}
			aria-hidden
			class="question animate-out"
			dangerouslySetInnerHTML={{
				__html: element.innerHTML,
			}}
		></form>
	);
};

export default QuestionTransitionOut;

interface IProps {
	element: Element;
	action: Function;
}
