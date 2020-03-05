export function setErrors(reducer, errors) {
  return dispatch => {
    dispatch({ type: "SET_ERRORS", payload: { reducer, errors } });
  };
}

export function clearErrors(reducer) {
  return dispatch => {
    dispatch({ type: "CLEAR_ERRORS", payload: { reducer } });
  };
}
