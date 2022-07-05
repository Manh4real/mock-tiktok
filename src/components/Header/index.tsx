import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

// icons
import { Logo, Plus } from "_/components/icons";

// components
import LoggedInSection from "./LoggedInSection";
import CustomButton from "_/components/CustomButton";
import SearchBar from "_/components/Search";
import More from "./More";

// styles
import styles from "./Header.module.scss";

// variables
import routes from "_/config/routes";

// types
interface Props {
  isFullWidth: boolean;
}

function Header({ isFullWidth }: Props) {
  const isLoggedIn = true;

  return (
    <div className={styles["header__container"]}>
      <div
        className={clsx(styles["header"], {
          [styles["header--fullWidth"]]: isFullWidth,
        })}
      >
        <Link to={routes.root} className={styles["header__logo"]}>
          <Logo />
        </Link>
        <SearchBar />
        <div className={styles["header__rightContainer"]}>
          <Link to={routes.upload} className={styles["header__upload"]}>
            <Plus /> Upload
          </Link>
          {isLoggedIn && <LoggedInSection />}
          {!isLoggedIn && (
            <>
              <CustomButton primary>Log in</CustomButton>
              <More />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
