import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiLockClosed } from "react-icons/hi";
import clsx from "clsx";

import { useCurrentUserInfo } from "_/features/currentUser/currentUserSlice";
import { clearVideoId } from "_/features/currentVideo/currentVideoSlice";
import { useAppDispatch } from "_/features/hooks";
import {
  resetVideos,
  selectAllVideos,
  setVideos,
} from "_/features/videos/videosSlice";
import { getLikedVideos } from "_/services/video";
import { Account, Video } from "_/types";

import ProfileVideos from "./ProfileVideos";

// styles
import styles from "./Profile.module.scss";

const cachedVideos = new Map<"liked" | "videos", Video[]>([]);

const VideoList = ({ account }: { account: Account }) => {
  const currentUserInfo = useCurrentUserInfo();

  const [loading, setLoading] = useState<boolean>(false);
  const [active, setActive] = useState<"videos" | "liked">("videos");

  // Redux
  const videos = useSelector(selectAllVideos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(resetVideos());
    dispatch(clearVideoId());

    if (active === "videos") {
      dispatch(setVideos(account.videos));

      cachedVideos.set("videos", account.videos);
      setLoading(false);
    } else if (active === "liked") {
      if (!currentUserInfo) return;
      if (currentUserInfo.id !== account.id) return;

      //
      const cachedLikedVideos = cachedVideos.get("liked");

      if (cachedLikedVideos) {
        dispatch(setVideos(cachedLikedVideos));

        setLoading(false);
      } else {
        getLikedVideos(account.id)
          .then((result) => {
            dispatch(setVideos(result.data));

            cachedVideos.set("liked", result.data);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [account.id, account.videos, active, currentUserInfo, dispatch]);

  return (
    <>
      <div className={styles["tabs"]}>
        <button
          className={clsx({ [styles["active"]]: active === "videos" })}
          onClick={() => {
            if (active !== "videos") setActive("videos");
          }}
        >
          Videos
        </button>
        <button
          disabled={currentUserInfo?.id !== account.id}
          className={clsx("flex-center", {
            [styles["active"]]: active === "liked",
          })}
          onClick={() => {
            if (!currentUserInfo) return;
            if (currentUserInfo.id !== account.id) return;

            if (active !== "liked") setActive("liked");
          }}
        >
          <HiLockClosed />
          <span>Liked</span>
        </button>
      </div>
      <main className={styles["main"]}>
        <ProfileVideos
          loading={loading}
          accountId={account.id}
          videos={videos}
        />
      </main>
    </>
  );
};

export default VideoList;
