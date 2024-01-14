import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { get } from "lodash";
import i18next from "i18next";

import { helpers, storage } from "services";
import config from "config";
import systemActions from "store/actions/system";
import authActions from "store/actions/auth";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			connected: false
		};
	}

	setLanguage = () => {
		const { ChangeLanguage } = this.props;
		const pathname = window.location.pathname;
		const locationLang = pathname.split("/")[1];

		if (helpers.isEnableLang(locationLang)) {
			i18next.changeLanguage(locationLang);
			ChangeLanguage(locationLang);
		} else {
			i18next.changeLanguage(config.DEFAULT_LANGUAGE);
			ChangeLanguage(config.DEFAULT_LANGUAGE);
		}
	};

	setCountry = () => {
		const { ChangeCountry } = this.props;

		if (storage.get("country")) {
			ChangeCountry(storage.get("country"));
		} else {
			ChangeCountry(config.DEFAULT_COUNTRY);
		}
	};

	componentDidMount() {
		// const { GetMeRequest, CheckBilling } = this.props;
		const { GetMeRequest } = this.props;
		if (storage.get("token")) {
			GetMeRequest();
			// CheckBilling()
		}

		this.setLanguage();
		this.setCountry();
	}

	render() {
		const { children } = this.props;
		const { error } = this.state;

		if (error) {
			return (
				<div className="error-page error-page__sentry">
					<div className="error-ico" />
					<div className="error-text">Something went wrong !!!</div>
					<span className="error-btn mx-btn btn-solid info">
						Report feedback
					</span>
				</div>
			);
		}

		return <div>{children}</div>;
	}
}

const mapStateToProps = state => {
	const operator_number = get(state, "auth.user.username");
	return { operator_number };
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			ChangeLanguage: systemActions.ChangeLanguage,
			ChangeCountry: systemActions.ChangeCountry,
			GetMeRequest: authActions.GetMeRequest,
			CheckBilling: authActions.CheckBilling.request
		},
		dispatch
	);

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
