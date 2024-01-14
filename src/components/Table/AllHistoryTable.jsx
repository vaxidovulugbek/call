import React from "react";
import { useSelector } from "react-redux";
import { get } from "lodash";

import { constants, helpers, time } from "services";

import { ButtonDownload, ServiceToolTip } from "components";
import { Audio } from "components";

import { ReactComponent as CallIcon } from "assets/images/svg/tel.svg";

const AllHistoryTable = ({ tableData }) => {
	const user = useSelector(state => state.auth.user);

	return (
		<table className="content-table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Имя</th>
					<th>Оператор</th>
					<th>Подключенный номер</th>
					<th>Адрес</th>
					<th>Услуги</th>
					<th style={{ width: "165px" }}>Телефон Номер</th>
					<th>Комментарий</th>
					<th>Дата</th>
					<th>Длительность</th>
					<th />
				</tr>
			</thead>

			<tbody>
				{tableData.map((item, i) => {
					const {
						id,
						created_at,
						services,
						customer,
						phone,
						operator,
						comment,
						connected_number,
						duration
					} = item;

					return (
						<tr key={i}>
							<td>{id}</td>
							<td>{get(customer, "name")}</td>
							<td>
								<span className="table-num">
									{get(operator, "operator_number", "")}
								</span>
							</td>

							<td>{connected_number}</td>

							<td>{`${get(customer, "region.name", "")} ${get(
								customer,
								"district.name",
								""
							)}`}</td>

							<td>
								<ServiceToolTip
									innerText={get(services, "length", 0)}
									data={services}
									dataKey="name.uz"
								/>
							</td>
							<td>{phone}</td>
							<td>{comment}</td>
							<td>{time.to(created_at, "DD.MM.YYYY HH:mm")}</td>

							<td>{helpers.formatSeconds(duration)}</td>

							<td>
								<div className="d-flex align-items-center">
									<Audio
										source={get(item, "src")}
										className="mr_20"
									/>

									<button
										className="content-table__call mr_20"
										onClick={() =>
											window.handleOpen({
												phone: get(
													customer,
													"phone",
													""
												),
												call_history_id: id
											})
										}>
										<CallIcon />
									</button>

									{(get(user, "role") ===
										constants.ROLE_ADMIN ||
										get(user, "role") ===
											constants.ROLE_MANAGER) && (
										<ButtonDownload
											link={get(item, "src")}
										/>
									)}
								</div>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default AllHistoryTable;
