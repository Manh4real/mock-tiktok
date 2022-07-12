import React, { useContext } from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

// icons
import { Plus } from "_/components/icons";

// variables
import routes from "_/config/routes";

// styles
import styles from "./Header.module.scss";

// hoc
import { withLoggedIn } from "_/hoc";

// context
import { LoginContext } from "_/App";

// types
import { WithLoggedIn } from "_/hoc/withLoggedIn";

interface Props extends WithLoggedIn {}

const UploadButton = ({ handleLoggedInFuncClick }: Props) => {
  const { isLoggedIn } = useContext(LoginContext);

  const handleClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      handleLoggedInFuncClick();
    }
  };

  return (
    <NavLink
      to={routes.upload}
      className={({ isActive }) => {
        return clsx(styles["header__upload"], {
          [styles["header__upload--active"]]: isActive,
        });
      }}
      onClick={handleClick}
    >
      <Plus /> Upload
    </NavLink>
  );
};

export default withLoggedIn(UploadButton);
