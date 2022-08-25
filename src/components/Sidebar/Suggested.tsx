import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

// components
import AccountPopup from "_/components/AccountPopup";
import Account from "./Account";
import { SidebarDelimiter } from "./common";

// icons
import { Spinner } from "_/components/icons";

// styles
import styles from "./Sidebar.module.scss";

// services
import { getSuggestedAccounts } from "_/services/account";

// types
import { Account as AccountInterface } from "_/types";

function Suggested() {
  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [suggested, setSuggested] = useState<AccountInterface[]>([]);

  const handleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const shownAccounts = useMemo(() => {
    return showAll ? suggested : suggested.slice(0, 5);
  }, [showAll, suggested]);

  useEffect(() => {
    getSuggestedAccounts()
      .then((accounts) => {
        setSuggested(accounts);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
              {shownAccounts.map((item) => {
                return (
                  <AccountPopup account={item} key={item.id}>
                    <Account account={item} />
                  </AccountPopup>
                );
              })}
              {loading && <Spinner />}
            </div>
            <button
              className={clsx("pink-font", styles["sidebar__more-btn"])}
              onClick={handleShowAll}
            >
              See {showAll ? "less" : "all"}
            </button>
          </div>
        </div>
        <SidebarDelimiter />
      </>
    </React.Fragment>
  );
}

export default Suggested;
