import React from "react";
import clsx from "clsx";

// hoc
import { withLoggedIn } from "_/hoc";

// components
import CustomButton from "_/components/CustomButton";

// styles
import styles from "./Sidebar.module.scss";

// types
import { WithLoggedIn } from "_/hoc/withLoggedIn";

interface Props extends WithLoggedIn {}

const LogInSection = ({ handleLoggedInFuncClick }: Props) => {
  const handleClick = () => {
    handleLoggedInFuncClick();
  };

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

export default withLoggedIn(LogInSection);
