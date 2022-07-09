import React from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";

// components
import Image from "_/components/Image";
import CustomButton from "_/components/CustomButton";

// icons
import { VerifyBadge } from "_/components/icons";

// styles
import styles from "./AccountPopup.module.scss";

// types
import { SuggestedItem } from "./Suggested";

interface Props {
  account: SuggestedItem;
  children: JSX.Element;
}

function numberCompact(number: number | undefined) {
  if (number === undefined) return null;

  const a = ["", "K", "M", "B", "T"];
  const thou = Math.pow(10, 3);

  let temp = number;
  let affix = a[0];
  let i = 0;

  while (Math.floor(Math.abs(temp / thou)) > 0) {
    if (i >= a.length - 1) break;
    temp = temp / thou;

    affix = a[++i];
  }

  if (temp % 1 === 0) return temp + affix;

  return temp.toFixed(1) + affix;
}

function AccountPopup({ account, children }: Props) {
  return (
    //
    <div>
      <Tippy
        appendTo={document.body}
        interactive
        placement="bottom-start"
        delay={[300, 100]}
        render={(attrs) => (
          <div className={styles["AccountPopup"]} tabIndex={-1} {...attrs}>
            <div className={styles["header"]}>
              <Link to={"/@" + account.nickname} className={styles["avatar"]}>
                <Image src={account.avatar} width={44} height={44} />
              </Link>
              <CustomButton primary>Follow</CustomButton>
            </div>
            <Link to={"/@" + account.nickname}>
              <div className={styles["text"]}>
                <h4>
                  <span
                    className={styles["username"]}
                    style={{ marginRight: "10px" }}
                  >
                    {account.nickname}
                  </span>
                  {account.tick && <VerifyBadge />}
                </h4>
                <small className={styles["desc"]}>{account.full_name}</small>
              </div>
            </Link>
            <div className={styles["numbers"]}>
              <span>
                <strong>
                  {numberCompact(account.followers_count) || "--"}
                </strong>
                Followers
              </span>
              <span>
                <strong>{numberCompact(account.likes_count) || "--"}</strong>{" "}
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
