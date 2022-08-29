import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

// styles
import styles from "./Profile.module.scss";

// components
import ProfileVideo from "./ProfileVideo";
import Skeletons from "./Skeletons";

// services
// import { getPostsByAccountId } from "_/services/post";
// import { getUsersVideos } from "_/services/video";

// types
import { Video } from "_/types";
interface Props {
  accountId: number;
  videos: Video[];
}

const ProfileVideos = ({ videos }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [videoList, setVideoList] = useState<Video[]>([]);

  useEffect(() => {
    setLoading(true);
    const timeID = setTimeout(() => {
      // getPostsByAccountId(accountId)
      //   .then((vids: Post[]) => {
      //     setVideos(vids);
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });

      setVideoList(videos);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeID);
  }, [videos]);

  const content = useMemo(() => {
    return videoList.map((video) => (
      <div key={video.id} style={{ width: "100%" }}>
        <div className={styles["video"]}>
          <ProfileVideo
            poster={video.thumb_url}
            src={video.file_url}
            views={video.views_count}
          />
        </div>
        <div className={clsx(styles["content"], "text-overflow-elipse")}>
          <h3 className="text-overflow-elipse">{video.description}</h3>
        </div>
      </div>
    ));
  }, [videoList]);

  if (loading)
    return (
      <div className={styles["videos"]}>
        <Skeletons />
      </div>
    );

  return (
    <div className={styles["videos"]}>
      {videoList.length > 0 ? content : <strong>No videos yet.</strong>}
    </div>
  );
};

export default ProfileVideos;
