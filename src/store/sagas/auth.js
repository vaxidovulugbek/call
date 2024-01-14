// import axios from "axios";

import { takeEvery, call, put, all } from "redux-saga/effects";
import { api, constants, queryBuilder, storage } from "services";

import authActions from "../actions/auth";
import config from "config";


export function* GetMeRequest() {
	try {
		const { data } = yield call(api.request.get, queryBuilder("/user/get-me"));
		yield put(authActions.GetMeRequest.success(data.data));
	} catch (error) {
		yield put(authActions.GetMeRequest.failure({
			error
		}));
	}
}


export function* CheckBilling() {
	try {
		const data = yield call(fetch, config.BILLING_URL);
		yield put(authActions.CheckBilling.success(data));
	} catch (error) {
		api.request.post("/user/change-status", { type: constants.TYPE_NOT_WORKING }).catch(e => {})

		yield put(authActions.CheckBilling.failure({
			error
		}));
	}
}

export function* LogoutRequest() {
	yield call(storage.remove, "token");
}

export default function* root() {
	yield all([
		takeEvery(authActions.GetMeRequest.TRIGGER, GetMeRequest),
		takeEvery(authActions.Logout.REQUEST, LogoutRequest),
		takeEvery(authActions.CheckBilling.REQUEST, CheckBilling)
	]);
}
