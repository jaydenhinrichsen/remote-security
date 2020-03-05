import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Styles
import "./index.scss";

// Actions
import { setSystem } from "actions/systemActions";

import { Layout, Menu, Button, Popover, Input, InputNumber } from "antd";
import {
  BulbOutlined,
  SoundOutlined,
  SettingOutlined
} from "@ant-design/icons";

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const system = useSelector(state => state.system);
  const handleSetSystem = (control, state) => {
    dispatch(setSystem(control, state));
  };

  return (
    <Layout className="app-layout">
      <Layout.Header className="app-nav">
        <Menu theme="light" mode="horizontal" style={{ lineHeight: "64px" }}>
          <Menu.Item key="1">
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/settings">Settings</Link>
          </Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content className="app-content">{children}</Layout.Content>
      <div className="app-controls">
        <Button
          shape="circle"
          type="danger"
          ghost={!system.sirenOn}
          icon={<SoundOutlined />}
          size="large"
          onClick={() => handleSetSystem("sirenOn", !system.sirenOn)}
        />
        <Button
          shape="circle"
          type="danger"
          ghost={!system.lightOn}
          icon={<BulbOutlined />}
          size="large"
          onClick={() => handleSetSystem("lightOn", !system.lightOn)}
        />
      </div>
    </Layout>
  );
};

export default AppLayout;
