import { get } from "lodash";

import config from "config";

let lastSavedToken = null;
// let lastSavedCallHistoryId = null;

export function WS_connect(operator_number) {
	let ws = new WebSocket(config.WS_API);
	window.readyState = ws.readyState;

	ws.addEventListener("open", event => {
		window.readyState = ws.readyState;
	});

	ws.addEventListener("message", res => {
		const { data, token, type, message } = JSON.parse(res.data);

		const phone = get(data, "phone");
		if (!phone && message !== "success") {
			const auth = {
				operator_number: operator_number,
				token: token || lastSavedToken,
				type: 1
			};
			ws.send(JSON.stringify(auth));
		}
		if (type === 2) {
			window.handleOpen({
				phone,
				...data,
				// call_history_id: lastSavedCallHistoryId || get(data, "call_history_id")
				call_history_id: get(data, "call_history_id")
			});
			window.client_number = phone;
		}
		if (type === 3 || type === 4) {
			if (window.callReceived) {
				window.callReceived();
			}
		}

		if (token) lastSavedToken = token;
		// if (get(data, "call_history_id")) lastSavedCallHistoryId = get(data, "call_history_id")
	});

	ws.addEventListener("close", event => {
		setTimeout(() => {
			WS_connect(operator_number);
		}, 3000);
	});

	ws.addEventListener("error", event => {
		ws.close();
	});
	// return ws;
}
