import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
// import { get, values } from "lodash";
import { get } from "lodash";
import { SearchContext } from "context/SearchContext";
import actions from "modules/entity/actions";
import { channelOptions, genderOptions } from "services/helpers";

import EntityContainer from "modules/entity/containers";
import { Fields, Tables } from "components";
import { LoadMoreVisible } from "components";

const CustomerView = () => {
	let channelOption = null;
	let mergedChannel = [{ id: null, name: "Все" }];
	const [serviceValue, setServiceValue] = useState(mergedChannel);
	const { customerId } = useParams();

	const modalTrigger = useSelector(state => get(state, "modal.refetch"));
	const dispatch = useDispatch();

	const [historyState, setHistoryState] = useState();
	// const [IsFetched, setIsFetched] = useState(false);
	const [setIsFetched] = useState(false);
	const [services, setServices] = useState();
	const [page, setPage] = useState(1);
	const [refetch, setRefetch] = useState(1);

	const { isOpen, handleOpen, setCustomerId } = useContext(SearchContext);

	if (services) {
		channelOption = services.map(s => {
			return { id: s.id, name: s.name };
		});

		mergedChannel = [...mergedChannel, ...channelOption];
	}

	window.callReceived = () => {
		setRefetch(refetch + 1);
	};

	useEffect(() => {
		dispatch(
			actions.LoadDefault.request({
				url: `customer/${customerId}`,
				params: {
					include: "district,region,customer,source",
					extra: {
						service_id: get(serviceValue, "id")
					}
				},
				cb: {
					success: data => {
						setIsFetched(true);
						setHistoryState(get(data, "data"));
					},
					error: err => {
						setIsFetched(true);
					}
				}
			})
		);
	}, [serviceValue, modalTrigger, isOpen, refetch]);

	useEffect(() => {
		dispatch(
			actions.LoadDefault.request({
				url: `service`,
				cb: {
					success: data => {
						setIsFetched(true);
						setServices(get(data, "data"));
					},
					error: err => {
						setIsFetched(true);
					}
				}
			})
		);
	}, [modalTrigger, refetch]);

	const handleChange = value => {
		setServiceValue(value);
	};

	const handleOpenModal = e => {
		e.preventDefault();
		handleOpen();
		setCustomerId(customerId);
	};

	return (
		<EntityContainer.All
			entity={`customerView_${customerId}`}
			name={`customerView_${customerId}`}
			url={`/customer/${customerId}/history`}
			params={{
				include: "services,customer.region,customer.district,operator",
				page,
				filter: {
					service_ids: get(serviceValue, "id"),
					modalTrigger,
					isOpen,
					refetch
				}
			}}
			metaKey={data => {
				return get(data, "meta");
			}}
			appendData={true}>
			{({ items, isFetched, meta }) => {
				return (
					<>
						<section className="main look sec-padding">
							<form className="main-form" action="#!">
								<div className="main-date" />

								<div
									className="row"
									style={{ height: "100vh" }}>
									<div
										className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"
										style={{ overflowX: "hidden" }}>
										<div className="main-card">
											<div className="main-top">
												<div className="main-title">
													{historyState &&
														historyState.phone}
													<button
														className="update-btn"
														onClick={
															handleOpenModal
														}>
														Изменить
													</button>
												</div>
											</div>
											<div
												className="main-bottom"
												style={{ overflow: "visible" }}>
												<div className="row">
													<label className="caller-label col-4">
														<div className="caller-name">
															Имя
														</div>
														<input
															type="text"
															className="caller-control handbook"
															placeholder="Имя"
															disabled={
																!!historyState
															}
															value={get(
																historyState,
																"name"
															)}
														/>
													</label>
													<div className="col-2">
														<label className="input__wrapper select__wrapper caller-wrapper">
															<div className="caller-name">
																Пол
															</div>
															<Fields.CustomSelect
																options={
																	genderOptions
																}
																value={genderOptions.find(
																	item =>
																		item.value ===
																		get(
																			historyState,
																			"gender"
																		)
																)}
																optionLabel="label"
																isDisabled={
																	true
																}
																placeholder="Пол"
																className={{
																	className:
																		"table-select-container",
																	classNamePrefix:
																		"table-select"
																}}
															/>
														</label>
													</div>

													<div className="col-2">
														<label className="input__wrapper select__wrapper caller-wrapper">
															<div className="caller-name">
																Услуги
															</div>
															<Fields.CustomSelect
																placeholder=""
																options={
																	mergedChannel
																		? mergedChannel
																		: channelOptions
																}
																defaultValue={
																	mergedChannel[0]
																}
																handleChange={
																	handleChange
																}
																optionLabel={option =>
																	get(
																		option,
																		"name.uz"
																	)
																}
																optionValue="id"
																value={
																	serviceValue
																}
																className={{
																	className:
																		"table-select-container",
																	classNamePrefix:
																		"table-select"
																}}
															/>
														</label>
													</div>
												</div>

												<div className="table">
													{historyState && (
														<Tables.HandbookTable
															tableData={items}
														/>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>
						</section>
						{isFetched &&
							get(meta, "currentPage") <
								get(meta, "pageCount") && (
								<LoadMoreVisible
									setPage={() => setPage(page + 1)}
								/>
							)}
					</>
				);
			}}
		</EntityContainer.All>
	);
};

export default CustomerView;
