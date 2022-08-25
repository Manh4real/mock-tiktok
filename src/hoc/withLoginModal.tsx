import React, { useRef } from "react";

// components
import LoginModal from "_/components/LoginModal";

// context
import { useModalContext } from "_/contexts";

// types
import { ModalRefObject } from "_/types";

export interface WithLoginModal {
  showLoginModal: () => void;
}

function withLoginModal<T extends WithLoginModal = WithLoginModal>(
  WrappedComponent: React.ComponentType<T>
) {
  const ReturnedComponent = (props: Omit<T, keyof WithLoginModal>) => {
    const { setAppModal } = useModalContext();

    const loginModalRef = useRef<ModalRefObject>(null);

    const showLoginModal = () => {
      loginModalRef.current?.handleOpen();
      setAppModal(<LoginModal ref={loginModalRef} />);
    };

    return (
      <>
        <WrappedComponent {...(props as T)} showLoginModal={showLoginModal} />
        {/* <LoginModal ref={loginModalRef} /> */}
      </>
    );
  };

  ReturnedComponent.displayName =
    (WrappedComponent.displayName || WrappedComponent.name || "Component") +
    "WithLoginModal";

  return ReturnedComponent;
}

export default withLoginModal;
