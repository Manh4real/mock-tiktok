import React from "react";
import clsx from "clsx";

// hoc
import { withLoginModal } from "_/hoc";

// components
import CustomButton from "_/components/CustomButton";

// styles
import styles from "./Sidebar.module.scss";

// types
import { WithLoginModal } from "_/hoc/withLoginModal";

// Redux
import { useIsLoggedIn } from "_/features/currentUser/currentUserSlice";

interface Props extends WithLoginModal {}

const LogInSection = ({ showLoginModal }: Props) => {
  const isLoggedIn = useIsLoggedIn();

  const handleClick = () => {
    showLoginModal();
  };

  if (isLoggedIn) return <></>;

  return (
    <div
      className={clsx(
        styles["sidebar__section"],
        styles["sidbar__logInSection"]
      )}
    >
      <p style={{ color: "var(--grey-200)" }}>
        Log in to follow creators, like videos, and view comments.
      </p>
      <CustomButton
        style={{
          width: "100%",
          marginTop: "20px",
        }}
        large
        outlined
        onClick={handleClick}
      >
        Log in
      </CustomButton>
    </div>
  );
};

export default withLoginModal(LogInSection);
