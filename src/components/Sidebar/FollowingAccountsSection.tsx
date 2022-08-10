import React from "react";
import clsx from "clsx";

// icons
import { SidebarDelimiter } from "./common";

// components
import Account from "./Account";

// styles
import styles from "./Sidebar.module.scss";

// hooks
import { useLoginContext } from "_/contexts/AppContext";

// types
import { Account as AccountInterface } from "_/types";

const FOLLOWING_DATA: Partial<AccountInterface>[] = [
  {
    id: 1,
    nickname: "squatuniversity",
    full_name: "Squat University",
    tick: true,
  },
  {
    id: 2,
    nickname: "thejoestanek",
    full_name: "Joe Stanek",
    tick: true,
  },
];

const FollowingAccountsSection = () => {
  const { isLoggedIn } = useLoginContext();

  if (!isLoggedIn) return <></>;

  return (
    <>
      <div
        className={clsx(
          styles["sidebar__section"],
          styles["sidebar__following-accs"]
        )}
      >
        <h5 className={styles["sidebar__header-title"]}>Following accounts</h5>
        <div className={styles["sidebar__accs__cnt"]}>
          <div>
            {FOLLOWING_DATA.map((acc) => (
              <Account key={acc.id} account={acc} />
            ))}
          </div>
          <button className={clsx("pink-font", styles["sidebar__more-btn"])}>
            See more
          </button>
        </div>
      </div>
      <SidebarDelimiter />
    </>
  );
};

export default FollowingAccountsSection;
