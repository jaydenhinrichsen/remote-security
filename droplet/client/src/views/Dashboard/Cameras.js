import React from "react";
import { Link } from "react-router-dom";
import { List, Card, Button, Typography } from "antd";

const Cameras = ({ cameras, loading }) => {
  console.log(cameras);
  return (
    <List
      itemLayout="vertical"
      dataSource={cameras}
      loading={loading}
      renderItem={item => {
        return (
          <Card className="level">
            <div className="left">
              <Typography.Title level={4} style={{ margin: 0 }}>
                {item.name}
              </Typography.Title>
            </div>
            <div className="right">
              <Link to={`/camera/${item.name}`}>
                <Button type="primary">View</Button>
              </Link>
            </div>
          </Card>
        );
      }}
    />
  );
};

export default Cameras;
