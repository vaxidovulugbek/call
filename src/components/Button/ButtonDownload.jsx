import React from "react";

import {ReactComponent as DownloadIcon} from "assets/images/svg/download.svg";

export const ButtonDownload = ({ link }) => {
	if(!link) return ""

	return (
		<a href={link} download={true} className="audio-download-button">
			<DownloadIcon />
		</a>
	);
};

