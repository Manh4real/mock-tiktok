import React from "react";
import clsx from "clsx";

// icons
import { FiEdit } from "react-icons/fi";

// styles
import styles from "./Profile.module.scss";

function EditButton() {
  return (
    <button
      className={clsx("grey-outlined", "flex-center", styles["edit-button"])}
    >
      <FiEdit />
      <span>Edit profile</span>
    </button>
  );
}

export default EditButton;
