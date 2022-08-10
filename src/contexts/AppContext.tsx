import React, { useContext, useState } from "react";

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
