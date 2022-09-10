import React from "react";
import { Location, useLocation } from "react-router-dom";

// components
import VideoDetailsModal from "./VideoDetailsModal";
import VideoDetailsPage from "./VideoDetailsPage";

function VideoDetails() {
  const location = useLocation();

  const locationState = location.state as { background: Location } | null;
  const locationBackground = locationState?.background;

  if (locationBackground) return <VideoDetailsModal />;
  return <VideoDetailsPage />;
}

export default VideoDetails;
