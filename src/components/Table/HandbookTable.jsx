import React from "react";
import { get } from "lodash";

import { constants, time } from "services";

import { ServiceToolTip, Audio, ButtonDownload } from "components";
import { ReactComponent as OffPhone } from "assets/images/svg/fi_phone-missed.svg";
import { useSelector } from "react-redux";

const HandbookTable = ({ tableData = [], name }) => {
	const user = useSelector(state => state.auth.user);

	return (
		<>
			<table className="content-table">
				<thead>
					<tr>
						<th>ID</th>
						{/*<th>Имя</th>*/}
						<th>Оператор</th>
						<th>Адрес</th>
						<th>Услуги</th>
						{/*<th>Телефон Номер</th>*/}
						<th>Комментарий</th>
						<th>Дата</th>
						<th />
					</tr>
				</thead>

				<tbody>
					{tableData.map((item, i) => {
						return (
							<tr key={i}>
								<td>{get(item, "id")}</td>
								{/*<td>{get(item, "customer.name")}</td>*/}
								<td>
									<span className="table-num">
										{get(
											item,
											"operator.operator_number",
											""
										)}
									</span>
								</td>
								<td>{`${get(
									item,
									"customer.region.name",
									""
								)} ${get(
									item,
									"customer.district.name",
									""
								)}`}</td>

								<td>
									<ServiceToolTip
										innerText={get(
											item,
											"services.length",
											0
										)}
										data={get(item, "services")}
										dataKey="name.uz"
									/>
								</td>
								{/*<td>{get(item, "customer.phone")}</td>*/}
								<td>{get(item, "comment", "")}</td>
								<td>
									{time.to(
										get(item, "created_at"),
										"DD.MM.YYYY HH:mm:ss"
									)}
								</td>

								<td>
									<div className="d-flex">
										{get(item, "status") === 3 && (
											<OffPhone className="mr_20" />
										)}
										{get(item, "status") === 2 && (
											<Audio
												source={get(item, "src")}
												className="mr_20"
											/>
										)}
										{(get(user, "role") ===
											constants.ROLE_ADMIN ||
											get(user, "role") ===
												constants.ROLE_MANAGER) &&
											get(item, "status") === 2 && (
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
		</>
	);
};

export default HandbookTable;
