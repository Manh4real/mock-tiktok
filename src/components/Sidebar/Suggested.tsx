import React from "react";
import clsx from "clsx";

// components
import Account from "./Account";
import { SidebarDelimiter } from "./common";

// styles
import styles from "./Sidebar.module.scss";

function Suggested() {
  return (
    <React.Fragment>
      <>
        <div
          className={clsx(
            styles["sidebar__section"],
            styles["sidebar__suggested-accs"]
          )}
        >
          <h5 className={styles["sidebar__header-title"]}>
            Suggested accounts
          </h5>
          <div className={styles["sidebar__accs__cnt"]}>
            <div>
              <Account
                username="selena_gomez2301 asdf asdf asdf sdf "
                desc="Selena Gomez"
                tick={true}
              />
              <Account username="21_savage" desc="21 Savage" tick={true} />
              <Account username="manh4real" desc="Nguyen Van Manh" />
              <Account username="4Lgang" desc="Gang gang" />
              <Account
                username="thebigsteppers"
                desc="Kendrick Lamar"
                tick={true}
              />
            </div>
            <button className={clsx("pink-font", styles["sidebar__more-btn"])}>
              See all
            </button>
          </div>
        </div>
        <SidebarDelimiter />
      </>
    </React.Fragment>
  );
}

export default Suggested;
