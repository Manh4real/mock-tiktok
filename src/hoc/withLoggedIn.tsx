import React, { useRef } from "react";

// components
import LoginModal from "_/components/LoginModal";

// types
import { ModalRefObject } from "_/types";

export interface WithLoggedIn {
  handleLoggedInFuncClick: () => void;
}

function withLoggedIn<T extends WithLoggedIn = WithLoggedIn>(
  WrappedComponent: React.ComponentType<T>
) {
  const ReturnedComponent = (props: Omit<T, keyof WithLoggedIn>) => {
    const loginModalRef = useRef<ModalRefObject>(null);

    const handleClick = () => {
      loginModalRef.current?.handleOpen();
    };

    return (
      <>
        <WrappedComponent
          {...(props as T)}
          handleLoggedInFuncClick={handleClick}
        />
        <LoginModal ref={loginModalRef} />
      </>
    );
  };

  ReturnedComponent.displayName =
    (WrappedComponent.displayName || WrappedComponent.name || "Component") +
    "WithLoggedIn";

  return ReturnedComponent;
}

export default withLoggedIn;
