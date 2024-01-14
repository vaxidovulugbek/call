import authActions from "../actions/auth";

const initialState = {
	user: null,
	isFetched: false,
	isAuthenticated: true,
	token: null,
	billingError: null
};

export default (state = initialState, action) => {
	switch (action.type) {

		case authActions.GetMeRequest.SUCCESS:
			return {
				...state,
				isFetched: true,
				isAuthenticated: true,
				user: action.payload,
				token: action.payload.token
			};
		case authActions.GetMeRequest.FAILURE:
			return {
				...state,
				isAuthenticated: false,
				isFetched: true,
				user: {}
			};

		case authActions.CheckBilling.FAILURE:
			return {
				...state,
				billingError: action.payload
			};


		default:
			return state;
	}
};
