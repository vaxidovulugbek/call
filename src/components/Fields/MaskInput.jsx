import React from "react";

import PropTypes from "prop-types";
import cx from "classnames";
import InputMask from "react-input-mask";
import { useTranslation } from "react-i18next";
import { get, isFunction } from "lodash";

const MaskInput = ({
					   className,
					   label,
					   placeholder,
					   disabled,
					   type,
					   mask,
					   field,
					   form: { touched, errors },
					   ...props
				   }) => {
	const { t } = useTranslation();
	const classes = cx(
		"form-group",
		touched[field.name] && errors[field.name] && "has-error",
		field.value && "label-top",
		className
	);
	return (
		<>
			<div className={classes}>
				{label && (
					<label className="form-label form-label--sm">{label}</label>
				)}
				<InputMask
					// className="form-input"
					mask={mask}
					placeholder={placeholder}
					type={type}
					disabled={disabled}
					formatChars={{
						"9": "[0-9]",
						"A": "[A-Z]",
						"n": '[0-1]',
						"m": '[0-9]',
						"e": '[0-3]',
						"d": '[0-9]',
						"z": '[1-2]',
						"y": '[0-9]'
					}}
					{...props}
					{...field}
					onBlur={(event) => {
						isFunction(get(field, "onBlur")) && field.onBlur(event);
						isFunction(get(props, "onBlur")) && props.onBlur(event);
					}}
				/>
			</div>
			{touched[field.name] && errors[field.name] && (
				<small className="form-error">{t(errors[field.name])}</small>
			)}
		</>
	);
};

MaskInput.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.oneOf(["text", "password"]),
	className: PropTypes.string,
	mask: PropTypes.string,
	disabled: PropTypes.bool
};

MaskInput.defaultProps = {
	label: "",
	placeholder: "",
	type: "text",
	className: null,
	mask: "+999999999999",
	disabled: false
};

export default MaskInput;

