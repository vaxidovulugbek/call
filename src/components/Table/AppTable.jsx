import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { Spinner } from "components";
import { Head } from "./components/Head";
import { TableRow } from "./components/TableRow";
import { NoData } from "./components/NoData";


export const AppTable = ({
						  className = "",
						  isLoading,
						  rowKey = "id",
						  columns = [],
						  items = [],
						  deleteAction,
						  editAction,
						  onRowClick,
						  emptyUi,
						  renderButtons
					  }) => {
	const classNames = cn("content-table", className);


	return (
		<table className={classNames}>
			<Head
				columns={columns}
				deleteAction={deleteAction}
				editAction={editAction}
				renderButtons={renderButtons}
			/>

			<tbody>
			{isLoading ? (
				<tr>
					<td colSpan="100%">
						<Spinner className="table-spinner" />
					</td>
				</tr>
			) : !items.length ? (
				<tr>
					<td colSpan="100%">
						<NoData />
					</td>
				</tr>
			) : (
				items.map((row, index) => (
					<TableRow
						key={row[rowKey]}
						row={row}
						columns={columns}
						deleteAction={deleteAction}
						editAction={editAction}
						onRowClick={onRowClick}
						renderButtons={renderButtons}
					/>
				))
			)}
			</tbody>
		</table>
	);
};

AppTable.propTypes = {
	className: PropTypes.string,
	rowKey: PropTypes.string,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			dataKey: PropTypes.string,
			className: PropTypes.string,
			render: PropTypes.func,
			onHeadClick: PropTypes.func
		})
	),
	items: PropTypes.array,
	deleteAction: PropTypes.func,
	editAction: PropTypes.func,
	emptyUi: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	onRowClick: PropTypes.func,
	renderButtons: PropTypes.func
};
