import { SET_SYSTEM } from "actions/types";

const initialState = {
  sirenOn: false,
  lightOn: false,
  sirenTime: 30,
  lightTime: 30
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SYSTEM:
      return {
        ...state,
        [action.payload.control]: action.payload.data
      };
    default:
      return state;
  }
}
