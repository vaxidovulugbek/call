// import React, { useState } from "react";
import React from "react";
import { Field } from "formik";
import Fields from "components/Fields";
import { get } from "lodash";
// import cn from "classnames";

import { genderOptions } from "services/helpers";
import { toast } from "react-toastify";

const ModalForm = ({
	values,
	formData,
	handleSubmit,
	handleClose,
	setFieldValue,
	handleReset,
	fetchUser,
	regionId,
	setRegionId
}) => {
	const colSize = formData ? "12" : "6";
	const classNames = `col-12 col-sm-12 col-md-12 col-lg-${colSize} col-xl-${colSize}`;

	return (
		<>
			<div className="caller-number">{get(values, "phone")}</div>
			<div className="row">
				{!formData && (
					<div className={classNames}>
						<label className="caller-label">
							<div className="caller-name">Телефон Номер</div>
							<Field
								component={Fields.MaskInput}
								// disabled={!!formData}
								name="phone"
								type="text"
								mask="999999999"
								size="large"
								className="caller-control"
								onBlur={event => fetchUser(event.target.value)}
							/>
						</label>
					</div>
				)}
				<div className={classNames}>
					<label className="caller-label">
						<div className="caller-name">Имя</div>
						<Field
							component={Fields.TextInput}
							// disabled={!!formData}
							name="name"
							type="text"
							size="large"
							className="caller-control"
						/>
					</label>
				</div>
				{/*<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-6">*/}
				{/*	<label className="caller-label">*/}
				{/*		<div className="caller-name">Тел-Номер</div>*/}
				{/*		<Field*/}
				{/*			component={Fields.TextInput}*/}
				{/*			disabled={!!formData}*/}
				{/*			name="name"*/}
				{/*			type="text"*/}
				{/*			size="large"*/}
				{/*			className="caller-control"*/}
				{/*			style={{*/}
				{/*				marginBottom: "20px"*/}
				{/*			}}*/}
				{/*		/>*/}
				{/*	</label>*/}
				{/*</div>*/}

				<div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
					<label className="caller-label">
						<div className="caller-name">День Рождения</div>
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

				<div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
					<label className="input__wrapper select__wrapper caller-wrapper">
						<div className="caller-name">Область</div>
						<Field
							component={Fields.AsyncSelect}
							// disabled={!!formData}
							onChange={() =>
								setFieldValue("district_id", { id: null })
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
				<div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
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
								filter: { name: search, region_id: regionId }
							})}
						/>
					</label>
				</div>

				<div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
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
								className: "modal-select-container",
								classNamePrefix: "modal-select"
							}}
						/>
					</label>
				</div>

				<div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
					<label className="input__wrapper select__wrapper caller-wrapper">
						<div className="caller-name">Канал рекламы</div>
						<Field
							component={Fields.AsyncSelect}
							// disabled={!!formData}
							isSearchable={true}
							// placeholder="Канал рекламы"
							optionLabel={option => get(option, "name.uz")}
							name="source_id"
							size="large"
							loadOptionsUrl="/source"
							loadOptionsParams={search => ({
								filter: { name: search }
							})}
						/>
					</label>
				</div>

				<div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
					<label className="input__wrapper select__wrapper caller-wrapper">
						<div className="caller-name">Услуга</div>
						<Field
							component={Fields.AsyncSelect}
							isMulti={true}
							// disabled={!!formData}
							// placeholder="Услуга"
							optionLabel={option => get(option, "name.uz")}
							name="service_ids"
							size="large"
							loadOptionsUrl="/service"
							loadOptionsParams={search => ({
								filter: { name: search }
							})}
						/>
					</label>
				</div>

				{/*<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">*/}
				{/*	<label className="input__wrapper select__wrapper caller-wrapper">*/}
				{/*		<div className="caller-name">Тип</div>*/}
				{/*		<Field*/}
				{/*			component={Select.FormikSelect}*/}
				{/*			name="type"*/}
				{/*			size="large"*/}
				{/*			options={typeOptions}*/}
				{/*			placeholder=""*/}
				{/*			className={{*/}
				{/*				className: "modal-select-container",*/}
				{/*				classNamePrefix: "modal-select"*/}
				{/*			}}*/}
				{/*		/>*/}
				{/*	</label>*/}
				{/*</div>*/}

				{/*<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">*/}
				{/*	<label className="input__wrapper select__wrapper caller-wrapper">*/}
				{/*		<div className="caller-name">Статус</div>*/}
				{/*		<Field*/}
				{/*			component={Select.FormikSelect}*/}
				{/*			name="status"*/}
				{/*			size="large"*/}
				{/*			options={statusOptions}*/}
				{/*			placeholder=""*/}
				{/*			className={{*/}
				{/*				className: "modal-select-container",*/}
				{/*				classNamePrefix: "modal-select"*/}
				{/*			}}*/}
				{/*		/>*/}
				{/*	</label>*/}
				{/*</div>*/}

				<div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
					<label className="input__wrapper select__wrapper caller-wrapper textarea">
						<div className="caller-name">Описание</div>
						<Field
							component={Fields.Textarea}
							name="comment"
							type="text"
							size="large"
							className="caller-textarea"
						/>
					</label>
				</div>
			</div>

			<div className="modal-footer">
				<button
					type="submit"
					className="modal-btn blue"
					onClick={handleSubmit}>
					Сохранить
				</button>
				<button
					type="reset"
					className="modal-btn red"
					data-bs-dismiss="modal"
					onClick={() => {
						handleClose();
						handleReset();
						toast.error("Действие отменено!");
					}}>
					Отменить
				</button>
			</div>
		</>
	);
};

export default ModalForm;
