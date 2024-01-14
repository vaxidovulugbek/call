import React from 'react'
import DatePicker from "react-datepicker";

import "./styles.scss"
import "react-datepicker/dist/react-datepicker.css";


const RangeDatePicker = ({setDateRange, dateRange, ...props}) => {
    const [startDate, endDate] = dateRange;

    return (
        <div className="range-picker-wrapper date-picker-wrapper">
            <div className="main-img">
                <img src={require("assets/images/svg/calendar.svg")} alt="" />
            </div>
            <DatePicker
                selectsRange={true}
                onChange={(update) => {
                    setDateRange(update);
                }}
                {...{
                    startDate,
                    endDate,
                    ...props,
                }}
            />
        </div>
    );
}

RangeDatePicker.defaultProps = {
    dateRange: [null, null],
    setDateRange: Function,
    dateFormat: "dd.MM.yyyy",
    placeholderText: 'Select a range'
}

export default RangeDatePicker
