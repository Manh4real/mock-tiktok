import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless";

import {
  MagnifyingGlass,
  Cancel as CancelIcon,
  Spinner,
  VerifyBadge,
} from "_/components/icons";
import Popper from "_/components/Popper";

import styles from "./Search.module.scss";

function Search() {
  const [value, setValue] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const resultsElementRef = useRef<HTMLDivElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clearInput = () => {
    setValue("");
    setResults([]);
    inputRef.current?.focus();
  };

  const indicator = () => {
    if (value !== "") {
      if (loading) {
        return (
          <div className={styles["header__search-loading"]}>
            <Spinner />
          </div>
        );
      }
      return (
        <button
          onClick={clearInput}
          className={styles["header__search-cancel-btn"]}
        >
          <CancelIcon />
        </button>
      );
    } else return "";
  };

  // fake loading
  useEffect(() => {
    setLoading(true);
    const timeID = setTimeout(() => {
      // setResults([
      //   "gang",
      //   "mexicanomexicanomexicanomexicanomexicanomexicanomexicanomexicanomexicano",
      //   "gang",
      //   "mexicano",
      //   "gang",
      //   "mexicano",
      //   "gang",
      //   "mexicano",
      //   "gang",
      //   "mexicano",
      //   "gang",
      //   "mexicano",
      // ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeID);
  }, [value]);

  // styles
  useEffect(() => {
    if (resultsElementRef.current && searchContainerRef.current) {
      const pWidth = searchContainerRef.current.offsetWidth;
      resultsElementRef.current.style.width = pWidth + "px";
      resultsElementRef.current.style.maxWidth = pWidth + "px";
    }
  }, [results]);

  return (
    <div ref={searchContainerRef} className={styles["header__search-ctn"]}>
      <Tippy
        interactive={true}
        visible={results.length !== 0}
        placement="bottom"
        render={(attrs) => (
          <div
            ref={resultsElementRef}
            className={styles["results"]}
            tabIndex={-1}
            {...attrs}
          >
            <div className={styles["results__wrapper"]}>
              <Popper>
                <React.Fragment>
                  <h5 className={styles["results__title"]}>Accounts</h5>
                  <div className={styles["results__cont"]}>
                    {results.map((r, i) => (
                      <div key={i} className={styles["results__item"]}>
                        <span className={styles["results__item-image"]}>
                          <img src="https://picsum.photos/200" alt="" />
                        </span>
                        <div className={styles["results__item-accNames"]}>
                          <div
                            className={styles["results__item-accDisplayName"]}
                          >
                            <span>{r}</span> <VerifyBadge w={12} h={12} />
                          </div>
                          <div className={styles["results__item-accUsername"]}>
                            {r}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              </Popper>
            </div>
          </div>
        )}
      >
        <div className={styles["header__search"]}>
          <input
            ref={inputRef}
            type="text"
            id="search"
            value={value}
            onChange={handleChange}
            placeholder="Search accounts and videos"
            className={styles["header__search-input"]}
          />
          {indicator()}
          <span className={styles["header__search-delimiter"]}></span>
          <button className={styles["header__search-button"]}>
            <MagnifyingGlass />
          </button>
          <div
            className={styles["header__search-input--focused-outline"]}
          ></div>
        </div>
      </Tippy>
    </div>
  );
}

export default Search;
