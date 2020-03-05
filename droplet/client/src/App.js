import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { messaging } from "./init-fcm";
import _ from "lodash";
import { sendToken } from "actions/notificationActions";
import { BrowserRouter, Route } from "react-router-dom";

// Views
import Login from "views/Login";
import Dashboard from "views/Dashboard";
import Camera from "views/Camera";
import Settings from "views/Settings";
import Landing from "views/Landing";

function App() {
  const user = useSelector(state => state.user);
  useEffect(() => {
    messaging.getToken().then(token => {
      if (token) {
        sendToken({ token });
      } else {
        messaging
          .requestPermission()
          .then(async function() {
            messaging
              .getToken()
              .then(_token => sendToken({ token: _token }))
              .catch(err => console.log(err));
          })
          .catch(function(err) {
            console.log("Unable to get permission to notify.", err);
          });
      }
    });
    messaging.onTokenRefresh(() => {
      messaging
        .getToken()
        .then(refreshedToken => {
          sendToken({ token: refreshedToken });
        })
        .catch(err => {
          console.log("Unable to retrieve refreshed token ", err);
        });
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {!_.isEmpty(user.token) ? (
          <>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/camera/:camera_name" component={Camera} />
            {/* <Route exact path="/settings" component={Settings} /> */}
          </>
        ) : (
          <>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Landing} />
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
