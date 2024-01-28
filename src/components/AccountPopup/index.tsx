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
import { Placement, Rect } from "@popperjs/core";
import { getAccountName } from "_/helpers";

interface Props {
  account: AccountInterface;
  children: JSX.Element;
  offset?:
    | [number, number]
    | (({
        placement,
        popper,
        reference,
      }: {
        placement: Placement;
        popper: Rect;
        reference: Rect;
      }) => [number, number])
    | undefined;
}

function AccountPopup({ offset, account, children }: Props) {
  const accountName = getAccountName(account);

  return (
    //
    <div>
      <Tippy
        zIndex={10000}
        appendTo={document.body}
        offset={offset}
        interactive
        placement="bottom-start"
        delay={[500, 100]}
        render={(attrs) => (
          <div className={styles["AccountPopup"]} tabIndex={-1} {...attrs}>
            <div className={styles["header"]}>
              <Link to={"/@" + account.nickname} className={styles["avatar"]}>
                <Image src={account.avatar} width={44} height={44} />
              </Link>
              <FollowButton accountId={account.id} />
            </div>
            <Link to={"/@" + account.nickname}>
              <div className={styles["text"]}>
                <h4>
                  <span className={styles["username"]}>{account.nickname}</span>
                  {account.tick && <VerifyBadge />}
                </h4>
                <small className={styles["desc"]}>{accountName}</small>
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
