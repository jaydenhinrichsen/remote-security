import { SET_ERRORS, CLEAR_ERRORS } from "actions/types";

const initialState = {
  user: {},
  camera: {},
  cameras: {},
  file: {},
  files: {},
  system: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        [action.payload.reducer]: action.payload.errors
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        [action.payload.reducer]: {}
      };
    default:
      return state;
  }
}
