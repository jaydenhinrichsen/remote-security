import { SET_LOADING, SET_LOADED } from "actions/types";

const initialState = {
  user: {
    loading: false,
    loaded: false
  },
  camera: {
    loading: false,
    loaded: false
  },
  cameras: {
    loading: false,
    loaded: false
  },
  file: {
    loading: false,
    loaded: false
  },
  files: {
    loading: false,
    loaded: false
  },
  files: {
    loading: false,
    loaded: false
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        [action.payload]: {
          loading: true,
          loaded: false
        }
      };
    case SET_LOADED:
      return {
        ...state,
        [action.payload]: {
          loading: false,
          loaded: true
        }
      };
    default:
      return state;
  }
}
