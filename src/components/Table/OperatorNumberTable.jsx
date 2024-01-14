import React from "react";

import { ReactComponent as EditIcon } from "assets/images/svg/edit.svg";
import { ReactComponent as DeleteIcon } from "assets/images/svg/delete.svg";

const OperatorNumberTable = ({ tableData, onDelete, onEdit }) => {
	return (
		<table className="content-table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Имя</th>
					<th>Подключенный номер</th>
					<th />
				</tr>
			</thead>

			<tbody>
				{tableData.map((item, i) => {
					const { id, name, number } = item;

					return (
						<tr key={i}>
							<td>{id}</td>
							<td>{name}</td>
							<td>{number}</td>
							<td>
								<div className="d-flex align-items-center justify-content-end">
									<button
										onClick={() => onEdit(item)}
										className="mr_10">
										<EditIcon />
									</button>
									<button onClick={() => onDelete(item)}>
										<DeleteIcon />
									</button>
								</div>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default OperatorNumberTable;
