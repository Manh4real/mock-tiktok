import React from "react";
import clsx from "clsx";

// icons
import { FiEdit } from "react-icons/fi";

// styles
import styles from "./Profile.module.scss";
import { useModalContext } from "_/contexts";

// components
import EditProfileModal from "./EditProfileModal";

// types
import { Account } from "_/types";

function EditButton({ account }: { account: Account }) {
  const { setAppModal } = useModalContext();

  const handleClick = () => {
    setAppModal(<EditProfileModal account={account} />);
  };

  return (
    <button
      onClick={handleClick}
      className={clsx("grey-outlined", "flex-center", styles["edit-button"])}
    >
      <FiEdit />
      <span>Edit profile</span>
    </button>
  );
}

export default EditButton;
