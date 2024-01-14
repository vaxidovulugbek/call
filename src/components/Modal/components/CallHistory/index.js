import React from "react";
import moment from "moment";

import { ReactComponent as FiPhone } from "assets/images/svg/fi_phone-call.svg";
import { ReactComponent as OffPhone } from "assets/images/svg/fi_chevron-down.svg";
import { constants } from "services";

function CallHistory({ status, history }) {
	return (
		<div className="history-items">
			<div className="history-call">
				<div className="history-number">{history.id}</div>
				<div className="history-tel">
					<span>Call a</span> {history.phone}
				</div>
			</div>
			<div style={{flex: "1 1 auto", textAlign: "right", paddingRight: "10px"}}>
				{moment.unix(history.created_at).format("DD.MM.YYYY HH:mm:ss")}
				</div>
			<div className="history-icon">
				<div className="history-icon">
					{status === constants.STATUS_END && <FiPhone />}
					{status === constants.STATUS_SELF && <OffPhone />}
				</div>
			</div>
		</div>
	);
}

export default CallHistory;
