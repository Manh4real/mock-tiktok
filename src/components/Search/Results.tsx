import React from "react";
import { Link } from "react-router-dom";

// icons
import { VerifyBadge } from "_/components/icons";

// styles
import styles from "./Results.module.scss";

// types
import { SearchResult } from "_/types";

// components

interface Props {
  results: SearchResult[];
  search: string;
  handleSearch: () => void;
}

function Results({ results, search, handleSearch }: Props) {
  return (
    <div className={styles["results__wrapper"]}>
      <h5 className={styles["results__title"]}>Accounts</h5>
      <div className={styles["results__cont"]}>
        {results.map((r) => (
          <Link
            to={"/@" + r.nickname}
            key={r.id}
            className={styles["results__item"]}
          >
            <span className={styles["results__item-image"]}>
              <img src={r.avatar} alt={r.full_name} />
            </span>
            <div className={styles["results__item-accNames"]}>
              <div className={styles["results__item-accDisplayName"]}>
                <span>{r.full_name}</span>
                {r.tick && <VerifyBadge w={12} h={12} />}
              </div>
              <div className={styles["results__item-accUsername"]}>
                {r.nickname}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <button className={styles["results__viewAllBtn"]} onClick={handleSearch}>
        View all results for "{search}"
      </button>
    </div>
  );
}

export default Results;
