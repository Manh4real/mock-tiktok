import React, { useContext, useState } from "react";

// Login Context
interface LoginContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  children: JSX.Element;
}

export const LoginContext = React.createContext<LoginContextValue>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

function LoginContextProvider({ children }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    JSON.parse(localStorage.getItem("isLoggedIn") || "false")
  );

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
}

export const useLoginContext = () => {
  return useContext(LoginContext);
};

export { LoginContextProvider };

// Modal Context
interface ModalContextValue {
  appModal: JSX.Element;
  setAppModal: React.Dispatch<React.SetStateAction<JSX.Element>>;
  clearModal: () => void;
}

interface Props {
  children: JSX.Element;
}

export const ModalContext = React.createContext<ModalContextValue>({
  appModal: <></>,
  setAppModal: () => {},
  clearModal: () => {},
});

function ModalContextProvider({ children }: Props) {
  const [appModal, setAppModal] = useState<JSX.Element>(<></>);

  const clearModal = () => {
    setAppModal(<></>);
  };

  return (
    <ModalContext.Provider value={{ appModal, setAppModal, clearModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => {
  return useContext(ModalContext);
};

export { ModalContextProvider };
