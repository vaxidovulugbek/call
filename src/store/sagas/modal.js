import { takeLatest, put, all } from "redux-saga/effects";

import Modal from "../actions/modal";


function* ModalTrigger(action) {
    yield put(Modal.success(action.payload));
}


export default function* root() {
    yield all([
        takeLatest(Modal.TRIGGER, ModalTrigger),
    ]);
}