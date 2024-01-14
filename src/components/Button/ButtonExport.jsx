import React from "react"
import { queryBuilder } from "services";
import config from "config";

export const ButtonExport = ({ range, url, ...props }) => (
	<a href={queryBuilder(`${config.API_ROOT}${url}`, {
		extra: range
	})} download={true} className="export-btn" {...props}>
		<img src={require("assets/images/svg/export.svg")} alt="export" />
		Export
	</a>
);

