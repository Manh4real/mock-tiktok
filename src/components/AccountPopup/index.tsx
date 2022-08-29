import React from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";

// components
import Image from "_/components/Image";
import FollowButton from "_/components/FollowButton";

// icons
import { VerifyBadge } from "_/components/icons";

// styles
import styles from "./AccountPopup.module.scss";

//
import { numberCompact } from "_/utils";

// types
import { Account as AccountInterface } from "_/types";

interface Props {
  account: AccountInterface;
  children: JSX.Element;
}

function AccountPopup({ account, children }: Props) {
  // handle click follow button
  const handleClick = (e: React.MouseEvent) => {
    console.log("Clicked Follow button of " + account.nickname);
  };

  return (
    //
    <div>
      <Tippy
        appendTo={document.body}
        interactive
        placement="bottom-start"
        delay={[500, 100]}
        render={(attrs) => (
          <div className={styles["AccountPopup"]} tabIndex={-1} {...attrs}>
            <div className={styles["header"]}>
              <Link to={"/@" + account.nickname} className={styles["avatar"]}>
                <Image src={account.avatar} width={44} height={44} />
              </Link>
              <FollowButton
                onClick={handleClick}
                accountId={account.id}
                isFollowed={account.is_followed}
              />
            </div>
            <Link to={"/@" + account.nickname}>
              <div className={styles["text"]}>
                <h4>
                  <span className={styles["username"]}>{account.nickname}</span>
                  {account.tick && <VerifyBadge />}
                </h4>
                <small className={styles["desc"]}>
                  {account.full_name ||
                    `${account.first_name} ${account.last_name}`}
                </small>
              </div>
            </Link>
            <div className={styles["numbers"]}>
              <span>
                <strong>{numberCompact(account.followers_count)}</strong>
                Followers
              </span>
              <span>
                <strong>{numberCompact(account.likes_count)}</strong>
                Likes
              </span>
            </div>
          </div>
        )}
      >
        {children}
      </Tippy>
    </div>
  );
}

export default AccountPopup;
