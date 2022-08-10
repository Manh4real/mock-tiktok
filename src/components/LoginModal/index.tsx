import React, { useImperativeHandle, useRef, useState } from "react";

// icons
import { BsChevronLeft } from "react-icons/bs";

// components
import Modal from "_/components/Modal";
import LoginStart from "./LoginStart";

// import { SignupFooter } from "./signup";
// import { LoginFooter } from "./login";

// styles
import styles from "./LoginModal.module.scss";

// variables

// types
import { ModalRefObject } from "_/types";
// import { ResetPasswordProps } from "./login/ResetPassword";

export enum FormState {
  LOG_IN,
  SIGN_UP,
}
interface Props {}

interface HistoryContextValue {
  history: JSX.Element[];
  pushHistory: (element: JSX.Element, replace?: boolean) => void;
}

export const History = React.createContext<HistoryContextValue>({
  history: [],
  pushHistory: () => {},
});
const initialState = [<LoginStart />];
const initialFormState = [FormState.LOG_IN];
function LoginModal(props: Props, ref: React.Ref<ModalRefObject | null>) {
  const modalRef = useRef<ModalRefObject>(null);

  // log in <-> sign up
  // form state history
  const [stateHistory, setStateHistory] =
    useState<FormState[]>(initialFormState);
  const currentFormState = stateHistory[stateHistory.length - 1];

  // content history
  const [history, setHistory] = useState<JSX.Element[]>(initialState);
  const currentElement = history[history.length - 1];

  const pushHistory = (element: JSX.Element, replace = false) => {
    if (history.length >= 2 && replace) {
      setHistory((prev) => [...prev.slice(0, -1), element]);
      setStateHistory((prev) => [...prev.slice(0, -1), currentFormState]);
    } else {
      setHistory((prev) => [...prev, element]);
      setStateHistory((prev) => [...prev, currentFormState]);
    }
  };
  const goBack = () => {
    setHistory((prev) => prev.slice(0, -1));
    setStateHistory((prev) => prev.slice(0, -1));
  };

  // show / hide modal
  useImperativeHandle(ref, () => modalRef.current);

  return (
    <Modal
      ref={modalRef}
      closeButtonStyle={{ transform: "scale(1.7)" }}
      onHide={() => setHistory(initialState)}
    >
      <History.Provider value={{ history, pushHistory }}>
        <div className={styles["wrapper"]}>
          {history.length > 1 && (
            <div className={styles["back-btn"]} onClick={goBack}>
              <BsChevronLeft />
            </div>
          )}
          <div className={styles["container"]}>
            <div className={styles["content"]}>{currentElement}</div>
          </div>
        </div>
      </History.Provider>
    </Modal>
  );
}

export default React.forwardRef(LoginModal);
