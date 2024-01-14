import React, { Component } from "react";

import cx from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./style.scss";

export class Button extends Component {
	static propTypes = {
		style: PropTypes.oneOf(["solid", "outline"]),
		type: PropTypes.oneOf(["primary", "secondary"]),
		borderRadius: PropTypes.number,
		size: PropTypes.oneOf(["lg", "sm", "xs", "md"]),
		disabled: PropTypes.bool,
		className: PropTypes.string,
		as: PropTypes.oneOf(["link", "button"]),
		htmlType: PropTypes.oneOf(["button", "submit"]),
		loading: PropTypes.bool
	};

	static defaultProps = {
		style: "solid",
		type: "primary",
		size: "md",
		disabled: false,
		className: "",
		as: "button",
		htmlType: "button",
		loading: false
	};

	render() {
		const {
			className,
			style,
			type,
			size,
			as,
			disabled,
			borderRadius,
			loading,
			htmlType,
			...props
		} = this.props;

		const classNames = cx(
			"btn",
			className,
			// size && `btn-${size}`,
			// style && `btn-${style}`,
			// loading && `loading`,
			type && type
		);

		return as === "button" ? (
			<button
				type={ htmlType }
				style={{ borderRadius: `${borderRadius}px` }}
				className={classNames}
				disabled={disabled}
				{...props}>
				{this.props.children}
			</button>
		) : (
			<Link className={classNames} {...props}>
				{this.props.children}
			</Link>
		);
	}
}
