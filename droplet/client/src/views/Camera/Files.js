import React from "react";
import { List, Card, Button } from "antd";
import { format } from "date-fns";

const Files = ({ files, loading, handleViewFile }) => {
  return (
    <List
      className="files"
      loading={loading}
      itemLayout="vertical"
      dataSource={files}
      split={false}
      renderItem={item => {
        return (
          <Card className="level file-card">
            <div className="left">{format(new Date(item.date), "PPpp")}</div>
            <div className="right">
              <Button
                size="small"
                type="primary"
                // onClick={() => handleViewFile(item)}
              >
                View
              </Button>
            </div>
          </Card>
        );
      }}
    />
  );
};

export default Files;
