import React, { useEffect, useState } from "react";

const CheckBox = ({ onChange, innerText, defaultChecked }) => {
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		setIsChecked(defaultChecked);
	}, [defaultChecked]);

	return (
		<label className="checkbox" onClick={event => event.stopPropagation()}>
			<div className="checkbox-box">
				<input
					type="checkbox"
					className="checkbox-input"
					checked={isChecked}
					onChange={(event) => {
						setIsChecked(prev => !prev);
						onChange && onChange(event, isChecked);
					}}
				/>
				{
					innerText && <span className="checkbox_con">
					{innerText}
				</span>
				}
				<span className="checkbox_border" />
				<span className="checkbox_bg" />
			</div>
		</label>

	);
};

export default CheckBox;