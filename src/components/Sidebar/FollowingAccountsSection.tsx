import React from "react";
import clsx from "clsx";

// icons
import { SidebarDelimiter } from "./common";

// styles
import styles from "./Sidebar.module.scss";
import Account from "./Account";

const FollowingAccountsSection = () => {
  const isLoggedIn = true;

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
            <Account username="squatuniversity" desc="Squat University" tick />
            <Account username="thejoestanek" desc="Joe Stanek" tick />
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
