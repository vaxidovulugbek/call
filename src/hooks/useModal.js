import { useState } from "react";
import { useDispatch } from "react-redux";

import Modal from "store/actions/modal";
import { isFunction } from "lodash";

export const useModal = ({ initialIsOpen, onOpen, onClose } = {}) => {
	const [isOpen, setIsOpen] = useState(initialIsOpen);
	const dispatch = useDispatch();

	const handleOpen = () => {
		if (isFunction(onOpen)) {
			onOpen();
		}

		setIsOpen(true);
		dispatch({ type: "open", payload: {} });
	};

	const handleClose = () => {
		if (isFunction(onClose)) {
			onClose();
		}

		dispatch(Modal.success());
		setIsOpen(false);
	};

	return { isOpen, handleOpen, handleClose };
};


