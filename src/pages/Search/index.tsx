import React, { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";

// icons
import { BsChevronDown } from "react-icons/bs";
import { Spinner } from "_/components/icons";

// components
import ResultRow from "./ResultRow";

// variables
import routes, { pagesTitle } from "_/config/routes";

// styles
import styles from "./SearchPage.module.scss";

// services
import { getUsers } from "_/services/search";

// hooks
import { usePagesFetch } from "_/hooks";

// types
import { Account } from "_/types";

function Search() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");

  const fetchUsers = useCallback(
    (page?: number) => {
      return getUsers(query as string, "more", page);
    },
    [query]
  );

  const {
    handleFetchNext: handleLoadMore,
    hasMore,
    loading,
    results,
  } = usePagesFetch<Account>(fetchUsers, !query, {
    errorMessage: "Search Error: Something went wrong.",
  });

  // page title
  useEffect(() => {
    const foo = pagesTitle[routes.search] as any;
    document.title = foo(searchParams.get("q"));
  }, [searchParams]);

  if (loading && results.length <= 0) return <Spinner />;

  if (results.length <= 0) {
    return (
      <div className={styles["container"]}>
        <p>
          <strong>No accounts found.</strong>
        </p>
      </div>
    );
  }

  return (
    <div className={styles["container"]}>
      <header className={clsx("flex-align-center")}>
        <p className={clsx("flex-center", styles["title"])}>Accounts</p>
      </header>
      <div className={styles["results"]}>
        {results.map((result) => {
          return <ResultRow key={result.nickname} account={result} />;
        })}
      </div>
      {hasMore && (
        <div className={clsx("flex-center")}>
          <button
            className={clsx("flex-center", styles["load-more-button"])}
            onClick={handleLoadMore}
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <span>Load more</span> <BsChevronDown />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;
