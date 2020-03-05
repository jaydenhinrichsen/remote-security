import axios from "axios";
import store from "store";

import { auth } from "firebase";
const setAuthToken = () => {
  auth().onAuthStateChanged(user => {
    if (user) {
      user
        .getIdToken()
        .then(token => {
          axios.defaults.headers.common["x-auth-token"] = token;
          store.dispatch({ type: "SET_USER", payload: { user, token } });
        })
        .catch(err => console.log(err));
    }
  });
};

export default setAuthToken;
