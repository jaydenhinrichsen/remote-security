export function setLoading(reducer) {
  return dispatch => {
    dispatch({ type: "SET_LOADING", payload: reducer });
  };
}

export function setLoaded(reducer) {
  return dispatch => {
    dispatch({ type: "SET_LOADED", payload: reducer });
  };
}
