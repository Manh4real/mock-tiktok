import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import clsx from "clsx";

// variables
import routes, { pagesTitle } from "_/config/routes";

// icons
import { IoMdShareAlt } from "react-icons/io";
import { HiLockClosed } from "react-icons/hi";
import { Spinner } from "_/components/icons";

// components
import Image from "_/components/Image";
import ProfileVideos from "./ProfileVideos";
import FollowSection from "./FollowSection";
import FeedShare from "_/components/FeedShare";
import EditButton from "./EditButton";

// hoc
// import { withResetVideos } from "_/hoc";

// styles
import styles from "./Profile.module.scss";

// utils
import { numberCompact } from "_/utils";

// types
import { Account, Video } from "_/types";
import { getLikedVideos } from "_/services/video";

// Redux
import {
  useCurrentUserInfo,
  useIsLoggedIn,
} from "_/features/currentUser/currentUserSlice";
import { useAppDispatch } from "_/features/hooks";
import {
  resetVideos,
  selectAllVideos,
  setVideos,
} from "_/features/videos/videosSlice";
import { useSelector } from "react-redux";
import { getAccount } from "_/features/accounts/accountsSlice";
import { clearVideoId } from "_/features/currentVideo/currentVideoSlice";

type PageTitleFunc = (name: string, username: string) => string;

function Profile() {
  const params = useParams();
  const [account, setAccount] = useState<Account>();
  const [loading, setLoading] = useState<boolean>(true);

  const currentUserInfo = useCurrentUserInfo();
  const isLoggedIn = useIsLoggedIn();
  const dispatch = useAppDispatch();

  const isCurrentUser = currentUserInfo
    ? isLoggedIn &&
      currentUserInfo &&
      account?.nickname === currentUserInfo.nickname
    : false;

  //
  useEffect(() => {
    setLoading(true);

    dispatch(getAccount(params.usernameParam as string))
      .unwrap()
      .then((acc) => {
        setAccount(acc);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.usernameParam, dispatch]);

  //
  // useEffect(() => {
  //   dispatch(resetVideos());
  //   dispatch(clearVideoId());
  // }, [dispatch]);

  // page title
  useEffect(() => {
    if (!account) return;

    const foo = pagesTitle[routes.profile] as PageTitleFunc;
    document.title = foo(
      `${account.first_name} ${account.last_name}`,
      account.nickname
    );
  }, [account]);

  if (loading) return <Spinner />;
  if (!account) return <h1>Profile Not Found.</h1>;

  const accountName = `${account.first_name} ${account.last_name}`;

  return (
    <div className={styles["container"]}>
      <header className={styles["header"]}>
        <div className={styles["info"]}>
          <div className={styles["upper"]}>
            <div className={styles["left"]}>
              <div className={styles["user-avatar"]}>
                <Image
                  className="circle"
                  width={116}
                  height={116}
                  src={account.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className={styles["right"]}>
              <h1
                className={clsx(
                  "text-overflow-elipse",
                  styles["user-nickname"]
                )}
                title={account.nickname}
              >
                {account.nickname}
              </h1>
              <h3 className={styles["user-name"]}>{accountName}</h3>

              {isCurrentUser ? (
                <EditButton account={account} />
              ) : (
                <FollowSection accountId={account.id} />
              )}
            </div>
            <FeedShare placement="bottom-end">
              <div className={styles["share-button"]}>
                <IoMdShareAlt />
              </div>
            </FeedShare>
          </div>
          <div className={styles["lower"]}>
            <div className={styles["numbers"]}>
              <span>
                <strong>{numberCompact(account.followings_count)}</strong>
                <span>Following</span>
              </span>
              <span>
                <strong>{numberCompact(account.followers_count)}</strong>
                <span>Followers</span>
              </span>
              <span>
                <strong>{numberCompact(account.likes_count)}</strong>
                <span>Likes</span>
              </span>
            </div>
            <div className={styles["bio"]}>{account.bio}</div>
          </div>
        </div>
      </header>
      <VideoList account={account} />
    </div>
  );
}

//============================================================================

const catchedVideos = new Map<"liked" | "videos", Video[]>([]);

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

      catchedVideos.set("videos", account.videos);
      setLoading(false);
    } else if (active === "liked") {
      if (!currentUserInfo) return;
      if (currentUserInfo.id !== account.id) return;

      //
      const catchedLikedVideos = catchedVideos.get("liked");

      if (catchedLikedVideos) {
        dispatch(setVideos(catchedLikedVideos));

        setLoading(false);
      } else {
        getLikedVideos(account.id)
          .then((result) => {
            dispatch(setVideos(result.data));

            catchedVideos.set("liked", result.data);
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

export default React.memo(Profile);
