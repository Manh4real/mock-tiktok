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

// context
import { useLoginContext } from "_/contexts";

// types
import { Account } from "_/types";

type PageTitleFunc = (name: string, username: string) => string;

function Profile() {
  const params = useParams();
  const [account, setAccount] = useState<Account>();
  const [loading, setLoading] = useState<boolean>(true);

  const { isLoggedIn, currentUser, token } = useLoginContext();

  const isCurrentUser = currentUser
    ? isLoggedIn &&
      currentUser &&
      account?.nickname === currentUser.info.data.nickname
    : false;

  //
  useEffect(() => {
    setLoading(true);
    getAccountByNickname(params.usernameParam as string, token)
      .then((acc) => {
        setAccount(acc);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.usernameParam, token]);

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
              <h3 className={styles["user-name"]}>{account.full_name}</h3>

              {isCurrentUser ? (
                <EditButton />
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
                <strong>{numberCompact(account.followings_count)}</strong>{" "}
                Following
              </span>
              <span>
                <strong>{numberCompact(account.followers_count)}</strong>{" "}
                Followers
              </span>
              <span>
                <strong>{numberCompact(account.likes_count)}</strong> Likes
              </span>
            </div>
            <div className={styles["bio"]}>{account.bio}</div>
          </div>
        </div>
        <div className={styles["tabs"]}>
          <button className={styles["active"]}>Videos</button>
          <button>Liked</button>
        </div>
      </header>
      <main className={styles["main"]}>
        <ProfileVideos accountId={account.id} videos={account.videos} />
      </main>
    </div>
  );
}

export default Profile;
