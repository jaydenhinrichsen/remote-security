import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Styles
import "./index.scss";

// // Actions
import { getFiles } from "actions/fileActions";

// Components
import LiveFeed from "./LiveFeed";
import AppLayout from "components/AppLayout";
import { VideoCameraOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Files from "./Files";
const Camera = () => {
  const dispatch = useDispatch();
  const params = useParams();
  // const files = useSelector(state => state.files);
  // const { loading } = useSelector(state => state.loading.files);
  const [liveView, setLiveView] = useState(false);

  useEffect(() => {
    dispatch(getFiles(params.camera_name));
  }, [params]);

  return (
    <AppLayout>
      <div className="media-container">
        {liveView && <LiveFeed camera_name={params.camera_name} />}
      </div>

      <div className="page-padding">
        <div className="stream-controls">
          <Button
            type="primary"
            ghost={liveView ? false : true}
            onClick={() => {
              setLiveView(!liveView);
            }}
          >
            <span> Live Feed</span>
            <VideoCameraOutlined />
          </Button>
        </div>
        <div className="scroll-container">
          {/* <Files
            loading={loading}
            files={!_.isEmpty(files.files) ? files.files : []}
          /> */}
        </div>
      </div>
    </AppLayout>
  );
};

export default Camera;
