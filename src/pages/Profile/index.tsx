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
import FollowSection from "./FollowSection";
import FeedShare from "_/components/FeedShare";
import EditButton from "./EditButton";
import NotFoundProfileMessage from "./NotFoundProfileMessage";
import VideoList from "./VideoList";

// styles
import styles from "./Profile.module.scss";

// utils
import { numberCompact } from "_/utils";

// types
import { Account } from "_/types";

// Redux
import {
  useCurrentUserInfo,
  useIsLoggedIn,
} from "_/features/currentUser/currentUserSlice";
import { useAppDispatch } from "_/features/hooks";
import { getAccount } from "_/features/accounts/accountsSlice";
import { getAccountName } from "_/helpers";

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

  // page title
  useEffect(() => {
    if (!account) return;

    const getPageTitle = pagesTitle[routes.profile];
    document.title = getPageTitle(getAccountName(account), account.nickname);
  }, [account]);

  if (loading)
    return (
      <div className="flex-center" style={{ height: "100%" }}>
        <Spinner style={{ width: 30, height: 30 }} />
      </div>
    );
  if (!account) return <NotFoundProfileMessage />;

  const accountName = getAccountName(account);

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

export default React.memo(Profile);
