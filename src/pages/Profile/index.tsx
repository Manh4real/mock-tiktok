import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import clsx from "clsx";

// variables
import routes, { pagesTitle } from "_/config/routes";

// icons
import { IoMdShareAlt } from "react-icons/io";
import { Spinner } from "_/components/icons";

// components
import Image from "_/components/Image";
import ProfileVideos from "./ProfileVideos";
import FollowSection from "./FollowSection";
import FeedShare from "_/components/FeedShare";
import EditButton from "./EditButton";

// styles
import styles from "./Profile.module.scss";

// utils
import { numberCompact } from "_/utils";

// services
import { getAccountByNickname } from "_/services/account";

// types
import { Account, Video } from "_/types";
import { getLikedVideos } from "_/services/video";

// Redux
import {
  useCurrentUserInfo,
  useIsLoggedIn,
} from "_/features/currentUser/currentUserSlice";

type PageTitleFunc = (name: string, username: string) => string;

function Profile() {
  const params = useParams();
  const [account, setAccount] = useState<Account>();
  const [loading, setLoading] = useState<boolean>(true);

  const currentUserInfo = useCurrentUserInfo();
  const isLoggedIn = useIsLoggedIn();

  const isCurrentUser = currentUserInfo
    ? isLoggedIn &&
      currentUserInfo &&
      account?.nickname === currentUserInfo.nickname
    : false;

  //
  useEffect(() => {
    setLoading(true);
    getAccountByNickname(params.usernameParam as string)
      .then((acc) => {
        setAccount(acc);
      })
      .catch(() => {
        console.log("Can't get profile.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.usernameParam]);

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
                <FollowSection
                  accountId={account.id}
                  isFollowing={account.is_followed}
                />
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
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    setLoading(true);
    if (active === "videos") {
      setVideos(account.videos);
      catchedVideos.set("videos", account.videos);
      setLoading(false);
    } else if (active === "liked") {
      if (!currentUserInfo) return;
      if (currentUserInfo.id !== account.id) return;

      //
      const catchedLikedVideos = catchedVideos.get("liked");

      if (catchedLikedVideos) {
        setVideos(catchedLikedVideos);
        setLoading(false);
      } else {
        getLikedVideos(account.id)
          .then((result) => {
            setVideos(result.data);
            catchedVideos.set("liked", result.data);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [account.id, account.videos, active, currentUserInfo]);

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
          className={clsx({ [styles["active"]]: active === "liked" })}
          onClick={() => {
            if (!currentUserInfo) return;
            if (currentUserInfo.id !== account.id) return;

            if (active !== "liked") setActive("liked");
          }}
        >
          Liked
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
