import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { components } from "react-select";
import AsyncPaginate from "react-select-async-paginate";
import get from "lodash/get";

import { api, queryBuilder } from "services";
import { ReactComponent as FiChevron } from "assets/images/svg/fi_chevron-down.svg";

const DropdownIndicator = props => {
	return (
		<components.DropdownIndicator {...props}>
			<FiChevron />
		</components.DropdownIndicator>
	);
};

const load = async (
	search,
	prevOptions,
	{ page },
	url,
	filterParams,
	loadOptionParams,
	loadOptionsKey,
	initialValue
) => {
	const { data } = await api.request.get(
		queryBuilder(url, {
			page,
			filter: filterParams(search),
			...loadOptionParams(search)
		})
	);

	return {
		options: loadOptionsKey
			? typeof loadOptionsKey === "function"
				? [...initialValue,...loadOptionsKey(data)]
				: [...initialValue,...get(data, loadOptionsKey, [])]
			: data,
		hasMore:
			get(data, "_meta.currentPage", 1) < get(data, "_meta.pageCount", 1),
		additional: { page: get(data, "_meta.currentPage", 1) + 1 }
	};
};

const AsyncSelect = ({
	disableOptions,
	className,
	onChange = () => {},
	label,
	initialValue = [],
	isMulti,
	loadOptionsKey,
	placeholder,
	options,
	field,
	optionLabel,
	key,
	optionValue,
	form: { errors, setFieldValue, setFieldTouched, touched },
	isSearchable,
	menuPlacement,
	loadOptionsUrl,
	loadOptionsParams = {},
	filterParams = () => ({}),
	setRegionId=() => {}
}) => {



	const classNames = cx(
		"field-container",
		touched[field.name] && errors[field.name] && "has-error",
		className
	);

	const handleChange = option => {
		setFieldValue(field.name, option);
		setRegionId(option.id)
		onChange(option)
	};
	return (
		<div className={classNames}>
			<div>
				{label && <div>{label}</div>}
				<AsyncPaginate
				    key={key}
					classNamePrefix="modal-select"
					id={field.name}
					name={field.name}
					debounceTimeout={300}
					onChange={handleChange}
					onBlur={() => setFieldTouched(field.name, true)}
					getValue={option => option[optionValue]}
					getOptionLabel={option =>
						typeof optionLabel === "function"
							? optionLabel(option)
							: option[optionLabel]
					}
					getOptionValue={option =>
						typeof optionValue === "function"
							? optionValue(option)
							: option[optionValue]
					}
					value={field.value}
					components={{
						IndicatorSeparator: () => null,
						DropdownIndicator
					}}
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
					additional={{ page: 1 }}
					loadOptions={(search, prevOptions, { page }) =>
						load(
							search,
							prevOptions,
							{ page },
							loadOptionsUrl,
							filterParams,
							loadOptionsParams,
							loadOptionsKey,
							initialValue
							
						)
					}
					isOptionDisabled={option =>
						disableOptions
							.reduce((prev, curr) => [...prev, curr.id], [])
							.includes(option.id)
					}
					{...{
						isMulti,
						options,
						placeholder,
						isSearchable,
						menuPlacement
					}}
					closeMenuOnSelect={!isMulti}
				/>
				{touched[field.name] && errors[field.name] && (
					<small className="form-error">{errors[field.name]}</small>
				)}
			</div>
		</div>
	);
};

AsyncSelect.propTypes = {
	title: PropTypes.string.isRequired,
	className: PropTypes.string,
	optionValue: PropTypes.string,
	optionLabel: PropTypes.string,
	isSearchable: PropTypes.bool,
	menuPlacement: PropTypes.string,
	loadOptionsKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
		.isRequired
};

AsyncSelect.defaultProps = {
	title: "",
	className: null,
	optionValue: "id",
	optionLabel: "title",
	isSearchable: false,
	menuPlacement: "bottom",
	disableOptions: [],
	loadOptionsKey: "data",
	placeholder: ""
};

export default AsyncSelect;
