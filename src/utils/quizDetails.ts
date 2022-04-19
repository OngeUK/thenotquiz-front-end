// Details for each quiz
// Ensure each icon.path is wrapped with a <g> tag with an ID of `icon-[path]`
const quizDetails: IQuizDetails[] = [
	{
		name: "Dead or Not Dead",
		shortName: "Dead",
		path: "dead",
		strapline: "Celebrity dead or alive quiz",
		description: "Can you identify which of the following famous people are deceased and which are still alive?",
		subQuestion: "Year died",
		remainingLabel: {
			single: "celebrity",
			plural: "celebrities",
		},
		settings: {
			themeColour: "#006503",
			themeColourDark: "#004202",
			headingClass: "question__heading question__heading_large",
			subheadingClass: "question__subheading",
			extraInfoClass: "question__subheading",
			extraInfoLabel: "Born",
		},
		icon: {
			viewBox: "-25 -10 300 300",
			path: '<g id="icon-dead"><path d="M156.406 2.935C86.179-9.68 21.628 19.36 4.366 71.011c-10.025 29.991-.118 74.55 3.311 83.071 1.655 4.142 2.554 6.712 4.303 11.901a91.095 91.095 0 0 1 3.713 13.568c.213 1.237.496 3.475.78 5.95.402 3.809.402 5.023.78 7.76 0 0 .45 3.19 1.254 6.474 2.53 10.021 22.25 21.875 23.22 22.446 12.224 7.141 16.149 7.141 20.003 13.139 2.128 3.261 2.838 7.284 3.642 13.758A37.758 37.758 0 0 0 72.3 267.43a25.477 25.477 0 0 0 11.515 7.831c0-.405-.166-.952-.237-1.595-.496-5.07 1.774-11.901 5.391-12.568 3.618-.666 7.945 4.023 8.915 10.355a16.773 16.773 0 0 1-.166 6.284c3.287.428 6.928.714 10.924.928a17.929 17.929 0 0 1-.827-3.69c-.662-6.426 2.033-11.901 6.006-12.377 3.972-.476 7.755 4.451 8.417 10.854.195 1.87.083 3.76-.331 5.594h9.482a16.963 16.963 0 0 1-.331-5.642c.662-6.379 4.445-11.211 8.418-10.782 3.972.428 6.644 5.951 5.982 12.33a18.626 18.626 0 0 1-.78 3.594c4.232-.262 8.039-.667 11.491-1.19a17.187 17.187 0 0 1 0-6.094c1.254-6.331 5.462-10.854 9.459-10.068 3.996.785 5.84 6.069 4.941 12.068 9.459-4.475 13.431-11.902 14.873-24.16 1.892-15.234 3.311-16.9 23.646-26.897 21.469-10.568 25.111-27.944 25.111-31.229v-2.023c.165-3.666.26-5.856.473-7.998a56.81 56.81 0 0 1 1.111-6.736 68.877 68.877 0 0 1 2.601-9.116 56.9 56.9 0 0 1 2.365-5.618c1.206-2.832 2.175-4.76 2.364-5.403a69.711 69.711 0 0 0 4.256-13.925 123.35 123.35 0 0 0-1.398-56.607 122.82 122.82 0 0 0-26.527-49.933c-22.557-23.089-50.222-28.373-63.038-30.682ZM61.825 183.454c-11.35-3.808-15.606-10.473-15.606-24.992a66.847 66.847 0 0 1 2.814-21.232 134.155 134.155 0 0 0 27.783-12.616 165.387 165.387 0 0 0 14.187-9.14 22.27 22.27 0 0 1 8.276 3.951c13.478 10.711 17.024 28.325 8.512 44.987a38.188 38.188 0 0 1-19.443 18.08 37.852 37.852 0 0 1-26.452.962h-.071Zm75.665 43.821c-3.358.357-5.864-.714-8.536-4.308l-3.736-4.761-3.736 4.761c-4.966 6.284-12.792 5.927-13.691-.714-.898-6.641 2.672-16.662 9.6-24.707 3.31-4.118 6.975-7.522 7.85-7.522 2.861 0 14.424 15.21 16.197 21.422 3.027 9.926 1.608 15.115-3.925 15.829h-.023Zm52.185-43.821a37.852 37.852 0 0 1-26.438-.971 38.187 38.187 0 0 1-19.434-18.071c-8.512-16.662-4.966-34.276 8.512-44.987a22.085 22.085 0 0 1 8.276-3.951 165.353 165.353 0 0 0 14.187 9.14 134.182 134.182 0 0 0 27.783 12.616 66.839 66.839 0 0 1 2.814 21.232c-.094 14.519-4.28 21.184-15.7 24.992Z" fill="var(--light)" /></g>',
		},
	},
	{
		name: "Number 1 or Not Number 1",
		shortName: "Number 1",
		path: "number1",
		strapline: "UK chart music quiz",
		description: "These songs all made the top 10 of the Official UK Singles Chart, but can you pick the chart-toppers?",
		subQuestion: "Year released",
		remainingLabel: {
			single: "song",
			plural: "songs",
		},
		settings: {
			themeColour: "#005c90",
			themeColourDark: "#003c5e",
			headingClass: "question__heading",
			subheadingClass: "question__subheading question__subheading_tight",
			extraInfoClass: null,
			hasAudio: true,
			swapHeadings: true,
			preventWidows: true,
		},
		icon: {
			viewBox: "-25 -25 300 300",
			path: '<g id="icon-number 1"><path d="M16.0643 216.399V193.001L0 200.684V179.555L16.0643 172.047V140.093L0 147.776V126.823L16.0643 118.965V91.5511H31.2555V112.33L50.2882 103.076V73.7407H65.3048V96.4403L81.5437 88.9319V109.711L65.3048 117.394V149.522L81.5437 142.363V163.491L65.3048 170.476V200.334H50.2882V177.111L31.2555 186.191V216.399H16.0643ZM31.2555 165.412L50.2882 156.158V124.204L31.2555 133.458V165.412Z" fill="var(--light)" /><path d="M183.156 0.381958C183.411 0.127319 185.576 0 189.65 0C195.507 0 199.072 1.40053 200.345 4.20159C200.854 5.22016 201.109 41.8886 201.109 114.207V222.685H225.554H250V236.435V250.186H245.034L206.838 249.422C184.684 249.167 162.658 249.167 140.758 249.422C115.294 249.931 102.689 250.186 102.944 250.186H97.9786V236.435V222.685H122.042H146.106V134.451V46.2176L141.904 46.9815C128.663 50.2918 114.148 51.947 98.3605 51.947H91.8672V38.1963V24.4457H98.3605C126.88 24.4457 150.435 19.4801 169.024 9.54908C175.135 6.74802 179.846 3.69231 183.156 0.381958Z" fill="var(--light)" /></g>',
		},
	},
	{
		name: "Oscar or Not Oscar",
		shortName: "Oscar",
		path: "oscar",
		strapline: "Movie award winners quiz",
		description: "The following were all nominated for an Academy Award, but can you pick the Oscar winners?",
		subQuestion: "Year won",
		remainingLabel: {
			single: "nominee",
			plural: "nominees",
		},
		settings: {
			themeColour: "#9e01a0",
			themeColourDark: "#670168",
			headingClass: "question__heading",
			subheadingClass: "question__heading question__heading_italic",
			extraInfoClass: "question__subheading",
			swapHeadings: true,
			preventWidows: true,
		},
		icon: {
			viewBox: "0 0 300 300",
			path: '<g id="icon-oscar"><path d="M300 114.569 196.352 98.793 150 0l-46.352 98.793L0 114.57l74.936 76.81L57.296 300l76.867-42.414c-2.318-13.189-4.378-28.189-3.348-43.965.258-4.138.515-8.405.644-12.543l.129-3.75v-1.423c-6.953-4.138-8.24-12.672-9.013-18.491l-.772-6.207c-.258-3.104-.644-5.948-1.288-8.664-1.545-6.724-1.931-17.069-1.03-25.086.644-5.69 3.09-9.828 6.824-11.638 1.803-.905 15.064-5.431 14.034-11.767-1.03-6.207-3.734-15-3.862-21.207-.129-5.69 1.416-15.388 12.618-15.905h.257c11.202.517 12.747 10.215 12.618 15.905-.129 6.207-2.446 15-3.476 21.207-1.03 6.336 11.845 10.991 13.648 11.767 3.734 1.81 6.18 5.948 6.824 11.638.901 8.017.515 18.362-1.03 25.086-.644 2.716-.901 5.56-1.159 8.664-.257 2.069-.386 4.138-.772 6.207-.902 5.689-2.189 14.353-9.013 18.491 0 .129-.129.647 0 1.423 0 1.293.128 2.586.128 3.75.129 4.138.387 8.405.644 12.543 1.03 15.388-1.03 30.258-3.219 43.189L242.704 300l-17.768-108.491L300 114.569Z" fill="var(--light)" /></g>',
		},
	},
];

export default quizDetails;

export interface IQuizDetails {
	name: string;
	shortName: string;
	path: string;
	strapline: string;
	description: string;
	subQuestion: string;
	remainingLabel: IRemainingLabel;
	settings: IQuizSettings;
	icon: IIcon;
}

export interface IQuizSettings {
	themeColour: string;
	themeColourDark: string;
	headingClass: string;
	subheadingClass: string;
	extraInfoClass?: string | null;
	extraInfoLabel?: string;
	hasAudio?: boolean;
	swapHeadings?: boolean;
	preventWidows?: boolean;
}

export interface IIcon {
	viewBox: string;
	path: string;
}

export interface IRemainingLabel {
	single: string;
	plural: string;
}
