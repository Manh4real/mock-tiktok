import React from "react";
import { Link } from "react-router-dom";

// components
import Image from "_/components/Image";

// icons
import { OnLiveIndicator, VerifyBadge } from "_/components/icons";

// styles
import styles from "./Sidebar.module.scss";

// types
import { Account as AccountInterface } from "_/types";

interface Props {
  account: Partial<AccountInterface>;
}

function Account({ account }: Props, ref: React.Ref<HTMLDivElement>) {
  const {
    nickname,
    avatar,
    first_name,
    last_name,
    tick = false,
    onLive = false,
  } = account;
  const onLiveImageStyle = onLive ? { width: "26px", height: "26px" } : {};

  return (
    <div ref={ref}>
      <Link to={"/@" + nickname} className={styles["sidebar__accs-link"]}>
        <div className={styles["sidebar__acc-avatar"]}>
          <div className={styles["avatar__image-ctn"]} style={onLiveImageStyle}>
            <Image src={avatar} />
          </div>
          {onLive && <OnLiveIndicator className={styles["onlive-indicator"]} />}
        </div>
        <div className={styles["sidebar__accs-text"]}>
          <div className={styles["sidebar__acc-username"]}>
            <span>{nickname}</span>
            {tick && <VerifyBadge />}
          </div>
          <div
            className={styles["sidebar__acc-user-desc"]}
          >{`${first_name} ${last_name}`}</div>
        </div>
      </Link>
    </div>
  );
}

export default React.forwardRef(Account);
