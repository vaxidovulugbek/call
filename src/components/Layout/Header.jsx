import React, { useState, useContext, useEffect } from "react";
import { Web } from "sip.js";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import cn from "classnames";

import config from "config";

import { SearchContext } from "context/SearchContext";

import EntityForm from "modules/entity/forms";
import { ReactComponent as Logo } from "assets/images/svg/mecall.svg";
import { Fields } from "components";
import { constants } from "services";
import { get } from "lodash";
import { api } from "services";
import { CallWindow } from "components/Layout/CallWindow";
import { useOutsideClick } from "hooks/useOutsideClick";
import settings from '../../assets/images/svg/settings.svg'

import { useModal } from "hooks/useModal";
import Modal from "components/Modal/Modal"
import SettingsModal from "components/Modal/components/SettingsModal/SettingsModal";

const headerLinks = [
	{ to: "/", label: "Колл-центр" },
	{ to: "/handbook", label: "История Звонков" },
	{ to: "/patients", label: "Клиенты" }
];

// function getAudioElement(id) {
// 	const el = document.getElementById(id);
// 	if (!(el instanceof HTMLAudioElement)) {
// 		return;
// 	}
// 	return el;
// }

let isOutboundCall = false;

const createPhoneConnection = ({
	userNumber,
	onSessionEstablishing,
	onSessionTerminated
}) => {
	const server = config.SIP_URL;
	let simpleUser;

	simpleUser = new Web.SimpleUser(server, {
		aor: `sip:${userNumber}@192.168.1.34`,
		media: {
			local: {
				audio: document.getElementById("income-audio")
			},
			remote: {
				audio: document.getElementById("outgo-audio")
			}
		},

		userAgentOptions: {
			authorizationUsername: userNumber,
			authorizationPassword: "12345",

			logBuiltinEnabled: false
		},

		delegate: {
			onCallCreated() {
				const ringIncomeAudio = document.getElementById(
					"ring-income-audio"
				);
				const ringOutgoAudio = document.getElementById(
					"ring-outgo-audio"
				);

				if (isOutboundCall && ringOutgoAudio) {
					ringOutgoAudio.play();
				} else if (ringIncomeAudio) {
					ringIncomeAudio.play();
				}
			},

			onCallReceived() {
				onSessionEstablishing(simpleUser);

				if (document.getElementById("hangup-call-btn")) {
					document
						.getElementById("hangup-call-btn")
						.addEventListener("click", event => {
							simpleUser.hangup();
						});
				}

				if (document.getElementById("take-call-btn")) {
					document
						.getElementById("take-call-btn")
						.addEventListener("click", event => {
							event.currentTarget.disabled = true;

							simpleUser.answer().then(res => {
								window.handleOpen({
									phone:
										simpleUser.session.assertedIdentity
											.displayName
								});
							});
						});
				}
			},

			onCallAnswered() {
				const ringIncomeAudio = document.getElementById(
					"ring-income-audio"
				);
				const ringOutgoAudio = document.getElementById(
					"ring-outgo-audio"
				);

				if (isOutboundCall && ringOutgoAudio) {
					ringOutgoAudio.pause();
				} else if (ringIncomeAudio) {
					ringIncomeAudio.pause();
				}

				isOutboundCall = false;
			},

			onCallHangup() {
				if (document.getElementById("manual-call-btn")) {
					document.getElementById(
						"manual-call-btn"
					).style.backgroundColor = "#07c352";
				}

				const ringIncomeAudio = document.getElementById(
					"ring-income-audio"
				);
				const ringOutgoAudio = document.getElementById(
					"ring-outgo-audio"
				);

				if (isOutboundCall && ringOutgoAudio) {
					ringOutgoAudio.pause();
				} else if (ringIncomeAudio) {
					ringIncomeAudio.pause();
				}

				isOutboundCall = false;

				onSessionTerminated();
			}
		}
	});

	return simpleUser;
};

