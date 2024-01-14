import React, { useState } from "react";
import * as moment from "moment";
import { get } from "lodash";

import EntityContainer from "modules/entity/containers";
import { AppTable } from "components";
import { constants } from "services";

const Operator = () => {
	const [totalAtWork, setTotalAtWork] = useState(0);

	return (
		<section className="main">
			<div className="row g-4">
				<div className="col-12">
					<div className="main-card">

						<div className="main-top">
							<div className="main-title">At work: {totalAtWork}</div>
						</div>


						<div className="main-body row">
							<div className="col-8">
								<EntityContainer.All entity="organizations" url="/statistics/user-status"
													 name="organization-work-connected" params={
									{
										include: "callHistory,callHistory.customer",
										filter: {
											type: constants.TYPE_AT_WORK,
											connected: constants.CONNECTED_TRUE
										}
									}
								}
													 onSuccess={(response) => setTotalAtWork(prev => prev + get(response, "data.length"))}

								>
									{({ items }) => (
										<>
											<div className="main-bottom">
												<h3 className="table-title">Busy: {get(items, "length")}</h3>

												<AppTable
													className="table-td-blue"
													columns={[{
														title: "Number",
														dataKey: "operator_number",
														render: value => value
													},
														{
															title: "Full name",
															dataKey: "username",
															render: value => value
														},

														{
															title: "Client number",
															dataKey: "callHistory",
															render: value => get(value, "phone")
														},

														{
															title: "Client name",
															dataKey: "callHistory",
															render: value => get(value, "customer.name", "Новый клиент")
														},

														{
															title: "Started at",
															dataKey: "callHistory",
															render: value => moment.unix(get(value, "created_at")).format("HH:mm:ss")
														}

													]
													}


													items={items} />
											</div>
										</>
									)}
								</EntityContainer.All>
							</div>

							<div className="col-4">
								<EntityContainer.All entity="organizations" url="/statistics/user-status"
													 name="organization-work-connected" params={
									{
										filter: {
											type: constants.TYPE_AT_WORK,
											connected: constants.CONNECTED_FALSE
										}
									}

								}
													 onSuccess={(response) => {

														 setTotalAtWork(prev => prev + get(response, "data.length"));

													 }}
								>
									{({ items }) => (
										<>
											<div className="main-bottom">
												<h3 className="table-title">Free: {get(items, "length")}</h3>


												<AppTable
													className="table-td-blue"
													columns={[{
														title: "Number",
														dataKey: "operator_number",
														render: value => value
													},
														{
															title: "Full name",
															dataKey: "username",
															render: value => value
														},
														{
															title: "Minutes",
															dataKey: "lastStatus",
															render: value =>
																moment().subtract(moment.duration(moment.unix(get(value, "start_at")).format("HH:mm:ss"))).format("HH:mm:ss")
														}
													]
													}


													items={items} />
											</div>
										</>
									)}
								</EntityContainer.All>
							</div>
						</div>
					</div>


				</div>

				<div className="col-4">
					<div className="main-card">
						<EntityContainer.All
							entity="operators"
							name="operator-coffee-break"
							url="/statistics/user-status"
							params={{
								filter: {
									type: [constants.TYPE_COFFEE_BREAK]
								}
							}}>
							{({ items }) =>
								<>
									<div className="main-top">
										<div className="main-title">Coffee Break: {get(items, "length", 0)}</div>
									</div>

									<div className="main-bottom">
										<AppTable
											className="table-td-blue"
											columns={[{
												title: "Number",
												dataKey: "operator_number",
												render: value => value
											},
												{
													title: "Full name",
													dataKey: "username",
													render: value => value
												},
												{
													title: "Minutes",
													dataKey: "lastStatus",
													render: value =>
														moment().subtract(moment.duration(moment.unix(get(value, "start_at")).format("HH:mm:ss"))).format("HH:mm:ss")
												}
											]
											}


											items={items} />
									</div>
								</>
							}
						</EntityContainer.All>
					</div>
				</div>

				<div className="col-4">
					<div className="main-card">
						<EntityContainer.All
							entity="operators"
							name="operator-at-lunch"
							url="/statistics/user-status"
							params={{
								filter: {
									type: constants.TYPE_AT_LUNCH
								}
							}}>
							{({ items }) =>
								<>
									<div className="main-top">
										<div className="main-title">At lunch: {get(items, "length", 0)}</div>
									</div>

									<div className="main-bottom">
										<AppTable
											className="table-td-blue"
											columns={[{
												title: "Number",
												dataKey: "operator_number",
												render: value => value
											},
												{
													title: "Full name",
													dataKey: "username",
													render: value => value
												},
												{
													title: "Minutes",
													dataKey: "lastStatus",
													render: value =>
														moment().subtract(moment.duration(moment.unix(get(value, "start_at")).format("HH:mm:ss"))).format("HH:mm:ss")

												}
											]
											}


											items={items} />
									</div>
								</>
							}
						</EntityContainer.All>
					</div>
				</div>

				<div className="col-4">
					<div className="main-card">
						<EntityContainer.All
							entity="operators"
							name="operator-not-working"
							url="/statistics/user-status"
							params={{
								filter: {
									type: [constants.TYPE_NOT_WORKING]
								}
							}}>
							{({ items }) =>
								<>
									<div className="main-top">
										<div className="main-title">Not At Work: {get(items, "length", 0)}</div>
									</div>

									<div className="main-bottom">
										<AppTable
											className="table-td-blue"
											columns={[{
												title: "Number",
												dataKey: "operator_number",
												render: value => value
											},
												{
													title: "Full name",
													dataKey: "username",
													render: value => value
												},
												{
													title: "Minutes",
													dataKey: "lastStatus",
													render: value => moment().subtract(moment.duration(moment.unix(get(value, "start_at")).format("HH:mm:ss"))).format("HH:mm:ss")
												}
											]
											}


											items={items} />
									</div>
								</>
							}
						</EntityContainer.All>
					</div>
				</div>

			</div>
		</section>


	);
};


export default Operator;