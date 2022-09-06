import React from "react";

// components
import LoginModal from "_/components/LoginModal";

// hooks
import { useModal } from "_/hooks";

// types
export interface WithLoginModal {
  showLoginModal: () => void;
}

function withLoginModal<T extends WithLoginModal = WithLoginModal>(
  WrappedComponent: React.ComponentType<T>
) {
  const ReturnedComponent = (props: Omit<T, keyof WithLoginModal>) => {
    const { handleOpen, isOpened, handleClose } = useModal();

    const showLoginModal = () => {
      handleOpen();
    };

    return (
      <>
        <WrappedComponent {...(props as T)} showLoginModal={showLoginModal} />
        {isOpened && <LoginModal handleClose={handleClose} />}
      </>
    );
  };

  ReturnedComponent.displayName =
    (WrappedComponent.displayName || WrappedComponent.name || "Component") +
    "WithLoginModal";

  return ReturnedComponent;
}

export default withLoginModal;
