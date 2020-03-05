import { combineReducers } from "redux";

import userReducer from "./userReducer";
import camerasReducer from "./camerasReducer";
import filesReducer from "./filesReducer";
import systemReducer from "./systemReducer";
import errorsReducer from "./errorsReducer";
import loadingReducer from "./loadingReducer";

export default combineReducers({
  user: userReducer,
  cameras: camerasReducer,
  files: filesReducer,
  system: systemReducer,
  errors: errorsReducer,
  loading: loadingReducer
});
