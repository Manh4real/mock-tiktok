import React from "react";

// context
import { useModalContext } from "_/contexts";

const AppModal = () => {
  const { appModal } = useModalContext();

  return <React.Fragment>{appModal}</React.Fragment>;
};

export default AppModal;
