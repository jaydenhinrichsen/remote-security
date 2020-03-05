import axios from "axios";
import { setLoading, setLoaded } from "./loadingActions";
import { setErrors, clearErrors } from "./errorActions";
import { GET_CAMERAS } from "./types";
export const getCameras = () => {
  return async dispatch => {
    setLoading("cameras");
    try {
      const res = await axios.get("/api/cameras");

      setLoaded("cameras");
      dispatch({ type: GET_CAMERAS, payload: res.data });
    } catch (err) {
      setErrors("cameras", err.response.data);
    }
  };
};
