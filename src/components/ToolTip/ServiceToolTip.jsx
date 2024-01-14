import React, { useState } from "react";
import { get } from "lodash";

export const ServiceToolTip = ({ innerText, data = [], dataKey }) => {
	const [activeClass, setActiveClass] = useState("");

	return (
		<div
			className="service-tooltip-wrapper"
			onMouseEnter={
				innerText === 0
					? null
					: () => setActiveClass("service-tooltip_active")
			}
			onMouseLeave={innerText === 0 ? null : () => setActiveClass("")}>
			{innerText}
			<img src={require("assets/images/svg/service-info.svg")} alt="" />
			<ul className={`service-tooltip ${activeClass || ""}`}>
				{data.map((item, index) => (
					<li key={item.id} className="service-tooltip__item">
						{index + 1} {dataKey ? get(item, dataKey) : item}
					</li>
				))}
			</ul>
		</div>
	);
};
