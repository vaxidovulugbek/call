import { Fields } from "components";
import { Field } from "formik";
import React, { useEffect } from "react";
import EntityForm from "modules/entity/forms";
import Form from "modules/entity/actions";
import { get } from "lodash";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "components";

import { time } from "services";
import { genderOptions } from "services/helpers";
import { useContext } from "react";
import { SearchContext } from "context/SearchContext";
import { toast } from "react-toastify";

const UpdateModal = ({ customerId }) => {
	const dispatch = useDispatch();
	const { handleClose } = useContext(SearchContext);

	const [formData, setFormData] = useState();
	const [regionId, setRegionId] = useState();
	const [loading, setLoading] = useState(false);

	const updateClose = () => {
		handleClose();
		toast.error("Действие отменено!");
	};

	useEffect(() => {
		setLoading(true);
		dispatch(
			Form.FormDefault.request({
				url: `customer/${customerId}`,
				method: "get",
				params: {
					include: "region,district,source"
				},
				cb: {
					success: data => {
						setFormData(get(data, "data"));
						setRegionId(get(data.data, "region.id"));
					},
					error: err => {
						setFormData(null);
					},
					finally: () => {
						setLoading(false);
					}
				}
			})
		);
		// }
	}, []);

	if (loading) {
		return <Spinner id="modal-loader" />;
	}

	return (
		<div className="modal-wrapper">
			<div className="modal-header">
				<h5 className="modal-title" id="exampleModalLabel">
					{get(formData, "phone")}
				</h5>
			</div>

			<div className="modal-body">
				<EntityForm.Main
					entity="customer"
					name="customer"
					url={`customer/${customerId}`}
					method={"put"}
					fields={FormFields(formData)}
					className="caller"
					onSuccess={() => {
						handleClose();
						toast.success("Успешно обновлен!");
					}}>
					{({ handleSubmit, values, setFieldValue }) => {
						return (
							<div className="row">
								<div className="col-6 col-sm-6 col-md-6 col-lg-6">
									<label className="caller-label">
										<div className="caller-name">Имя</div>
										<Field
											component={Fields.TextInput}
											// disabled={!!formData}
											name="name"
											type="text"
											size="large"
											className="caller-control"
											style={{
												marginBottom: "20px"
											}}
										/>
									</label>
								</div>
								<div className="col-3 col-sm-3 col-md-3 col-lg-3">
									<label className="caller-label">
										<div className="caller-name">
											Номер телефона
										</div>

										<Field
											component={Fields.MaskInput}
											// disabled={!!formData}
											name="phone"
											type="text"
											mask="999999999"
											size="large"
											className="caller-control"
										/>
									</label>
								</div>
								<div className="col-3 col-sm-3 col-md-3 col-lg-3">
									<label className="caller-label">
										<div className="caller-name">
											Дата рождения
										</div>
										<Field
											component={Fields.MaskInput}
											name="birthdate"
											mask="ed/nm/zyyy"
											className="caller-control"
											// style={{
											// 	marginBottom: "20px"
											// }}
										/>
									</label>
								</div>

								<div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
									<label className="input__wrapper select__wrapper caller-wrapper">
										<div className="caller-name">Пол</div>
										<Field
											component={Fields.FormikSelect}
											// disabled={!!formData}
											name="gender"
											size="large"
											optionLabel="label"
											optionValue="value"
											options={genderOptions}
											placeholder=""
											className={{
												className:
													"modal-select-container",
												classNamePrefix: "modal-select"
											}}
										/>
									</label>
								</div>

								<div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
									<label className="input__wrapper select__wrapper caller-wrapper">
										<div className="caller-name">
											Область
										</div>
										<Field
											component={Fields.AsyncSelect}
											// disabled={!!formData}
											onChange={() =>
												setFieldValue("district_id", {
													id: null
												})
											}
											isSearchable={true}
											name="region_id"
											size="large"
											optionLabel="name"
											setRegionId={setRegionId}
											loadOptionsUrl="/region"
											loadOptionsParams={search => ({
												filter: { name: search }
											})}
										/>
									</label>
								</div>
								<div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
									<label className="input__wrapper select__wrapper caller-wrapper">
										<div className="caller-name">Район</div>
										<Field
											component={Fields.AsyncSelect}
											isSearchable={true}
											key={get(values, "region_id.name")}
											// disabled={
											// 	!!get(values, "region_id.name")
											// }
											optionLabel="name"
											name="district_id"
											size="large"
											loadOptionsUrl={`/district`}
											loadOptionsParams={search => ({
												filter: {
													name: search,
													region_id: regionId
												}
											})}
										/>
									</label>
								</div>
								<div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
									<label className="input__wrapper select__wrapper caller-wrapper">
										<div className="caller-name">
											Канал рекламы
										</div>
										<Field
											component={Fields.AsyncSelect}
											// disabled={!!formData}
											isSearchable={true}
											optionLabel={option =>
												get(option, "name.uz")
											}
											name="source_id"
											size="large"
											loadOptionsUrl="/source"
											loadOptionsParams={search => ({
												filter: { name: search }
											})}
										/>
									</label>
								</div>
								<div className="modal-footer update">
									<button
										type="submit"
										className="modal-btn blue"
										onClick={() => handleSubmit()}>
										Сохранить
									</button>
									<button
										type="reset"
										className="modal-btn red"
										data-bs-dismiss="modal"
										onClick={updateClose}>
										Отменить
									</button>
								</div>
							</div>
						);
					}}
				</EntityForm.Main>
			</div>
		</div>
	);
};

const FormFields = formData => {
	return [
		{
			name: "name",
			type: "string",
			value: get(formData, "name")
		},
		{
			name: "phone",
			type: "string",
			value: get(formData, "phone")
		},
		{
			name: "birthdate",
			type: "string",
			value: time.to(get(formData, "birthdate")),
			onSubmitValue: value => time.customTimeStamp(value)
		},
		{
			name: "gender",
			type: "object",
			value: genderOptions.find(
				item => item.value === get(formData, "gender")
			),
			onSubmitValue: option => option.value
		},
		{
			name: "region_id",
			type: "object",
			value: get(formData, "region"),
			onSubmitValue: value => get(value, "id")
		},
		{
			name: "source_id",
			type: "object",
			value: get(formData, "source"),
			onSubmitValue: value => get(value, "id")
		},
		{
			name: "district_id",
			type: "object",
			value: get(formData, "district"),
			onSubmitValue: value => get(value, "id")
		}
	];
};
export default UpdateModal;
