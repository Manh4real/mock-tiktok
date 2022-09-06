import React from "react";
import clsx from "clsx";

// icons
import { SidebarDelimiter } from "./common";
import { Spinner } from "../icons";

// components
import Account from "./Account";

// styles
import styles from "./Sidebar.module.scss";

// hooks
// import { useLoginContext } from "_/contexts/AppContext";

// services
import { getFollowingAccounts } from "_/services/account";

// hooks
import { usePagesFetch } from "_/hooks";

// types
import { Account as AccountInterface } from "_/types";
import { useIsLoggedIn } from "_/features/currentUser/currentUserSlice";

const FollowingAccountsSection = () => {
  // const { currentUser, isLoggedIn } = useLoginContext();
  // const currentUserInfo = currentUser?.info.data;

  const isLoggedIn = useIsLoggedIn();

  const {
    results: accounts,
    end,
    loading,
    setResults,
    setPage,
    handleFetchNext,
  } = usePagesFetch<AccountInterface>(getFollowingAccounts, !isLoggedIn, {
    errorMessage: "Error: Can't get following accounts.",
  });

  const handleLoadMore = () => {
    if (end) {
      setResults((prev) => prev.slice(0, 5));
      setPage(1);
      return;
    }

    handleFetchNext();
  };

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
          {!loading && accounts.length <= 0 && <NoAccounts />}
          {accounts.length > 0 && (
            <div>
              {accounts.map((acc) => (
                <Account key={acc.id} account={acc} />
              ))}
            </div>
          )}
          {loading ? (
            <Spinner />
          ) : (
            <button
              className={clsx("pink-font", styles["sidebar__more-btn"])}
              onClick={handleLoadMore}
            >
              See {end ? "less" : "more"}
            </button>
          )}
        </div>
      </div>
      <SidebarDelimiter />
    </>
  );
};

const NoAccounts = () => {
  return <p className="small-font">No accounts here.</p>;
};

export default FollowingAccountsSection;
