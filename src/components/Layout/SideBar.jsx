/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import EntityContainer from "modules/entity/containers";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";
import { get } from "lodash";

import { api, constants } from "services";
import { storage } from "services";
import Actions from "store/actions";

const SideBar = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user);

	const handleLogout = (event) => {
		storage.remove("token");
		dispatch(Actions.auth.GetMeRequest.failure());
		api.request.post("/user/change-status", { type: constants.TYPE_NOT_WORKING }).catch((error) => console.log(error));
	};


	return (
		<section className="sidebar">
			<div className="sidebar__inner">
				<a href="/" className="sidebar-logo">
					<img src={require("assets/images/svg/logo.svg")} alt="" />
				</a>

				<ul className="sidebar-list">

					<EntityContainer.All
						entity="user-operators"
						name="user-operators"
						url="/user/operators"
					>
						{
							({ items }) => (
								<>
									{(items || []).map((item, index) => (
										<li key={item.id}>
											<a className={
												cn("sidebar-link", {
													"active": item.username === get(user, "username"),
													"working": get(item, "lastStatus.type") === constants.TYPE_AT_WORK,
													"not-working": get(item, "lastStat.type") !== constants.TYPE_AT_WORK
												})
											}>{item.username}</a>
										</li>
									))}
								</>
							)
						}

					</EntityContainer.All>
				</ul>

				<div className="sidebar__control">
					<button className="sidebar-btn" onClick={() => window.handleOpen()}>
						<img src={require("assets/images/svg/tel.svg")} alt="" />
					</button>
					<button className="sidebar-btn btn_red" onClick={handleLogout}>
						<img src={require("assets/images/svg/logout.svg")} alt="" />
					</button>
				</div>
			</div>
		</section>
	);
};

export default SideBar;