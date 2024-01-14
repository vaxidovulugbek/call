import { createRoutine } from "redux-saga-routines";
const GetMeRequest = createRoutine("GET_ME");
const Logout = createRoutine("LOGOUT");
const SetToken = createRoutine("SET_TOKEN");
const CheckBilling = createRoutine("CHECK_BILLING")

export default {
    GetMeRequest,
    Logout,
    SetToken,
    CheckBilling
};
