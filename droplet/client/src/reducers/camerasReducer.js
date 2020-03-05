import { GET_CAMERAS, CREATE_CAMERA } from "actions/types";

const initialState = {
  camera: {},
  cameras: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CAMERAS:
      return {
        ...state,
        cameras: action.payload
      };

    default:
      return state;
  }
}
