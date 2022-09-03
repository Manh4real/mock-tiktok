import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

// styles
import styles from "./SearchPage.module.scss";

// icons
import { VerifyBadge } from "_/components/icons";

// components
import Image from "_/components/Image";

// utils
import { numberCompact } from "_/utils";

// types
import { Account } from "_/types";

interface Props {
  account: Account;
}

const ResultRow = ({ account }: Props) => {
  const accountName =
    account.full_name || `${account.first_name} ${account.last_name}`;

  return (
    <div className={styles["row"]}>
      <Link
        to={"/@" + account.nickname}
        className={clsx("flex-align-center", styles["link"])}
      >
        <div className={styles["left"]}>
          <div className={clsx(styles["image"], "circle")}>
            <Image src={account.avatar} width={60} height={60} />
          </div>
        </div>
        <div className={styles["right"]}>
          <h3 className={styles["nickname"]}>
            {account.nickname} {account.tick && <VerifyBadge />}
          </h3>
          <p className={styles["subtitle"]}>
            {accountName}
            <span style={{ marginInline: 5 }}>&middot;</span>
            <span>
              <strong>{numberCompact(account.followers_count)} </strong>
              Followers
            </span>
          </p>
          <p className={styles["bio"]}>{account.bio}</p>
        </div>
      </Link>
    </div>
  );
};

export default ResultRow;
