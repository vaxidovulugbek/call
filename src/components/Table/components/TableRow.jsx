import React from "react";
import { get, isFunction } from "lodash";
import cn from "classnames";

// import { Button } from "components/index";

import { ReactComponent as EditIcon } from "assets/images/svg/edit.svg";
import { ReactComponent as DeleteIcon } from "assets/images/svg/delete.svg";

export const TableRow = ({
	row,
	columns,
	deleteAction,
	editAction,
	onRowClick,
	renderButtons
}) => {
	return (
		<tr
			className={cn("main-table-tr", { cursor_pointer: onRowClick })}
			onClick={() => {
				onRowClick && onRowClick(row);
			}}>
			{columns.map((col, innerIndex) => {
				return (
					<td
						key={innerIndex}
						className={`table__td ${get(col, "className", "")}`}>
						{col.render(row[col.dataKey], row)}
					</td>
				);
			})}

			{(editAction || deleteAction || renderButtons) && (
				<td className="table__td">
					<div className="d-flex align-items-center justify-content-end">
						{isFunction(renderButtons) && renderButtons(row)}

						{isFunction(editAction) && (
							<button
								className="cursor_pointer mr_10"
								onClick={() => editAction(row)}>
								<EditIcon />
							</button>
						)}

						{isFunction(deleteAction) && (
							<buton
								className="cursor_pointer"
								onClick={() => deleteAction(row)}>
								<DeleteIcon />
							</buton>
						)}
					</div>
				</td>
			)}
		</tr>
	);
};
