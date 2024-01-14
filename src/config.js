const {
	REACT_APP_API_ROOT,
	REACT_APP_WS_IP,
	REACT_APP_BILLING_URL,
	REACT_APP_SIP_URL
} = process.env;
const config = {
	API_ROOT: REACT_APP_API_ROOT,
	WS_API: REACT_APP_WS_IP,
	BILLING_URL: REACT_APP_BILLING_URL,
	SIP_URL: REACT_APP_SIP_URL,
	DEFAULT_COUNTRY: "uz",
	DEFAULT_LANGUAGE: "uz",
	API_LANGUAGES: [
		{ id: 1, code: "uz", title: "Узбек кирил" },
		{ id: 2, code: "oz", title: "O'zbek lotin" }
	]
};

export default config;
