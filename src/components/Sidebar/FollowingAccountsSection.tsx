import React, { useEffect, useState } from "react";
import clsx from "clsx";

// icons
import { SidebarDelimiter } from "./common";
import { Spinner } from "../icons";

// components
import Account from "./Account";

// styles
import styles from "./Sidebar.module.scss";

// hooks
import { useLoginContext } from "_/contexts/AppContext";

// services
import { getFollowingAccounts } from "_/services/account";

// types
import { Account as AccountInterface } from "_/types";

const FollowingAccountsSection = () => {
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { isLoggedIn } = useLoginContext();

  useEffect(() => {
    getFollowingAccounts()
      .then((accounts) => {
        setAccounts(accounts);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
          {loading ? (
            <Spinner />
          ) : accounts.length <= 0 ? (
            <NoAccounts />
          ) : (
            <Accounts accounts={accounts} />
          )}
        </div>
      </div>
      <SidebarDelimiter />
    </>
  );
};

const Accounts = ({ accounts }: { accounts: AccountInterface[] }) => {
  return (
    <React.Fragment>
      <div>
        {accounts.map((acc) => (
          <Account key={acc.id} account={acc} />
        ))}
      </div>
      <button className={clsx("pink-font", styles["sidebar__more-btn"])}>
        See more
      </button>
    </React.Fragment>
  );
};

const NoAccounts = () => {
  return <p className="small-font">No accounts here.</p>;
};

export default FollowingAccountsSection;
