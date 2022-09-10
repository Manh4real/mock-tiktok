import React, { useImperativeHandle, useRef } from "react";

// styles
import styles from "./Post.module.scss";

// components
import Video from "_/components/Video";

// hooks
import { useNavigateToVideoDetails } from "_/hooks";

// types
import {
  Video as VideoInterface,
  VideoListType,
  VideoRefObject,
} from "_/types";

interface Props {
  video: VideoInterface;
  videoListType: VideoListType;
}

const VideoContainer = (
  { videoListType, video }: Props,
  ref: React.Ref<VideoRefObject>
) => {
  const navigate = useNavigateToVideoDetails(video.id);

  const videoRef = useRef<VideoRefObject>({
    pause: () => {},
    play: () => {},
  });
  useImperativeHandle(ref, () => videoRef.current);

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

export default React.forwardRef(VideoContainer);
