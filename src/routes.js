// import React, { lazy, Suspense, useState, useEffect } from "react";
import React, { lazy, Suspense, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { ToastContainer } from "react-toastify";

import { history } from "store";
import ScrollTop from "./hoc/ScrollTop";
import { constants, WS_connect } from "services";
// import { BillingError, Layout, Spinner } from "components";
import { Layout, Spinner } from "components";
import NewModal from "components/Modal/NewModal";
import App from "./App";
import Plugins from "pages/Plugins/Plugins";

const Analytics = lazy(() => import("./pages/Analytics"));
const CallCenter = lazy(() => import("./pages/CallCenter"));
const AllHistory = lazy(() => import("./pages/Handbook"));
const CustomerView = lazy(() => import("./pages/CallCenter/CustomerView"));
const Patients = lazy(() => import("./pages/Patients"));
const Profile = lazy(() => import("./pages/Profile"));
const OrganizationNumber = lazy(() => import("./pages/OperatorNumber"));
const Source = lazy(() => import("./pages/Source"));
const Service = lazy(() => import("./pages/Service"));
const ApplicationView = lazy(() => import("./pages/ApplicationView/ApplicationView"));
const OperatorStatistics = lazy(() => import("./pages/Analytics/Operator"));
const TaskList = lazy(() => import("./pages/Task/TaskList"));

const Login = lazy(() => import("./pages/Auth/Login.jsx"));

const routes = [
	{ path: "/", exact: true, component: CallCenter },
	{ path: "/handbook", exact: true, component: AllHistory },
	{ path: "/patients", exact: true, component: Patients },
	{ path: "/customer/:customerId", exact: true, component: CustomerView },
	{ path: "/application", exact: true, component: TaskList }
];

const auth_routes = [{ path: "/", exact: true, component: Login }];

export default () => {
	const { isAuthenticated, isFetched, user } = useSelector(
		state => state.auth
	);

	const token = localStorage.getItem("token");

	useEffect(() => {
		if (get(user, "operator_number") && isAuthenticated) {
			WS_connect(user.operator_number);
		}
	}, [user]);

	// if(billingError) return <BillingError subtitle={get(billingError, "message")} />

	return (
		<Router {...{ history }}>
			<App>
				<audio id="outgo-audio" hidden={true} />
				<audio id="income-audio" hidden={true} />
				<audio
					id="ring-income-audio"
					src={require("assets/audio/ringing.mp3")}
					controls
					hidden
					loop
				/>
				<audio
					id="ring-outgo-audio"
					src={require("assets/audio/outbound-call.mp3")}
					controls
					hidden
					loop
				/>
				{isAuthenticated && isFetched && (
					<Layout>
						<Suspense fallback={<Spinner />}>
							<NewModal />
							<Switch>
								{routes.map((route, key) => (
									<Route
										key={key}
										path={route.path}
										component={ScrollTop(route.component)}
										exact={route.exact}
									/>
								))}
								{(get(user, "role") ===
									constants.ROLE_MANAGER ||
									get(user, "role") ===
										constants.ROLE_ADMIN) && (
									<>
										<Route
											path="/operator-statistics"
											component={ScrollTop(
												OperatorStatistics
											)}
											exact={true}
										/>
										<Route path="/analytice" component={ScrollTop(Analytics)}
											exact={true}
										/>
										<Route
											path="/profile"
											component={ScrollTop(Profile)}
											exact={true}
										/>
										<Route
											path="/organization-number"
											component={ScrollTop(
												OrganizationNumber
											)}
											exact={true}
										/>
										<Route
											path="/source"
											component={ScrollTop(Source)}
											exact={true}
										/>
										<Route
											path="/service"
											component={ScrollTop(Service)}
											exact={true}
										/>
										<Route
											path="/application/1"
											component={ScrollTop(ApplicationView)}
											exact={true}
										/>
										<Route
											path="/plugins"
											component={ScrollTop(Plugins)}
											exact={true}
										/>
									</>
								)}
								<Redirect from="*" to="/" />
							</Switch>
						</Suspense>
					</Layout>
				)}

				{((!isAuthenticated && isFetched) || !token) && (
					<Suspense fallback={<Spinner />}>
						<>
							{auth_routes.map((route, key) => (
								<Route
									key={key}
									path={route.path}
									component={ScrollTop(route.component)}
									exact={route.exact}
								/>
							))}
							<Redirect from="*" to="/" />
						</>
					</Suspense>
				)}
				{!isFetched && token && <Spinner />}
				<ToastContainer
					position="top-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</App>
		</Router>
	);
};
