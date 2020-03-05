import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCameras } from "actions/cameraActions";
// Styles
import "./index.scss";
// Components
import AppLayout from "components/AppLayout";
import { Typography } from "antd";
import Cameras from "./Cameras";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { cameras } = useSelector(state => state.cameras);
  const { loading, loaded } = useSelector(state => state.loading.cameras);
  useEffect(() => {
    dispatch(getCameras());
  }, []);
  return (
    <AppLayout>
      <div className="page-padding">
        <Typography.Title level={2}>Dashboard</Typography.Title>
        <Cameras cameras={cameras} loading={loading} />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
