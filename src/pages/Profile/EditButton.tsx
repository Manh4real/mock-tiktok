import React from "react";
import clsx from "clsx";

// icons
import { FiEdit } from "react-icons/fi";

// styles
import styles from "./Profile.module.scss";

// components
import EditProfileModal from "./EditProfileModal";

// hooks
import { useModal } from "_/hooks";

// types
import { Account } from "_/types";

function EditButton({ account }: { account: Account }) {
  const { isOpened, handleClose, handleOpen } = useModal();

  const handleClick = () => {
    handleOpen();
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={clsx("grey-outlined", "flex-center", styles["edit-button"])}
      >
        <FiEdit />
        <span>Edit profile</span>
      </button>
      {isOpened && (
        <EditProfileModal handleClose={handleClose} account={account} />
      )}
    </>
  );
}

export default EditButton;
