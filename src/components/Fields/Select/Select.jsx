import React from "react";
import Select, { components } from "react-select";
import PropTypes from "prop-types";

import "components/Fields/Select/Select.css";
import { ReactComponent as FiChevron } from "assets/images/svg/fi_chevron-down.svg";
import { isFunction } from "lodash";

// const options = [
// 	{ value: "Client Name1", label: "Client Name" },
// 	{ value: "Client Name2", label: "Client Name" },
// 	{ value: "Client Name3", label: "Client Name" },
// 	{ value: "Client Name4", label: "Client Name" }
// ];

const DropdownIndicator = props => {
	return (
		<components.DropdownIndicator {...props}>
			<FiChevron />
		</components.DropdownIndicator>
	);
};

const CustomSelect = ({
						  DropdownIndicator,
						  options,
						  optionLabel,
						  optionValue,
						  className,
						  placeholder,
						  isSearchable,
						  value,
						  isDisabled,
						  handleChange,
						  defaultValue
					  }) => {
	return (
		<>
			<Select
				placeholder={placeholder}
				isSearchable
				defaultValue={defaultValue}
				value={value}
				getOptionLabel={option => (isFunction(optionLabel) ? optionLabel(option) : option[optionLabel])}
				getOptionValue={option => (isFunction(optionValue) ? optionValue(option) : option[optionValue])}
				// value={selectedOption}
				components={{
					IndicatorSeparator: () => null,
					DropdownIndicator
				}}
				onChange={(option) => handleChange(option)}
				styles={{
					dropdownIndicator: (base, state) => ({
						...base,
						transition: "transform .3s ease",
						transform:
							state.selectProps.menuIsOpen && "rotate(180deg)"
					}),
					menu: (base, state) => ({
						...base,
						height: state.selectProps.menuIsOpen ? "auto" : "0",
						transition: "all .6s ease",
						opacity: state.selectProps.menuIsOpen ? 1 : 0
					})
				}}
				isDisabled={isDisabled}
				options={options}
				classNamePrefix={className.classNamePrefix}
				className={className.classNamePrefix}
			/>
		</>
	);
};

CustomSelect.defaultProps = {
	isSearchable: true,
	DropdownIndicator,
	// options,
	value: null,
	isDisabled: false,
	handleChange: () => {
	},
	className: {
		classNamePrefix: "react-select",
		className: "react-select-container"
	},
	// defaultValue: options[0],
	placeholder: "Select"
};
CustomSelect.propTypes = {
	DropdownIndicator: PropTypes.func,
	handleChange: PropTypes.func,
	options: PropTypes.array,
	className: PropTypes.object,
	placeholder: PropTypes.string
};

export default CustomSelect;
