import React from "react";
import { useTranslation } from "react-i18next";
import { isFunction, get } from "lodash";
import PropTypes from "prop-types";
import cx from "classnames";

import "../style.scss";

const TextInput = ({
					   className,
					   containerClassName,
					   placeholder,
					   disabled,
					   type,
					   inputClassName,
					   mask,
					   field,
					   form: { touched, errors },
					   ...props
				   }) => {
	const { t } = useTranslation();
	const classes = cx(
		"tm-input",
		touched[field.name] && errors[field.name] && "error",
		className
	);
	const classesWrap = cx(
		"form-group",
		containerClassName,
		disabled && "is-disable"
	);


	return (
		<div className={classesWrap}>
			<input
				className={classes}
				{...{ placeholder, type }}
				{...field}
				{...props}
				onBlur={(event) => {
					isFunction(get(field, "onBlur")) && field.onBlur(event);
					isFunction(get(props, "onBlur")) && props.onBlur(event);
				}}
				disabled={disabled}
			/>
			{touched[field.name] && errors[field.name] && (
				<small className="form-error">{t(errors[field.name])}</small>
			)}
		</div>
	);
};

TextInput.propTypes = {
	label: PropTypes.string,
	type: PropTypes.oneOf(["text", "password"]),
	className: PropTypes.string,
	placeholder: PropTypes.string
};

TextInput.defaultProps = {
	label: "",
	placeholder: "",
	type: "text",
	className: null
};

export default TextInput;
