import React, { useEffect, useRef } from "react";
import cn from "classnames";

import { useLongPress } from "hooks/useLongPress";

const phoneChars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "0", "*"];

export const CallWindow = React.forwardRef(
	(
		{
			phone,
			setPhone,
			isVisible,
			handleToggleVisibility,
			isOutsideCall,
			makeCall
		},
		ref
	) => {
		const inputRef = useRef();

		const { handlers } = useLongPress(
			() => setPhone(prev => prev.slice(0, -1)),
			() => setPhone("")
		);

		useEffect(() => {
			if (isVisible && inputRef.current) inputRef.current.focus();
		}, [isVisible]);

		return (
			<div
				className={cn("drop-down", { "drop-down_opened": isVisible })}
				ref={ref}>
				<button className="call-btn" onClick={handleToggleVisibility}>
					<img
						src={require("assets/images/svg/call-manual.svg")}
						alt=""
					/>
				</button>

				<div className="drop-down__inner">
					{isOutsideCall ? (
						<div className="call__income">
							<p className="call__income-subtitle">
								Входящий вызов
							</p>
							<h3 className="call__income-caller">Клиент</h3>
							<p className="call__income-phone">{phone}</p>

							<div className="d-flex">
								<button
									id="take-call-btn"
									className="call-keyboard__call">
									<img
										src={require("assets/images/svg/call-manual.svg")}
										alt=""
									/>
								</button>

								<button
									id="hangup-call-btn"
									className="call-keyboard__hangup ml_20 ">
									<img
										src={require("assets/images/svg/hangup.svg")}
										alt=""
									/>
								</button>
							</div>
						</div>
					) : (
						<form
							className="call-keyboard"
							onSubmit={event => {
								event.preventDefault();
								makeCall(event);
							}}>
							<input
								className="call-keyboard__phone"
								value={phone}
								ref={inputRef}
								onChange={event => setPhone(event.target.value)}
							/>

							<div className="row g-3">
								{phoneChars.map((item, index) => (
									<div className="col-4" key={index}>
										<button
											className="call-keyboard__number"
											type="button"
											onClick={() => {
												setPhone(
													prev => `${prev}${item}`
												);
											}}>
											{item}
										</button>
									</div>
								))}
								<div className="col-4" />
								<div className="col-4">
									<button
										className="call-keyboard__call"
										id="manual-call-btn"
										type="submit">
										<img
											src={require("assets/images/svg/call-manual.svg")}
											alt=""
										/>
									</button>
								</div>

								<div className="col-4">
									<button
										type="button"
										className="call-keyboard__backspace"
										{...handlers}>
										<img
											src={require("assets/images/svg/call-backspace.svg")}
											alt=""
										/>
									</button>
								</div>
							</div>
						</form>
					)}
				</div>
			</div>
		);
	}
);
