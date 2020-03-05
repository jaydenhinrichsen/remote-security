import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "antd/dist/antd.css";
import "./index.scss";

// Redux
import { Provider } from "react-redux";
import store from "./store";

import setAuthToken from "utils/setAuthToken";
setAuthToken();

serviceWorker.register();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
