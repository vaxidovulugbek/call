import React, { useState } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import { Fields, LoadMoreVisible } from "components";
import EntityContainer from "modules/entity/containers";
import { useEffect } from "react";
import { time } from "services";

const Patients = ({
	// tableData,
	isCheckBox,
	// tableHead,
	searchText,
	tableClassName = "",
	handleChange,
	filter = {},
	isPage = false,
	chosenCustomers = []
}) => {
	const history = useHistory();
	const modalTrigger = useSelector(state => get(state, "modal.refetch"));
	const [page, setPage] = useState(1);
	const handleClick = id => {
		history.push(`/customer/${id}`);
	};
	const [appendData, setAppendData] = useState(true);

	function loadMore(e, meta, isFetched) {
		setAppendData(true);
		const items = document.getElementsByClassName("content-table");
		if (items.length > 0) {
			const last = items[items.length - 1];
			const is_bottom =
				e.target.getBoundingClientRect().bottom + 50 >=
				last.getBoundingClientRect().bottom;
			if (
				is_bottom &&
				get(meta, "currentPage") < get(meta, "pageCount") &&
				isFetched
			) {
				setPage(page + 1);
			}
		}
	}

	useEffect(() => {
		setPage(1);
		setAppendData(false);
	}, [modalTrigger]);

	return (
		<EntityContainer.All
			entity="customerList"
			name="customerList"
			url={`/customer`}
			params={{
				include: "district.region,region,source",
				page,
				filter: {
					...filter,
					name: searchText
				},
				limit: isPage ? 15 : 10,
				modalTrigger
			}}
			metaKey={data => {
				return get(data, "meta");
			}}
			appendData={appendData}>
			{({ items, meta, isFetched }) => {
				items.sort((a, b) => b.id - a.id);
				return (
					<div
						className="table-container"
						onScroll={e => loadMore(e, meta, isFetched)}>
						<table className={`content-table ${tableClassName}`}>
							<thead>
								<tr>
									{isCheckBox && <th />}
									<th>ID</th>
									<th>Имя</th>
									<th>Адрес</th>
									<th>Источник</th>
									<th>Телефон Номер</th>
									<th>Дата</th>
								</tr>
							</thead>

							<tbody className="tbody">
								{items.map((item, i) => {
									const {
										id,
										region,
										district,
										source,
										phone,
										created_at
									} = item;
									return (
										<tr
											key={i}
											onClick={() => handleClick(id)}
											className="patient-tr">
											{isCheckBox && (
												<td>
													<Fields.CheckBox
														onChange={(
															event,
															prevValue
														) =>
															handleChange(
																item,
																prevValue
															)
														}
														defaultChecked={
															chosenCustomers.findIndex(
																item =>
																	item.id ===
																	id
															) > -1
														}
													/>
												</td>
											)}
											<td>{id}</td>
											<td>{get(item, "name", "")}</td>
											<td>
												{`${get(
													region,
													"name",
													""
												)} ${get(
													district,
													"name",
													""
												)}`}
											</td>
											<td>
												{get(source, "name.uz", "")}
											</td>
											<td>{phone}</td>
											<td>
												{time.to(
													created_at,
													"DD.MM.YYYY"
												)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						{isFetched &&
							isPage &&
							get(meta, "currentPage") <
								get(meta, "pageCount") && (
								<LoadMoreVisible
									setPage={() => {
										setAppendData(true);
										setPage(page + 1);
									}}
								/>
							)}
					</div>
				);
			}}
		</EntityContainer.All>
	);
};

Patients.defaultProps = {
	tableData: [],
	tableHead: [],
	searchText: ""
};

Patients.propTypes = {
	tableData: PropTypes.array.isRequired
};

export default Patients;
