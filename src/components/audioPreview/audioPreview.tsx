import { useState } from "preact/hooks";
import { pauseAudio, playAudio } from "./../../utils/audioControls";
import Loader from "./../loader/loader";
import "./audioPreview.scss";

const AudioPreview = (props: IProps) => {
	const { file } = props;
	const [isPlaying, setIsPlaying] = useState(false);
	const [isBuffering, setIsBuffering] = useState(false);

	return (
		<>
			<button
				class="audio-preview"
				aria-label={isPlaying ? "Pause audio clip of this song" : "Play audio clip of this song"}
				type="button"
				onClick={() => {
					if (!isPlaying) {
						playAudio(setIsPlaying, setIsBuffering);
					} else {
						pauseAudio();
						setIsPlaying(false);
					}
				}}
			>
				<Loader cssClass={`audio-preview__loader${isBuffering ? " audio-preview__loader_animate" : ""}`} isLoading={isBuffering} />
				<span class={`audio-preview__icon audio-preview__icon_play${!isPlaying ? " audio-preview__icon_visible" : ""}`}>
					<svg aria-hidden="true" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M19.25 11 .5 21.825V.175L19.25 11Z" fill="var(--light)" />
					</svg>
				</span>
				<span class={`audio-preview__icon audio-preview__icon_pause${isPlaying ? " audio-preview__icon_visible" : ""}`}>
					<svg aria-hidden="true" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0 0h6v21.6H0V0Z" fill="#fff" />
						<path d="M12 0h6v21.6h-6V0Z" fill="var(--light)" />
					</svg>
				</span>
			</button>
			<audio loop preload="none" src={`https://p.scdn.co/mp3-preview/${file}`}></audio>
		</>
	);
};

export default AudioPreview;

interface IProps {
	file: string;
}
