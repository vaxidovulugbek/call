import React from "react";

import PropTypes from "prop-types";
import cx from 'classnames';
import InputMask from "react-input-mask";
import { useTranslation } from "react-i18next";

import '../style.scss'


const PhoneMusk = ({ className, label, placeholder, disabled, type, mask, field, form: { touched, errors }, ...props }) => {
    const { t } = useTranslation();
    const classes = cx(
        'form-group',
        touched[field.name] && errors[field.name] && 'has-error',
        field.value && 'label-top',
        className
    );
    return (
        <div className={classes}>
            {label && (
                <label className="form-label form-label--sm">{label}</label>
            )}
            <InputMask
                className="form-input"
                mask={mask}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                formatChars={{
                    '9': '[0-9]',
                    'A': '[A-Z]'
                }}
                {...props}
                {...field}
            />
            {touched[field.name] && errors[field.name] && (
                <small className="form-error">{t(errors[field.name])}</small>
            )}
        </div>
    );
};

PhoneMusk.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(["text", "password"]),
    className: PropTypes.string,
    mask: PropTypes.string,
    disabled: PropTypes.bool
};

PhoneMusk.defaultProps = {
    label: "",
    placeholder: "",
    type: "text",
    className: null,
    mask: "+\\9\\9\\8 (99) 999 99 99",
    disabled: false,
    permanents: [1, 4],
    alwaysShowMask: true,
};

export default PhoneMusk;

