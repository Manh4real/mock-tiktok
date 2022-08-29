import React, { useCallback, useEffect, useState } from "react";
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

// types
import { Account } from "_/types";

function Search() {
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [results, setResults] = useState<Account[]>([]);

  //
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const handleLoadMore = () => {
    getResults();
  };

  const getResults = useCallback(() => {
    const query = searchParams.get("q");
    if (!query) return;

    if (page >= totalPage) return;

    setLoading(true);

    getUsers(query, "more", page + 1)
      .then((data) => {
        const rs = data.data as Account[];

        setResults((prev) => [...prev, ...rs]);

        //
        const currentPage = data.meta.pagination.current_page;
        setPage(currentPage);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams, page, totalPage]);

  useEffect(() => {
    const query = searchParams.get("q");
    if (!query) return;

    setLoading(true);

    getUsers(query, "more")
      .then((data) => {
        const rs = data.data as Account[];

        setResults(rs);

        //
        const total = data.meta.pagination.total_pages;
        setTotalPage(total);

        const currentPage = data.meta.pagination.current_page;
        setPage(currentPage);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams]);

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
      {page < totalPage && (
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
