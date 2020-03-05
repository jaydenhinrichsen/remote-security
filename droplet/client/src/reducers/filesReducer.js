import { GET_FILES } from "actions/types";

const initialState = {
  file: {},
  files: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FILES:
      return {
        ...state,
        files: action.payload
      };

    default:
      return state;
  }
}
