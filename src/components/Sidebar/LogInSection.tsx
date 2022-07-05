import React from "react";
import clsx from "clsx";

// components
import CustomButton from "_/components/CustomButton";

// styles
import styles from "./Sidebar.module.scss";

const LogInSection = () => {
  return (
    <div className={clsx(styles["sidebar__section"])}>
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
      >
        <>Log in</>
      </CustomButton>
    </div>
  );
};

export default LogInSection;
