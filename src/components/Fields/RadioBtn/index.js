import React from "react";

const RadioBtn = ({ isChecked, setIsChecked, innerText, ...props }) => {
	return (
		<label className="radio">
			<input
				type="radio"
				className="radio-input"
				checked={isChecked}
				onChange={(event) => {
					setIsChecked(event.target.value)
				}}
				{...props}
			/>
			<span className="radio-radio" />
			{innerText}
		</label>

	);
};

export default RadioBtn;

