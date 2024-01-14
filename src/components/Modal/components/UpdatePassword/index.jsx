import React from "react";
import EntityForm from "modules/entity/forms";
import { toast } from "react-toastify";
import { Field } from "formik";
import Fields from "components/Fields";
import actions from "store/actions";
import { useDispatch } from "react-redux";
import { get } from "lodash";


const UpdatePassword = ({ handleClose }) => {
	const dispatch = useDispatch();
	return (
		<div className="modal-wrapper">

			<div className="modal-body">
				<EntityForm.Default
					url={"user/update-password"}
					method={"put"}
					fields={[
						{
							name: "old_password",
							type: "password",
							required: true
						},
						{
							name: "password",
							type: "password",
							required: true
						},
						{
							name: "password_confirm",
							type: "password",
							required: true
						}
					]}
					className="caller"
					onSuccess={(data) => {
						handleClose();
						dispatch(actions.auth.GetMeRequest.success(data.data));
						toast.success("Успешно обновлен!");
					}}
					onError={({ errorData, errorMessage, setFieldError }) => {
						setFieldError("old_password", get(errorData, "errors.old_password"));
						setFieldError("password", get(errorData, "errors.password"));
						setFieldError("password_confirm", get(errorData, "errors.password_confirm"));
					}}
				>
					{({ handleSubmit, values, setFieldValue }) => {
						return (
							<div className="row">
								<div className="col-6 col-sm-6 col-md-6 col-lg-6">
									<label className="caller-label">
										<div className="caller-name">
											Пароль
										</div>
										<Field
											component={Fields.TextInput}
											// disabled={!!formData}
											name="old_password"
											type="password"
											size="large"
											className="caller-control"
											style={{
												marginBottom: "20px"
											}}
										/>
									</label>
								</div>
								<div className="col-6 col-sm-6 col-md-6 col-lg-6">
									<label className="caller-label">
										<div className="caller-name">
											Новый пароль
										</div>
										<Field
											component={Fields.TextInput}
											name="password"
											type="password"
											size="large"
											className="caller-control"
											style={{
												marginBottom: "20px"
											}}
										/>
									</label>
								</div>
								<div className="col-6 col-sm-6 col-md-6 col-lg-6">
									<label className="caller-label">
										<div className="caller-name">
											Подтвердить новый пароль
										</div>
										<Field
											component={Fields.TextInput}
											name="password_confirm"
											type="password"
											size="large"
											className="caller-control"
											style={{
												marginBottom: "20px"
											}}
										/>
									</label>
								</div>
								<div className="modal-footer update">
									<button
										type="submit"
										className="modal-btn blue"
										onClick={() => handleSubmit()}
									>
										Сохранить
									</button>
									<button
										type="reset"
										className="modal-btn red"
										data-bs-dismiss="modal"
										onClick={() => {
											handleClose && handleClose();
											toast.error("Действие отменено!")
										}}>
										Отменить
									</button>
								</div>
							</div>
						);
					}}
				</EntityForm.Default>
			</div>
		</div>
	);
};


export default UpdatePassword;
