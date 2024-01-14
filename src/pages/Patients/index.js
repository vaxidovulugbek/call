import React, { useState } from "react";
import { Field } from "formik";
import { get } from "lodash";

import { time } from "services";

import { useModal } from "hooks/useModal";

import EntityForm from "modules/entity/forms";
import { Modal, Fields, Tables, AppTable, ButtonExport } from "components";
import { tableData } from "../CallCenter/data";

import { ReactComponent as ImportIcon } from "assets/images/svg/imoprt.svg";

function Patients() {
	const [filter, setFilter] = useState();
	const [dateRange, setDateRange] = useState(time.getThisMonth());
	const importModal = useModal();

	const handleSubmit = (values = {}) => {
		const filterObj = {};
		Object.keys(values).forEach(key => {
			if (typeof values[key] === "object")
				filterObj[key] = values[key].id;
			else filterObj[key] = values[key];
		});

		setFilter(filterObj);
	};

	const handleReset = formReset => {
		setFilter({});
		formReset();
	};

	return (
		<div className="main sec-padding">
			<Modal
				isOpen={importModal.isOpen}
				size={800}
				toggle={() => {}}
				customClass="update-modal">
				<div className="modal-wrapper">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">
							Import customers from Excel (example view)
						</h5>
					</div>

					<div
						className="modal-body"
						style={{ paddingLeft: "30px", paddingRight: "30px" }}>
						<EntityForm.Main
							url="/customer/import"
							method="post"
							fields={[
								{
									name: "file",
									isRequired: true
								}
							]}
							sendAsFormData={true}>
							{({ setFieldValue }) => (
								<>
									<AppTable
										columns={[
											{
												title: "Full name",
												dataKey: "full_name",
												render: value => value
											},
											{
												title: "Phone",
												dataKey: "phone",
												render: value => value
											},
											{
												title: "Comment",
												dataKey: "comment",
												render: value => value
											}
										]}
										items={[
											{
												full_name:
													"Falonchiyev Pistonchi",
												phone: "951233212",
												comment:
													"Comment of this history"
											},
											{
												full_name:
													"Falonchiyev Pistonchi",
												phone: "951233212",
												comment:
													"Comment of this history"
											}
										]}
									/>

									<div className="modal-footer update">
										<label className="export-btn">
											<input
												type="file"
												hidden={true}
												onChange={event =>
													setFieldValue(
														"file",
														event.target.files[0]
													)
												}
											/>
											<ImportIcon />
											browse file
										</label>

										<button
											type="submit"
											className="modal-btn blue"
											onClick={() => {
												importModal.handleClose();
											}}>
											Сохранить
										</button>
										<button
											type="reset"
											className="modal-btn red"
											data-bs-dismiss="modal"
											onClick={importModal.handleClose}>
											Отменить
										</button>
									</div>
								</>
							)}
						</EntityForm.Main>
					</div>
				</div>
			</Modal>

			<div className="main-date" />
			<div className="row">
				<div
					className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"
					style={{ marginBottom: "30px" }}>
					<div className="main-card">
						<div className="main-top">
							<div className="flex-main mb-30">
								<div className="main-title">Клиенты</div>

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
									<button
										className="modal-btn blue import-btn_blue ml"
										style={{ marginLeft: "20px" }}
										onClick={importModal.handleOpen}>
										<ImportIcon />
										Import
									</button>

									<ButtonExport
										range={time.getRange(
											dateRange[0],
											dateRange[1]
										)}
										url="export/customer"
										style={{ marginLeft: "20px" }}
									/>
								</div>
							</div>
							<EntityForm.Main
								entity="filter"
								name="filter"
								url=""
								method="get"
								className="row flex-100"
								fields={[
									{
										name: "name"
									},
									{
										name: "region_id"
									},
									{
										name: "source_id"
									},
									{
										name: "phone"
									}
								]}>
								{({ values, handleReset: formReset }) => {
									return (
										<>
											<div className="col-3 h-fit-content">
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
											<div className="col-2 h-fit-content">
												<label className="input__wrapper select__wrapper caller-wrapper">
													<Field
														component={
															Fields.AsyncSelect
														}
														// disabled={!!formData}
														isSearchable={true}
														placeholder="Регион"
														name="region_id"
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
											<div className="col-2 h-fit-content">
												<label className="input__wrapper select__wrapper caller-wrapper">
													<Field
														component={
															Fields.AsyncSelect
														}
														// disabled={!!formData}
														isSearchable={true}
														name="source_id"
														size="large"
														placeholder="Источник"
														optionLabel={option =>
															get(
																option,
																"name.uz"
															)
														}
														optionValue="id"
														loadOptionsUrl="/source"
														loadOptionsParams={search => ({
															filter: {
																name: search
															}
														})}
													/>
												</label>
											</div>
											<div className="col-2 h-fit-content">
												<label className="caller-label">
													<Field
														component={
															Fields.TextInput
														}
														// disabled={!!formData}
														placeholder="Телефон Номер"
														name="phone"
														type="text"
														size="large"
														className="caller-control"
													/>
												</label>
											</div>

											<div className="col d-flex">
												<button
													type="submit"
													className="modal-btn blue"
													onClick={() => {
														handleSubmit(values);
													}}
													style={{
														marginRight: "10px"
													}}>
													Фильтр
												</button>
												<button
													type="reset"
													className="modal-btn red"
													onClick={() => {
														handleReset(formReset);
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
							<Tables.Patients
								tableData={tableData}
								filter={filter}
								isPage={true}
								tbodyClassName="tbody"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Patients;
