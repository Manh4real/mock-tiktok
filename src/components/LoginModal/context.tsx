import React, { useContext } from "react";
import { ModalProps } from "_/types";

interface ContextValue extends ModalProps {}
interface Props extends ModalProps {
  children: React.ReactNode;
}

const initialValue = {
  handleClose: () => {},
};
const Context = React.createContext<ContextValue>(initialValue);

const Provider = ({ children, ...otherProps }: Props) => {
  return <Context.Provider value={otherProps}>{children}</Context.Provider>;
};

const useLoginModalToggle = () => {
  return useContext(Context);
};

export { Provider, useLoginModalToggle };
