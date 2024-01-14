import React, { useState } from "react";
import { Field } from "formik";
import { toast } from "react-toastify";

import { Fields } from "components";
import EntityForm from "modules/entity/forms";

import "./_login.scss";
import { storage } from "services";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import actions from "store/actions";

const Login = () => {
	const dispatch = useDispatch();
	const [type, setType] = useState("password");
	return (
		<section className="login">
			<div className="row">
				<div
					className="col-12 col-sm-6 col-md-6 col-xl-7"
					style={{ paddingLeft: "30px" }}>
					<EntityForm.Default
						url="/user/login"
						method="post"
						fields={[
							{
								name: "username",
								type: "string",
								required: true
							},
							{
								name: "password",
								type: "string",
								required: true
							}
						]}
						className="login-form form"
						onSuccess={data => {
							const token = get(data, "data.token", "");
							toast.success("Успешно");
							storage.set("token", token);
							dispatch(
								actions.auth.GetMeRequest.success(data.data)
							);
						}}
						onError={err => {
							if (get(err, "errorData.message")) {
								toast.error("неправильное имя пользователя или пароль");
							} else {
								toast.error("Что-то пошло не так");
							}
						}}
					>
						{({ handleSubmit }) => {
							return (
								<>
									<img
										src={require("assets/images/svg/logoMecareBlue.svg")}
										alt=""
									/>
									<div className="form-box">
										<div className="form-title">Войти</div>
										<div className="form-wrapper">
											<Field
												component={Fields.TextInput}
												name="username"
												type="text"
												size="large"
												className="form-input"
												placeholder="Пользователь"
											/>
										</div>
										<div className="form-wrapper">
											<Field
												component={Fields.TextInput}
												name="password"
												type={type}
												size="large"
												className="form-input login-input"
												placeholder="Пароль"
											/>
											<div className="form-type">
												{type === "password" ? (
													<img
														className="form-eye"
														src={require("assets/images/svg/eye.svg")}
														alt=""
														onClick={() =>
															setType("text")
														}
													/>
												) : (
													<img
														className="form-eyeslash"
														src={require("assets/images/svg/eye-slash.svg")}
														alt=""
														onClick={() =>
															setType("password")
														}
													/>
												)}
											</div>
											<span className="form-icon">
												<img
													src={require("assets/images/svg/lock.svg")}
													alt=""
												/>
											</span>
										</div>
										<div className="form-button">
											<a
												className="form-btn btn transparent"
												href="#!">
												Забыл пароль ?
											</a>
											<button
												className="form-btn btn"
												// onClick={() => handleSubmit()}
											>
												Войти
											</button>
										</div>
									</div>
									<a
										className="login-rteco rteco"
										href="https://rteco.org/"
										target="_blank"
										rel="noopener noreferrer">
										<img
											className="rteco-color"
											src={require("assets/images/svg/rteco2.svg")}
											alt=""
										/>
									</a>
								</>
							);
						}}
					</EntityForm.Default>
				</div>
				<div className="col-12 col-sm-6 col-md-6 col-xl-5">
					<div className="login-img">
						<img
							src={require("assets/images/png/loginImg.png")}
							alt=""
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
