import React from "react";
// Styles
import "./index.scss";
import LandingBackground from "assets/landing_background.svg";

import { Typography, Button } from "antd";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div className="landing">
      <Typography.Title level={2}>Remote Security</Typography.Title>
      <Link className="login-link" to="/login">
        Sign in to get started
      </Link>

      <a href="/">
        <GithubOutlined className="github-link" />
      </a>

      <img src={LandingBackground} className="landing-background" />
    </div>
  );
};

export default Landing;
