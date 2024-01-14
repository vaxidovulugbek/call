import React, { useContext, useEffect, useState } from "react";
import { get } from "lodash";
import moment from "moment";
import { useSelector } from "react-redux";

import { api, constants } from "services";

import { Tables, Fields } from "components";
import EntityContainer from "modules/entity/containers";

import { ReactComponent as FiOff } from "assets/images/svg/fi_phone-off.svg";
import { ReactComponent as FiPhone } from "assets/images/svg/fi_phone-call.svg";
import { SearchContext } from "context/SearchContext";
import { useHistory } from "react-router";

import "./styles.scss";
import { toast } from "react-toastify";

const CallCenter = () => {
	const { searchText } = useContext(SearchContext);
	const history = useHistory();
	const modalTrigger = useSelector(state => get(state, "modal.refetch"));

	const [dayPage, setDayPage] = useState(1);
	const [page, setPage] = useState(1);
	const [chosenCustomers, setChosenCustomers] = useState([]);
	const [radioBtn, setRadioBtn] = useState("1");
	const [message, setMessage] = useState("");
	const [phone, setPhone] = useState("");
	const [refetch, setRefetch] = useState(1);

	const [appendData, setAppendData] = useState(true);

	useEffect(() => {
		setDayPage(1);
		setAppendData(false);
	}, [refetch, modalTrigger]);

	window.callReceived = () => {
		setRefetch(refetch + 1);
	};

	function loadMore(e, meta, isFetched, isDay = false) {
		setAppendData(true);
		const items = e.target.getElementsByClassName("history-items");
		const last = items[items.length - 1];
		const is_bottom = e.target.getBoundingClientRect().bottom + 100 >= last.getBoundingClientRect().bottom;
		if (is_bottom && (get(meta, "currentPage") < get(meta, "pageCount")) && isFetched) {
			isDay && setDayPage(dayPage + 1);
			!isDay && setPage(page + 1);
		}
	}


	const handleChange = (item, prevValue) => {
		setChosenCustomers(prev => {
			if (!prevValue) return [...prev, item];
			else return prev.filter(patients => patients.id !== item.id);
		});
	};

	const handleSubmit = () => {
		let body = [];
		if (parseInt(radioBtn) === 1)
			body = chosenCustomers.map(item => ({ phone: item.phone, text: message }));
		else body = [{ phone, text: message }];
		api.request.post("/message/send", { messages: body }).then(({ response }) => {
			setChosenCustomers([]);
			setPhone("");
			setMessage("");
			setRadioBtn(1);
			toast.success("Сообщение успешно отправлено!");
		}).catch(() => {
			toast.error("Что-то пошло не так!");
		});
	};


	return (
		<div className="main sec-padding call-center">
			<form className="main-form" onSubmit={(event) => event.preventDefault()}>
				<div className="main-date" />
				<div className="row">
					<div
						className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8 col-xxl-8"
						style={{ marginBottom: "30px" }}>
						<div className="main-card">
							<div className="main-top">
								<div className="main-title">
									Клиенты
								</div>
							</div>
							<div className="main-bottom">
								<Tables.Patients
									isCheckBox={false}
									searchText={searchText}
									tableClassName="patientsTable"
									handleChange={handleChange}
									chosenCustomers={chosenCustomers}
								/>
							</div>
						</div>
						<div className="main-card">
							<div className="main-top">
								<div className="main-title">Отправка Смс</div>
							</div>
							<div className="main-bottom">
								<div className="row g-4">
									<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
										<div className="sending-box">
											<div className="checkbox-title">
												Отправить сообщение
											</div>
											<Fields.RadioBtn isChecked={parseInt(radioBtn) === 1}
															 setIsChecked={setRadioBtn}
															 innerText="Отправить всем" name="smsOption" value={1} />
										</div>
									</div>
									<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
										<div className="sending-box">
											<div className="checkbox-title">
												Отправить сообщение
											</div>
											<Fields.RadioBtn isChecked={parseInt(radioBtn) === 2}
															 setIsChecked={setRadioBtn}
															 innerText="Отправить абоненту" name="smsOption"
															 value={2} />
										</div>
									</div>

									{
										parseInt(radioBtn) === 2 &&
										<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-5">
											<input
												className="sending-input"
												type="text"
												placeholder="998776677"
												value={phone}
												onChange={(event) => setPhone(event.target.value)}
											/>
										</div>
									}
								</div>

								<label style={{ display: "block", width: "100%", marginTop: "20px" }}>
									<div className="checkbox-title">
										Сообщение
									</div>
									<textarea
										className="sending-input"
										value={message}
										onChange={(event) => setMessage(event.target.value)}
									/>
								</label>
							</div>
						</div>
						<button className="btn" onClick={handleSubmit}>
							Отправить Сообщение
						</button>
					</div>

					<div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-4">
						<div className="main-card pb-5">
							<div className="main-top">
								<div className="main-title">История Звонков</div>
							</div>
							<div className="main-bottom">
								<EntityContainer.All
									entity="call_history"
									name="call_history"
									url="/call-history/day"
									params={{
										limit: 10,
										page: dayPage,
										include: ["operator"],
										sort: "-id",
										refetch,
										modalTrigger,
										filter: {
											status: [constants.STATUS_END, constants.STATUS_SELF]
										}
									}}
									metaKey={(data) => {
										return get(data, "meta");
									}}
									appendData={appendData}>
									{({ items, meta, isFetched }) => {
										return (
											<div className="history"
												 onScroll={(e) => loadMore(e, meta, isFetched, true)}>
												{items.map(
													(item, i) => {
														const {
															id,
															phone,
															customer_id,
															status,
															created_at,
															operator

														} = item;
														return (
															<>
																<div
																	key={id}
																	className="history-items"
																	onClick={() => {
																		history.push(customer_id ? `/customer/${customer_id}` : `/handbook`, { phone });
																	}}>
																	<div className="history-call"
																		 style={{ width: "100%" }}>
																		<div className="history-number">
																			{get(operator, "operator_number", "")}
																		</div>
																		<div className="history-tel"
																			 style={{ width: "100%" }}>
																			<div style={{ width: "100%" }}>
																				<span>
																					Call
																					a
																				</span>
																				{phone && ` ${phone}`}
																				<div className="history-day-time"
																					 style={{
																						 width: "100%",
																						 paddingRight: "10px",
																						 marginTop: "3px",
																						 fontSize: "14px"
																					 }}>{moment.unix(created_at).format("HH:mm:ss")}</div>
																			</div>
																		</div>
																	</div>

																	<div className="history-icon">
																		{status === constants.STATUS_END && <FiPhone />}
																		{status === constants.STATUS_SELF &&
																			<FiOff />}
																	</div>
																</div>
															</>
														);
													}
												)}
											</div>
										);
									}}
								</EntityContainer.All>
							</div>
							<div className="main-footer">
								<EntityContainer.All
									entity="call_history"
									name="call_history/filtered"
									url="/call-history"
									params={{
										filter: {
											status: [1]
										},
										include: ["operator"],
										limit: 100,
										page,
										refetch,
										modalTrigger
									}}>
									{({ items, isFetched, meta }) => {
										return (
											<>
												<div className="history" onScroll={(e) => loadMore(e, meta, isFetched)}>
													{(items || []).map(
														(item, i) => {
															const {
																id,
																phone,
																service,
																created_at,
																operator
															} = item;
															return (
																<div
																	key={id}
																	className="history-items"
																>
																	<div className="history-info">
																		<div className="history-tel">
																			{phone && phone}
																		</div>
																		<div className="history-company">
																			{get(
																				service,
																				"name.name.en"
																			)}
																			connected
																			<span>
																				{get(operator, "operator_number", "")}
																			</span>
																		</div>
																	</div>
																	<div className="history-time">
																		{moment.unix(created_at).format("HH:mm:ss")}
																	</div>
																</div>
															);
														}
													)}
												</div>
											</>
										);
									}}
								</EntityContainer.All>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CallCenter;
