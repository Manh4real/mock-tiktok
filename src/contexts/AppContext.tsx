import React, { useContext, useEffect, useState } from "react";
import { getCurrentUser, getToken } from "_/services/account";
import { Account } from "_/types";

// Login Context
export interface CurrentUser {
  isLoggedIn: boolean;
  info: {
    data: Account;
    meta: {
      token: string;
    };
  };
}

interface LoginContextValue {
  currentUser: CurrentUser | null;
  token: string | null;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUserInfo: (info: CurrentUser["info"]) => void;
  clearCurrentUser: () => void;
}

interface Props {
  children: JSX.Element;
}

export const LoginContext = React.createContext<LoginContextValue>({
  currentUser: null,
  isLoggedIn: false,
  token: getToken(),
  setIsLoggedIn: () => {},
  setCurrentUserInfo: () => {},
  clearCurrentUser: () => {},
});

function LoginContextProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const isLoggedIn = !!currentUser?.isLoggedIn;
  const setIsLoggedIn = () => {
    setCurrentUser((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        isLoggedIn: true,
      };
    });
  };
  const setCurrentUserInfo = (info: CurrentUser["info"]) => {
    setCurrentUser((prev) => {
      return {
        ...prev,
        isLoggedIn: true,
        info,
      };
    });
  };
  const clearCurrentUser = () => {
    setCurrentUser(null);
  };

  useEffect(() => {
    getCurrentUser().then((result: CurrentUser["info"]["data"] | undefined) => {
      if (!result) return;

      setCurrentUserInfo({
        data: result,
        meta: {
          token: getToken(),
        },
      });
    });
  }, []);

  return (
    <LoginContext.Provider
      value={{
        token: getToken(),
        currentUser,
        isLoggedIn,
        setIsLoggedIn,
        setCurrentUserInfo,
        clearCurrentUser,
      }}
    >
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
