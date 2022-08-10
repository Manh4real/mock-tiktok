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

// hooks
import { useLoginContext } from "_/contexts/AppContext";

// types
interface Props {
  isFullWidth: boolean;
}

function Header({ isFullWidth }: Props) {
  const { isLoggedIn } = useLoginContext();

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
