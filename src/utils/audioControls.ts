import fireAnalyticsEvent from "./fireAnalyticsEvent";

export const playAudio = (setIsPlaying: Function, setIsBuffering: Function) => {
	fireAnalyticsEvent("Audio preview", {});

	const audio = document.querySelector("audio")!;

	audio.volume = 0;
	audio.play();
	setIsBuffering(true);

	audio.onplaying = () => {
		setIsPlaying(true);
		setIsBuffering(false);

		let fadeInAudio = setInterval(function () {
			// Decide when to fade
			if (Number(audio.volume.toFixed(1)) < 1) {
				audio.volume += 0.1;
			}

			// When volume is at max, stop increasing
			if (Number(audio.volume.toFixed(1)) >= 1) {
				clearInterval(fadeInAudio);
				audio.volume = 1;
			}
		}, 30);
	};
};

export const pauseAudio = () => {
	const audio = document.querySelector("audio")!;
	let previousVolume = 1;

	let fadeOutAudio = setInterval(function () {
		// Decide when to fade
		if (Number(audio.volume.toFixed(1)) > 0) {
			audio.volume -= 0.1;
		}

		// When volume is low enough, stop playback
		// Note Safari only permits one iteration here - if the previousVolume hasn't changed, just pause without fading
		if (Number(audio.volume.toFixed(1)) <= 0 || Number(audio.volume.toFixed(1)) === previousVolume) {
			audio.pause();
			clearInterval(fadeOutAudio);
			audio.volume = 0;
		}

		previousVolume = Number(audio.volume.toFixed(1));
	}, 30);
};

export const hasAudio = () => document.querySelector("audio") !== null;
