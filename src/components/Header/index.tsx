import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

// icons
import { Logo } from "_/components/icons";

// components
import SearchBar from "_/components/Search";
import More from "./More";
import LoggedInSection from "./LoggedInSection";
import UploadButton from "./UploadButton";
import LoginButton from "./LoginButton";

// styles
import styles from "./Header.module.scss";

// variables
import routes from "_/config/routes";

// Redux
import { useIsLoggedIn } from "_/features/currentUser/currentUserSlice";

// types
interface Props {
  isFullWidth: boolean;
}

function Header({ isFullWidth }: Props) {
  const isLoggedIn = useIsLoggedIn();

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
          <UploadButton />
          {isLoggedIn && <LoggedInSection />}
          {!isLoggedIn && (
            <>
              <LoginButton />
              <More />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
