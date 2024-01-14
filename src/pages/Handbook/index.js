import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { Field } from "formik";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { constants, time } from "services";

import EntityForm from "modules/entity/forms";
import { Tables, Fields, ButtonExport } from "components";
import EntityContainer from "modules/entity/containers";
import { LoadMoreVisible } from "components";
// import { genderOptions } from "services/helpers";

const AllHistory = () => {
	const location = useLocation();

	const [filter, setFilter] = useState({
		phone: get(location, "state.phone"),
		status: [2, 4]
	});
	const modalTrigger = useSelector(state => get(state, "modal.refetch"));
	const [dateRange, setDateRange] = useState(time.getThisMonth());
	const [appendData, setAppendData] = useState(true);

	const handleSubmit = (values = {}) => {
		const filterObj = {};
		Object.keys(values).forEach(key => {
			if (typeof values[key] === "object" && key === "connected_number") {
				if ("value" in values[key]) filterObj[key] = values[key].value;
				else filterObj[key] = values[key].number;
			} else if (typeof values[key] === "object")
				filterObj[key] = values[key].id;
			else filterObj[key] = values[key];
		});

		setFilter(filterObj);
	};

	const handleReset = formReset => {
		setFilter({});
		formReset();
	};

	useEffect(() => {
		setPage(1);
		setAppendData(false);
	}, [modalTrigger]);

	const [page, setPage] = useState(1);

	return (
		<section className="main look customer sec-padding">
			<div className="main-form" onSubmit={e => e.preventDefault()}>
				<div className="main-date" />
				<div className="row">
					<div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
						<div className="main-card">
							<div className="main-top">
								<div className="flex-main mb-30">
									<div className="main-title">
										История Звонков
									</div>

									<div className="flex-main">
										<div className="main-calendar">
											<div className="main-date">
												<Fields.RangeDatePicker
													{...{
														dateRange,
														setDateRange
													}}
												/>
											</div>
										</div>
										<ButtonExport
											range={time.getRange(
												dateRange[0],
												dateRange[1]
											)}
											url="export/call-history"
											style={{ marginLeft: "20px" }}
										/>
									</div>
								</div>
								<EntityForm.Main
									entity="filter"
									name="filter"
									method="get"
									className="row flex-100 justify-content-between"
									asFilter={handleSubmit}
									fields={[
										{
											name: "name"
										},
										{
											name: "operator_id"
										},
										{
											name: "region_id"
										},
										{
											name: "connected_number"
										},
										{
											name: "status"
										}
									]}>
									{({ handleReset: formReset }) => {
										return (
											<>
												<div className="col h-fit-content">
													<label className="caller-label">
														<Field
															component={
																Fields.TextInput
															}
															// disabled={!!formData}
															placeholder="Имя"
															name="name"
															type="text"
															size="large"
															className="caller-control"
														/>
													</label>
												</div>
												<div className="col h-fit-content">
													<label className="input__wrapper select__wrapper caller-wrapper">
														<Field
															component={
																Fields.AsyncSelect
															}
															// disabled={!!formData}
															isSearchable={true}
															name="operator_id"
															size="large"
															placeholder="Операторы"
															optionLabel="full_name"
															initialValue={[
																{
																	value: null,
																	full_name:
																		"Все"
																}
															]}
															loadOptionsUrl="/user/operators"
															loadOptionsParams={search => ({
																filter: {
																	name: search
																}
															})}
														/>
													</label>
												</div>
												<div className="col h-fit-content">
													<label className="input__wrapper select__wrapper caller-wrapper">
														<Field
															component={
																Fields.AsyncSelect
															}
															// disabled={!!formData}
															isSearchable={true}
															placeholder="Регион"
															name="region_id"
															initialValue={[
																{
																	value: null,
																	name: "Все"
																}
															]}
															size="large"
															optionLabel="name"
															loadOptionsUrl="/region"
															loadOptionsParams={search => ({
																filter: {
																	name: search
																}
															})}
														/>
													</label>
												</div>

												<div className="col h-fit-content">
													<label className="input__wrapper select__wrapper caller-wrapper">
														<Field
															component={
																Fields.AsyncSelect
															}
															// disabled={!!formData}
															isSearchable={true}
															name="connected_number"
															size="large"
															placeholder="Номер"
															optionLabel="number"
															initialValue={[
																{
																	value: null,
																	number:
																		"Все"
																}
															]}
															loadOptionsUrl="/organization-number"
															loadOptionsParams={search => ({
																filter: {
																	number: search
																}
															})}
														/>
													</label>
												</div>

												<div className="col h-fit-content">
													<label className="input__wrapper select__wrapper caller-wrapper">
														<Field
															component={
																Fields.FormikSelect
															}
															// disabled={!!formData}
															name="status"
															size="large"
															optionLabel="label"
															optionValue="id"
															options={
																constants.statuses
															}
															placeholder="Тип"
															className={{
																className:
																	"modal-select-container",
																classNamePrefix:
																	"modal-select"
															}}
														/>
													</label>
												</div>

												<div className="col-12 d-flex justify-content-end m-t-20">
													<button
														type="submit"
														className="modal-btn blue"
														style={{
															marginRight: "10px"
														}}>
														Фильтр
													</button>
													<button
														type="reset"
														className="modal-btn red"
														onClick={() => {
															handleReset(
																formReset
															);
														}}>
														Сбросить
													</button>
												</div>
											</>
										);
									}}
								</EntityForm.Main>
							</div>
							<div className="main-bottom">
								<div className="table">
									<EntityContainer.All
										entity="call-history"
										name="call-history"
										url="/call-history"
										params={{
											include:
												"customer.region,customer.district,services,operator",
											filter,
											page,
											modalTrigger
										}}
										metaKey={data => {
											return get(data, "meta");
										}}
										appendData={appendData}>
										{({ items, meta, isFetched }) => {
											return (
												<>
													<Tables.AllHistoryTable
														tableData={items}
													/>
													{isFetched &&
														get(
															meta,
															"currentPage"
														) <
															get(
																meta,
																"pageCount"
															) && (
															<LoadMoreVisible
																setPage={() => {
																	setAppendData(
																		true
																	);
																	setPage(
																		page + 1
																	);
																}}
															/>
														)}
												</>
											);
										}}
									</EntityContainer.All>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AllHistory;
