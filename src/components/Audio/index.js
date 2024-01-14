import React, { useRef, useState } from "react";
import { useOutsideClick } from "hooks/useOutsideClick";
import cn from "classnames";

const Audio = ({ source, className = "" }) => {
	const audioRef = useRef();
	const { ref } = useOutsideClick(false, (event) => {
		audioRef.current && audioRef.current.pause();
		setIsPlaying(false);
	});

	const [isPlaying, setIsPlaying] = useState(false);

	if (!source) return null;


	return (
		<button ref={ref} onClick={(event) => {
			event.preventDefault();
			setIsPlaying(!isPlaying);
			isPlaying ? audioRef.current.pause() : audioRef.current.play();
		}}
		className={cn("audio-button", className)}

		>
			<audio
				ref={audioRef}
				src={source}
				controls={true}
				className={cn("audio", {
					audio_active: isPlaying
				})}
				onEnded={() => {
					setIsPlaying(false);
				}}
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
				onPlaying={() => setIsPlaying(true)}
			/>
			{
				isPlaying ?
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="12" cy="12" r="12" fill="#4976CE" />
						<path
							d="M9.5 7C9.89782 7 10.2794 7.15804 10.5607 7.43934C10.842 7.72064 11 8.10218 11 8.5V14.5C11 14.8978 10.842 15.2794 10.5607 15.5607C10.2794 15.842 9.89782 16 9.5 16C9.10218 16 8.72064 15.842 8.43934 15.5607C8.15804 15.2794 8 14.8978 8 14.5V8.5C8 8.10218 8.15804 7.72064 8.43934 7.43934C8.72064 7.15804 9.10218 7 9.5 7V7ZM14.5 7C14.8978 7 15.2794 7.15804 15.5607 7.43934C15.842 7.72064 16 8.10218 16 8.5V14.5C16 14.8978 15.842 15.2794 15.5607 15.5607C15.2794 15.842 14.8978 16 14.5 16C14.1022 16 13.7206 15.842 13.4393 15.5607C13.158 15.2794 13 14.8978 13 14.5V8.5C13 8.10218 13.158 7.72064 13.4393 7.43934C13.7206 7.15804 14.1022 7 14.5 7Z"
							fill="white" />
					</svg>
					: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="12" cy="12" r="12" fill="#4976CE" />
						<path d="M17 12L9.5 16.3301L9.5 7.66987L17 12Z" fill="white" />
					</svg>

			}
		</button>
	);
};

export default Audio;