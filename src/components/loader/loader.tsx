const Loader = (props: IProps) => {
	const { cssClass, isLoading = true } = props;

	return (
		<svg {...(cssClass ? { class: cssClass } : {})} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" xmlSpace="preserve">
			<mask id="mask">
				<rect width="23" height="50" fill="var(--light)" />
				<rect width="23" height="50" x="27" fill="var(--light)" />
			</mask>
			{/* Disable mask if not in loading state */}
			<circle cx="25" cy="25" r="23" stroke="var(--light)" stroke-width="2" fill="transparent" {...(isLoading ? { mask: "url(#mask)" } : {})} />
		</svg>
	);
};

interface IProps {
	cssClass?: string;
	isLoading?: boolean;
}

export default Loader;