const Header = () => {
	const { isOpen, handleClose, handleOpen } = useModal();

	const user = useSelector(state => state.auth.user);
	const history = useHistory();
	const [searchText, setSearch] = useState("");
	const [active, setActive] = useState(false);
	const [activeLink, setActiveLink] = useState(history.location.pathname);
	const [phone, setPhone] = useState("");
	const [simpleUser, setSimpleUser] = useState({});
	const [isOutsideCall, setIsOutsideCall] = useState(false);
	const [isCallAccepted, setIsCallAccepted] = useState(false);
	const {
		ref,
		isVisible,
		handleToggleVisibility,
		handleOpenMenu,
		handleCloseMenu
	} = useOutsideClick(false, null, false);

	const initSip = async () => {
		try {
			const simpleUser = createPhoneConnection({
				userNumber: get(user, "operator_number"),
				onSessionEstablishing: invitation => {
					setPhone(invitation.session.assertedIdentity.displayName);
					setIsOutsideCall(true);
					handleOpenMenu();
				},
				onSessionTerminated: () => {
					handleCloseMenu();
					setIsCallAccepted(false);
					setIsOutsideCall(false);
				}
			});
			await simpleUser.connect();
			await simpleUser.register();

			setSimpleUser(simpleUser);
		} catch (error) {}
	};

	useEffect(() => {
		if (user) initSip();
	}, [user]);

	const makeCall = event => {
		isOutboundCall = true;

		if (!isCallAccepted) {
			simpleUser.call(`sip:${phone}@192.168.1.34`).then(res => {
				window.handleOpen({ phone });
				setIsCallAccepted(true);
			});
			document.getElementById("manual-call-btn").style.backgroundColor =
				"var(--main-red)";
		} else {
			document.getElementById("manual-call-btn").style.backgroundColor =
				"#07c352";
			simpleUser.hangup();
			setIsCallAccepted(false);
		}
	};

	history.listen((location, action) => {
		setActiveLink(location.pathname);
	});

	const { setSearchText } = useContext(SearchContext);

	const handleChange = e => {
		setSearch(e.target.value);
	};

	const handleSearch = () => {
		if (history.location.pathname !== "/") history.push("/");
		setSearchText(searchText);
	};

	const handleKeyPress = e => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	const handleSubmit = event => {
		event.preventDefault();
	};

	return (
		<header className="header">
			<div className="header-inner">
				<Link to="/" className="header-logo">
					<Logo />
				</Link>

				<nav className={`header-nav ${active && "active"}`}>
					<ul className="header-list">
						{headerLinks.map((item, i) => {
							return (
								<li key={i}>
									<Link
										to={item.to}
										className={cn("header-link", {
											active: activeLink === item.to
										})}
										onClick={() => setActive(false)}>
										{item.label}
									</Link>
								</li>
							);
						})}
						{(get(user, "role") === constants.ROLE_MANAGER ||
							get(user, "role") === constants.ROLE_ADMIN) && (
							<>
								{/* <button className="header-settings-btn" onClick={handleOpen}>
									<img src={settings} alt="settings" />
								</button>
								<Modal isOpen={isOpen} size={700}
										toggle={() => { }}
										customClass="modal-test">
										<SettingsModal handleClose={handleClose}/>
								</Modal> */}

							</>
						)}
					</ul>
					
					
					<form
						className="header-form header-mob"
						onSubmit={handleSubmit}>
						{/*<label className="header-label">*/}
						{/*	<div className="header-label__title">Search by</div>*/}
						{/*	<Fields.CustomSelect />*/}
						{/*</label>*/}

						<label className="header-label">
							<div className="header-search">
								<img
									className="header-search__icon"
									src={require("assets/images/svg/search.svg")}
									alt=""
								/>
								<input
									className="header-control"
									type="text"
									placeholder="Поиск ..."
									onChange={handleChange}
									onKeyPress={handleKeyPress}
								/>
								<button
									className="header-btn"
									type="submit"
									onClick={() => setSearchText(searchText)}>
									Поиск
								</button>
							</div>
						</label>
					</form>
				</nav>

				<div className="d-flex align-items-center">
					{(get(user, "role") === constants.ROLE_MANAGER ||
							get(user, "role") === constants.ROLE_ADMIN) && (
							<>
								<button className="header-settings-btn" onClick={handleOpen}>
									<img src={settings} alt="settings" />
								</button>
								<Modal isOpen={isOpen} size={700}
										toggle={() => { }}
										customClass="modal-test">
										<SettingsModal handleClose={handleClose}/>
								</Modal>

							</>
						)}

					<CallWindow
						isOutsideCall={isOutsideCall}
						phone={phone}
						setPhone={setPhone}
						ref={ref}
						isVisible={isVisible}
						makeCall={makeCall}
						handleToggleVisibility={handleToggleVisibility}
					/>
				</div>

				<div style={{ marginLeft: "25px", marginRight: "25px" }}>
					<EntityForm.Main
						entity="change-status"
						name="change-status"
						method="post"
						url="/user/change-status"
						fields={[
							{
								name: "type",
								value:
									constants.getType(
										get(user, "lastStatus.type")
									) || constants.types[0],
								onSubmitValue: value => get(value, "id")
							}
						]}>
						{({ setFieldValue, values }) => (
							<Fields.CustomSelect
								options={constants.types}
								optionLabel="label"
								optionValue="id"
								value={values.type}
								handleChange={option => {
									setFieldValue("type", option);
									api.request
										.post("/user/change-status", {
											type: get(option, "id")
										})
										.catch(err => console.log(err));
								}}
							/>
						)}
					</EntityForm.Main>
				</div>

				<form className="header-form" onSubmit={handleSubmit}>
					{/*<label className="input__wrapper select__wrapper">*/}
					{/*	<span className="input__label"> Search by </span>*/}
					{/*	<Fields.CustomSelect />*/}
					{/*</label>*/}

					<label className="header-label">
						<div className="header-search">
							<img
								className="header-search__icon"
								src={require("assets/images/svg/search.svg")}
								alt=""
							/>
							<input
								className="header-control"
								type="search"
								placeholder="Поиск ..."
								value={searchText}
								onChange={handleChange}
								onKeyPress={handleKeyPress}
							/>
							<button
								className="header-btn"
								type="submit"
								onClick={handleSearch}>
								Поиск
							</button>
						</div>
					</label>
				</form>

				<div
					className={`header-burger ${active && "active"}`}
					onClick={() => setActive(!active)}>
					<span />
				</div>
			</div>
		</header>
	);
};

export default Header;
