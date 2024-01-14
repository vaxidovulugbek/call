import { createRoutine } from "redux-saga-routines";

const ChangeLanguage = createRoutine("CHANGE_LANGUAGE");
const ChangeCountry = createRoutine("CHANGE_COUNTRY");
const Reset = createRoutine("RESET");
const Callback = createRoutine("CALLBACK");
const UploadFile = createRoutine("UPLOAD_FILE");
const DeleteFile = createRoutine("DELETE_FILE");
const GetColors = createRoutine("GET_COLORS");


export default {
  ChangeLanguage,
  ChangeCountry,
  Reset,
  Callback,
  UploadFile,
  DeleteFile,
  GetColors
};
