import React from "react";

import "./BillingError.scss"

export const BillingError = ({subtitle = "Ваш аккаунт заблокирован"}) => {
	return (
		<div className="billing-error">
			<div className="billing-error__inner">
				<h1 className="billing-error__title">Напоминание</h1>
				<p className="billing-error__subtitle">{subtitle}</p>
				<button className="billing-error__close">Закрыть</button>
			</div>
		</div>
	);
};

