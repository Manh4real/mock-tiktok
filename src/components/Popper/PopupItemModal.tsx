import React from "react";
import { useModal } from "_/hooks";
import { ModalProps } from "_/types";

// types
interface Props {
  modal: React.FC<ModalProps>;
  className: string;
  children: React.ReactNode;
}

const PopupItemModal = ({ className, modal, children }: Props) => {
  const { isOpened, handleOpen, handleClose } = useModal();
  const Modal = modal;

  const handleClick = () => {
    handleOpen();
    // console.log("??");
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
      {isOpened && <Modal handleClose={handleClose} />}
    </div>
  );
};

export default PopupItemModal;
