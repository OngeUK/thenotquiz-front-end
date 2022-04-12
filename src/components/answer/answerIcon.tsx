import { useEffect, useState } from "preact/hooks";
import "./answer.scss";

const AnswerIcon = (props: IProps) => {
	const { type, isSmall } = props;
	const [strokevalue, showIcon] = useState("0 50");
	const [opacityvalue, setOpacityValue] = useState(0);

	// Animate in icon on mount
	useEffect(() => {
		showIcon("50 50");
		setOpacityValue(1);
	}, []);

	return (
		<>
			{type === "tick" && (
				<svg
					aria-label="Correct answer"
					class={`answer__icon${isSmall ? " answer__icon_small" : ""}`}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 31 28"
				>
					<path
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						d="M1.5 15.2L12 24.8 29.2 1.5"
						style={{
							transition: "stroke-dasharray 360ms 200ms, opacity 1ms 200ms",
							strokeDasharray: strokevalue,
							stroke: "#fff",
							strokeWidth: 4,
							opacity: opacityvalue,
							transform: "translateZ(0)",
						}}
					/>
				</svg>
			)}
			{type === "cross" && (
				<svg
					aria-label="Wrong answer"
					class={`answer__icon${isSmall ? " answer__icon_small" : ""}`}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 31 28"
				>
					<path
						d="M3.3,1.8l24.6,24.6"
						style={{
							transition: "stroke-dasharray 270ms 290ms",
							strokeDasharray: strokevalue,
							stroke: "#fff",
							strokeWidth: 4,
						}}
					/>
					<path
						d="M27.9,1.8L3.3,26.4"
						style={{
							transition: "stroke-dasharray 270ms 200ms",
							strokeDasharray: strokevalue,
							stroke: "#fff",
							strokeWidth: 4,
						}}
					/>
				</svg>
			)}
		</>
	);
};

export default AnswerIcon;

interface IProps {
	type: "tick" | "cross";
	isSmall?: boolean;
}
