import React from "react";

// hooks
import { useBackgroundLocation } from "_/hooks";

// components
import VideoDetailsModal from "./VideoDetailsModal";
import VideoDetailsPage from "./VideoDetailsPage";

function VideoDetails() {
  const { backgroundLocation } = useBackgroundLocation();

  if (backgroundLocation) return <VideoDetailsModal />;
  return <VideoDetailsPage />;
}

export default VideoDetails;
