import axios from "axios";
import { setLoading, setLoaded } from "./loadingActions";
import { setErrors, clearErrors } from "./errorActions";
import { SET_SYSTEM } from "./types";

export const setSystem = (control, data) => {
  return async dispatch => {
    try {
      const res = await axios.post("/api/system/", { control, data });
      dispatch({ type: SET_SYSTEM, payload: res.data });
    } catch (err) {
      setErrors("system", err.response.data);
    }
  };
};

export const setSystemTimes = values => {
  return async dispatch => {
    try {
      const res = await axios.post("/api/system/times", values);
      // dispatch({ type: SET_SYSTEM, payload: res.data });
    } catch (err) {
      setErrors("system", err.response.data);
    }
  };
};
