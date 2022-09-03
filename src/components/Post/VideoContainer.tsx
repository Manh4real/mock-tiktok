import React, { useRef } from "react";

// styles
import styles from "./Post.module.scss";

// components
import Video from "_/components/Video";

// hooks
import { useNavigateToVideoDetails } from "_/hooks";

// types
import { Video as VideoInterface, VideoRefObject } from "_/types";

interface Props {
  video: VideoInterface;
}

const VideoContainer = ({ video }: Props) => {
  const videoRef = useRef<VideoRefObject>(null);
  const navigate = useNavigateToVideoDetails(video.id);

  return (
    <div
      className={styles["post__video"]}
      onDoubleClick={(e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        //PostDetails
        navigate();
      }}
    >
      <Video
        ref={videoRef}
        src={video.file_url}
        placeholder={video.thumb_url}
        postId={video.id}
      />
    </div>
  );
};

export default VideoContainer;
