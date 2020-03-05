import React, { useEffect } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";

const LiveFeed = ({ camera_name }) => {
  useEffect(() => {
    let livePlayerElement = document.getElementById("live-player");
    let liveVideo = new JSMpeg.VideoElement(
      livePlayerElement,
      `wss://your-domain/${camera_name}`
    );
    return () => {
      liveVideo.destroy();
    };
  }, []);
  return <div id="live-player"></div>;
};

export default LiveFeed;
