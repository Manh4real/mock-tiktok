import React, { useState, useMemo } from "react";

// icons
import { BsChevronLeft } from "react-icons/bs";

// components
import Modal from "_/components/Modal";
import LoginStart from "./LoginStart";
import { Provider } from "./context";

import SignUpStart from "./SignUpStart";
import { ResetPassword, WithEmailLogin, WithPhoneLogin } from "./login";
import { PhoneEmailSignup } from "./signup";

// styles
import styles from "./LoginModal.module.scss";

// types
import { ModalProps } from "_/types";
import { ILoginModalContentType } from "./types";

export enum FormState {
  LOG_IN,
  SIGN_UP,
}
interface Props extends ModalProps {}

// ===============================================================
interface HistoryContextValue {
  history: ILoginModalContentType[];
  pushHistory: (contentType: ILoginModalContentType, replace?: boolean) => void;
}

export const History = React.createContext<HistoryContextValue>({
  history: [],
  pushHistory: () => {},
});
const initialState = [ILoginModalContentType.LOGIN_START];
const initialFormState = [FormState.LOG_IN];

function LoginModal({ handleClose }: Props) {
  // log in <-> sign up
  // form state history
  const [stateHistory, setStateHistory] =
    useState<FormState[]>(initialFormState);
  const currentFormState = stateHistory[stateHistory.length - 1];

  // content type history
  const [history, setHistory] = useState<ILoginModalContentType[]>(initialState);
  const currentContentType = history[history.length - 1];

  const pushHistory = (contentType: ILoginModalContentType, replace = false) => {
    if (history.length >= 2 && replace) {
      setHistory((prev) => [...prev.slice(0, -1), contentType]);
      setStateHistory((prev) => [...prev.slice(0, -1), currentFormState]);
    } else {
      setHistory((prev) => [...prev, contentType]);
      setStateHistory((prev) => [...prev, currentFormState]);
    }
  };
  const goBack = () => {
    setHistory((prev) => prev.slice(0, -1));
    setStateHistory((prev) => prev.slice(0, -1));
  };

  // content
  const content = useMemo(() => {
    switch(currentContentType) {
      case ILoginModalContentType.LOGIN_START:
        return <LoginStart />;
      case ILoginModalContentType.LOGIN_W_EMAIL:
        return <WithEmailLogin />;
      case ILoginModalContentType.LOGIN_W_PHONE:
        return <WithPhoneLogin />;
      case ILoginModalContentType.LOGIN_EMAIL_RESET_PW:
        return <ResetPassword resetWith="email" />;
      case ILoginModalContentType.LOGIN_PHONE_RESET_PW:
        return <ResetPassword resetWith="phone" />;
      case ILoginModalContentType.SIGNUP_START:
        return <SignUpStart />;
      case ILoginModalContentType.SIGNUP_W_EMAIL_PHONE:
        return <PhoneEmailSignup />;
    }

  }, [currentContentType]);

  return (
    <Provider handleClose={handleClose}>
      <Modal
        handleClose={handleClose}
        closeButtonStyle={{ transform: "scale(1.7)" }}
      >
        <History.Provider value={{ history, pushHistory }}>
          <div className={styles["wrapper"]}>
            {history.length > 1 && (
              <div className={styles["back-btn"]} onClick={goBack}>
                <BsChevronLeft />
              </div>
            )}
            <div className={styles["container"]}>
              <div className={styles["content"]}>{content}</div>
            </div>
          </div>
        </History.Provider>
      </Modal>
    </Provider>
  );
}

export default LoginModal;
