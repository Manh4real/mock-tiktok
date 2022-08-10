import React, { useRef } from "react";

// components
import LoginModal from "_/components/LoginModal";

// types
import { ModalRefObject } from "_/types";

export interface WithLoginModal {
  showLoginModal: () => void;
}

function withLoginModal<T extends WithLoginModal = WithLoginModal>(
  WrappedComponent: React.ComponentType<T>
) {
  const ReturnedComponent = (props: Omit<T, keyof WithLoginModal>) => {
    const loginModalRef = useRef<ModalRefObject>(null);

    const handleClick = () => {
      loginModalRef.current?.handleOpen();
    };

    return (
      <>
        <WrappedComponent {...(props as T)} showLoginModal={handleClick} />
        <LoginModal ref={loginModalRef} />
      </>
    );
  };

  ReturnedComponent.displayName =
    (WrappedComponent.displayName || WrappedComponent.name || "Component") +
    "WithLoginModal";

  return ReturnedComponent;
}

export default withLoginModal;
