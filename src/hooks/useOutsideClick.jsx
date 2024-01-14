import { useState, useRef, useEffect } from "react";

export const useOutsideClick = (initialIsVisible, handler, condition) => {
	const [isVisible, setIsVisible] = useState(initialIsVisible);
	const ref = useRef(null);

	const handleToggleVisibility = event => {
		setIsVisible(prev => !prev);
	};

	const handleOpenMenu = () => {
		setIsVisible(true);
	};

	const handleCloseMenu = () => {
		setIsVisible(false);
	};

	const handleClickOutside = event => {
		if (
			condition !== undefined
				? condition
				: ref.current && !ref.current.contains(event.target)
		) {
			setIsVisible(false);
			handler && handler(event);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return {
		ref,
		isVisible,
		setIsVisible,
		handleToggleVisibility,
		handleOpenMenu,
		handleCloseMenu
	};
};
