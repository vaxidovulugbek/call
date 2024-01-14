import React from "react";
import Select, { components } from "react-select";
import PropTypes from "prop-types";
import { isFunction } from "lodash";

import "components/Fields/Select/Select.css";
import { ReactComponent as FiChevron } from "assets/images/svg/fi_chevron-down.svg";

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
	defaultValue,
	value,
	field,
	form: { errors, setFieldValue, setFieldTouched, touched },
	className,
	placeholder,
	disabled,
}) => {
	// const selectValue = value ? { value } : {}


	return (
		<>
			<Select
				placeholder={placeholder}
				isSearchable
				getOptionLabel={option => (isFunction(optionLabel) ? optionLabel(option) : option[optionLabel])}
				getOptionValue={option => (isFunction(optionValue) ? optionValue(option) : option[optionValue])}
				defaultValue={defaultValue}
				value={field.value}
				// {...selectValue}
				components={{
					IndicatorSeparator: () => null,
					DropdownIndicator
				}}
				isDisabled={disabled}
				styles={{
					dropdownIndicator: (base, state) => ({
						...base,
						transition: "transform .3s ease",
						transform:
							state.selectProps.menuIsOpen && "rotate(180deg)"
					})
				}}
				onChange={e => {
					setFieldValue(field.name, e);
				}}
				onBlur={() => setFieldTouched(field.name, true)}
				options={options}
				classNamePrefix={className.classNamePrefix}
				className={className.classNamePrefix}

			/>
			{touched[field.name] && errors[field.name] && (
				<small className="form-error">{errors[field.name]}</small>
			)}
		</>
	);
};

CustomSelect.defaultProps = {
	DropdownIndicator,
	options: [],
	className: {
		classNamePrefix: "react-select",
		className: "react-select-container"
	},
	// placeholder: "Client name"
};
CustomSelect.propTypes = {
	DropdownIndicator: PropTypes.func,
	options: PropTypes.array,
	className: PropTypes.object,
	placeholder: PropTypes.string
};

export default CustomSelect;
