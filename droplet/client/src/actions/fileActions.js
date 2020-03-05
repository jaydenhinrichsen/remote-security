import axios from "axios";
import { setLoading, setLoaded } from "./loadingActions";
import { setErrors, clearErrors } from "./errorActions";
import { GET_FILES } from "./types";
export const getFiles = () => {
  return async dispatch => {
    setLoading("files");
    try {
      const res = await axios.get("/api/files");

      setLoaded("files");
      dispatch({ type: GET_FILES, payload: res.data });
    } catch (err) {
      setErrors("files", err.response.data);
    }
  };
};
