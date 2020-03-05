import _ from "lodash";
// Action Types
import { SET_USER, SET_TOKEN } from "actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.payload;

    default:
      return state;
  }
}
