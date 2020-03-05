import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSystem } from "actions/systemActions";
// Hooks
import useForm from "hooks/useForm";
// Styles
import "./index.scss";
// Components
import AppLayout from "components/AppLayout";
import { Typography, InputNumber, Button, Card, Form } from "antd";
const Dashboard = () => {
  const dispatch = useDispatch();
  const system = useSelector(state => state.system);

  const handleSetSystem = () => {
    dispatch(setSystem(values));
  };

  const { values, handleChange, handleSubmit } = useForm(handleSetSystem, {});

  return (
    <AppLayout>
      <div className="page-padding">
        <Typography.Title level={2}>Settings</Typography.Title>
        <Form onSubmitCapture={handleSubmit} style={{ maxWidth: 300 }}>
          <Card>
            <Form.Item label="Siren Duration">
              <InputNumber
                min={15}
                max={120}
                defaultValue={30}
                onChange={handleChange}
                name="sirenTime"
                value={values.sirenTime || system.sirenTime}
              />
            </Form.Item>
            <Form.Item label="Light Duration">
              <InputNumber
                min={15}
                block
                max={120}
                defaultValue={30}
                onChange={handleChange}
                name="lightTime"
                value={values.lightTime || system.sirenTime}
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" block>
                Update Settings
              </Button>
            </Form.Item>
          </Card>
        </Form>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
