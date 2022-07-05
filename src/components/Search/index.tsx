import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";

// api
import { getUsers } from "_/services/search";

// icons
import {
  MagnifyingGlass,
  Cancel as CancelIcon,
  Spinner,
} from "_/components/icons";

// components
import Results from "./Results";

// styles
import styles from "./Search.module.scss";

// types
import { SearchResult } from "_/types";

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState<string>(
    (location.pathname === "/search" && searchParams.get("q")) || ""
  );
  const [results, setResults] = useState<SearchResult[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const resultsElementRef = useRef<HTMLDivElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  // handling functions
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    setVisible(false);
    navigate("/search?q=" + inputValue);
  };

  const clearInput = () => {
    setInputValue("");
    setResults([]);
    inputRef.current?.focus();
  };

  // indicator
  const indicator = () => {
    if (inputValue !== "") {
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

  // effects
  useEffect(() => {
    if (!inputValue.trim()) {
      setResults([]);
      return;
    }

    const getResults = async () => {
      setLoading(true);

      try {
        const res = await getUsers(inputValue);
        setResults(res.data);
      } catch {
        console.log("Something went wrong when searching users...");
      } finally {
        setLoading(false);
      }
    };

    const timeID = setTimeout(() => {
      getResults();
    }, 600);

    return () => clearTimeout(timeID);
  }, [inputValue]);

  useEffect(() => {
    // styles
    if (resultsElementRef.current && searchContainerRef.current) {
      const pWidth = searchContainerRef.current.offsetWidth;
      resultsElementRef.current.style.width = pWidth + "px";
      resultsElementRef.current.style.maxWidth = pWidth + "px";
    }
  }, [results]);

  return (
    <div ref={searchContainerRef} className={styles["header__search-ctn"]}>
      <Tippy
        interactive
        onClickOutside={() => setVisible(false)}
        visible={visible && results.length > 0}
        render={(attrs) => (
          <div
            ref={resultsElementRef}
            className={styles["results"]}
            tabIndex={-1}
            {...attrs}
          >
            <Results
              results={results}
              search={inputValue}
              handleSearch={handleSearch}
            />
          </div>
        )}
      >
        <div className={styles["header__search"]}>
          <input
            ref={inputRef}
            type="text"
            id="search"
            value={inputValue}
            onChange={handleChange}
            onFocus={() => setVisible(true)}
            placeholder="Search accounts and videos"
            className={styles["header__search-input"]}
            autoComplete="off"
          />
          {indicator()}
          <span className={styles["header__search-delimiter"]}></span>
          <button
            className={styles["header__search-button"]}
            onClick={handleSearch}
          >
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
