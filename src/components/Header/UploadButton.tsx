import React from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

// icons
import { Plus } from "_/components/icons";

// variables
import routes from "_/config/routes";

// styles
import styles from "./Header.module.scss";

// hoc
import { withLoginModal } from "_/hoc";

// Redux
import { useSelector } from "react-redux";
import { selectCurrentUserInfo } from "_/features/currentUser/currentUserSlice";

// types
import { WithLoginModal } from "_/hoc/withLoginModal";

interface Props extends WithLoginModal {}

const UploadButton = ({ showLoginModal }: Props) => {
  const currentUserInfo = useSelector(selectCurrentUserInfo);
  const isLoggedIn = !!currentUserInfo;

  const handleClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      showLoginModal();
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

export default withLoginModal(UploadButton);
