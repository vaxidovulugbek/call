import React from "react";

// import { Button } from "components/index";

export const NoData = () => {
	return (
		<div className="table-no-data">
			<div className="d-flex align-items-center table-no-data__inner">
				<div className="table-no-data__left">
					<h3 className="table-no-data__title">
						No records found.
					</h3>
					{/*<p className="color_transparent">*/}
					{/*	Create a report to find our more about this project.*/}
					{/*</p>*/}
				</div>
				{/*<div className="table-no-data__right">*/}
				{/*	<Button className="btn_bg-blue btn_form " text="Create" />*/}
				{/*</div>*/}
			</div>
		</div>
	);
};
