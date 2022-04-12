import { memo } from "preact/compat";
import { useEffect, useRef } from "preact/hooks";
import { IQuestion } from "./../../types/question";
import { IQuizDetails } from "./../../utils/quizDetails";
import AudioPreview from "./../audioPreview/audioPreview";

// Format the question depending on the quiz type
const QuestionDetails = (props: IProps) => {
	// To keep the API data lean, JSON keys have been kept short
	// Destructure into more easily usable terms
	let { h: heading, s: subheading, e: extraInfo } = props.question;
	const { headingClass, subheadingClass, extraInfoClass, extraInfoLabel, hasAudio, swapHeadings, preventWidows } = props.details.settings;
	const legendRef: any = useRef(null)!;

	// Swap the order of the heading/subheading data where applicable
	if (swapHeadings) [heading, subheading] = [subheading, heading];

	// For quizzes with longer headings/subheadings, prevent widows using a span & CSS
	if (preventWidows) heading = heading.replace(/\s+(?=\S*$)/, "&nbsp;");
	if (preventWidows) subheading = subheading.replace(/\s+(?=\S*$)/, "&nbsp;");

	// Focus the legend element when the question is displayed so a keyboard user doesn't have to tab through the nav to get to the answer options
	useEffect(() => {
		legendRef.current.focus();
	});

	return (
		<legend ref={legendRef} class="question__details" tabIndex={-1}>
			{heading && (
				<div
					class={headingClass}
					dangerouslySetInnerHTML={{
						__html: heading,
					}}
				/>
			)}
			{subheading && (
				<div
					class={subheadingClass}
					dangerouslySetInnerHTML={{
						__html: subheading,
					}}
				/>
			)}
			{hasAudio ? (
				<AudioPreview file={extraInfo} />
			) : (
				<span {...(extraInfoClass ? { class: extraInfoClass } : {})}>
					{extraInfoLabel ? extraInfoLabel : ""} {extraInfo}
				</span>
			)}
		</legend>
	);
};

export default memo(QuestionDetails);

interface IProps {
	question: IQuestion;
	details: IQuizDetails;
}
