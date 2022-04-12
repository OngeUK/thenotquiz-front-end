import { VNode } from "preact";
import { useState } from "preact/hooks";
import "./button.scss";

const Button = (props: IProps) => {
	const { label, action, isDisabled, children, cssClass } = props;

	const [btnStatus, updateBtnStatus] = useState({
		selected: false,
		x: 0,
		y: 0,
	});

	const btnClick = (e: JSX.TargetedMouseEvent<HTMLButtonElement>, action: Function) => {
		const target = e.target as HTMLElement;
		// Get co-ordinates of click/mouse position for animation effect
		const rect = target.getBoundingClientRect(),
			x = e.clientX - rect.left,
			y = e.clientY - rect.top;

		// Update state to trigger a re-render
		updateBtnStatus({
			selected: true,
			x,
			y,
		});

		// Invoke function for this button interaction
		action();
	};

	const highlightCss = {
		left: `calc(${btnStatus.x}px - var(--highlight-size) / 2)`,
		top: `calc(${btnStatus.y}px - var(--highlight-size) / 2)`,
	};

	return (
		<button
			class={`button${cssClass ? ` ${cssClass}` : ""}${btnStatus.selected ? " button_active" : ""}`}
			type="button"
			onClick={(e) => btnClick(e, action)}
			{...(isDisabled ? { disabled: true } : {})}
		>
			{label}
			<span class={`button__highlight${btnStatus.selected ? " button__highlight_selected" : ""}`} style={btnStatus.selected ? highlightCss : {}} />
			{children}
		</button>
	);
};

export default Button;

interface IProps {
	label: string;
	action: Function;
	isDisabled?: boolean;
	children?: VNode<any>;
	cssClass?: string;
}
