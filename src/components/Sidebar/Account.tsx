import React from "react";
import { Link } from "react-router-dom";

// components
import Image from "_/components/Image";

// icons
import { VerifyBadge } from "_/components/icons";

// styles
import styles from "./Sidebar.module.scss";

// types
interface Props {
  username: string;
  desc: string;
  tick?: boolean;
}

function Account({ username, desc, tick = false }: Props) {
  return (
    <Link to={"/@" + username} className={styles["sidebar__accs-link"]}>
      <div className={styles["sidebar__acc-avatar"]}>
        <Image src="" />
      </div>
      <div className={styles["sidebar__accs-text"]}>
        <div className={styles["sidebar__acc-username"]}>
          <span>{username}</span>
          {tick && <VerifyBadge />}
        </div>
        <div className={styles["sidebar__acc-user-desc"]}>{desc}</div>
      </div>
    </Link>
  );
}

export default Account;
