import React from "react";
import clsx from "clsx";
import { Link, NavLink } from "react-router-dom";

// icons
import { Logo, Plus } from "_/components/icons";

// components
import CustomButton from "_/components/CustomButton";
import SearchBar from "_/components/Search";
import LoggedInSection from "./LoggedInSection";
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
          <NavLink
            to={routes.upload}
            className={({ isActive }) => {
              return clsx(styles["header__upload"], {
                [styles["header__upload--active"]]: isActive,
              });
            }}
          >
            <Plus /> Upload
          </NavLink>
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
