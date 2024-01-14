import React from "react";
import DateP from "react-datepicker";

import "../RangeDatePicker/styles.scss";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ setDate, date, ...props }) => {
	return (
		<div className="date-picker-wrapper">
			<DateP
				onChange={setDate}
				selected={date}
				{
					...props
				}
			/>
		</div>
	);
};

DatePicker.defaultProps = {
	date: new Date(),
	setDate: Function,
	dateFormat: "dd.MM.yyyy",
	placeholderText: "Select a range"
};

export default DatePicker;
