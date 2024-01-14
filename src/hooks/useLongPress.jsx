// import React, { useRef, useState } from "react";
import { useRef, useState } from "react";

export const useLongPress = (onClick, onLongPress) => {
	const [action, setAction] = useState();

	const timerRef = useRef();
	const isLongPress = useRef();

	const startPressTimer = () => {
		isLongPress.current = false;
		timerRef.current = setTimeout(() => {
			isLongPress.current = true;
			setAction("longpress");
			onLongPress();
		}, 500);
	};

	const handleOnClick = e => {
		if (isLongPress.current) {
			onLongPress();
			return;
		}
		onClick();
		setAction("click");
	};

	const handleOnMouseDown = () => {
		startPressTimer();
	};

	const handleOnMouseUp = () => {
		clearTimeout(timerRef.current);
	};

	const handleOnTouchStart = () => {
		startPressTimer();
	};

	const handleOnTouchEnd = () => {
		if (action === "longpress") return;
		clearTimeout(timerRef.current);
	};

	return {
		action,
		handlers: {
			onClick: handleOnClick,
			onMouseDown: handleOnMouseDown,
			onMouseUp: handleOnMouseUp,
			onTouchStart: handleOnTouchStart,
			onTouchEnd: handleOnTouchEnd
		}
	};
};
