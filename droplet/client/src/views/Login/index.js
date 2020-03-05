import React from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Link, useHistory } from "react-router-dom";
import { auth } from "firebase";
// Hooks
import useForm from "hooks/useForm";
// Actions

// Styles
import "./index.scss";
import LandingBackground from "assets/landing_background.svg";

import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
// Antd
import { Form, Checkbox, Input, Button, Card, Typography } from "antd";
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const errors = useSelector(state => state.errors.user);
  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(user => history.push("/"))
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const { values, handleChange, handleSubmit } = useForm(handleLogin, {});
  console.log(values);
  return (
    <div className="login">
      {/* <Typography.Title level={2}>Login</Typography.Title> */}
      {/* <Link className="login-link" to="/login">
        Sign in to get started
      </Link> */}

      <a href="/">
        <GithubOutlined className="github-link" />
      </a>

      <div className="login-form-container">
        <Form
          onSubmitCapture={handleSubmit}
          style={{ maxWidth: 300 }}
          className="login-form"
        >
          <Form.Item
            help={errors.email}
            validateStatus={errors.email && "error"}
          >
            <Input
              placeholder="Email"
              onChange={handleChange}
              type="text"
              name="email"
              value={values.email || ""}
            />
          </Form.Item>
          <Form.Item
            help={errors.password}
            validateStatus={errors.password && "error"}
          >
            <Input
              placeholder="Password"
              onChange={handleChange}
              type="password"
              name="password"
              value={values.password || ""}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" ghost htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
      <img src={LandingBackground} className="landing-background" />
    </div>
  );
};

export default Login;
