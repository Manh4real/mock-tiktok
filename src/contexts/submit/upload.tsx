import React, { useCallback, useContext, useMemo, useState } from "react";
import { SubmitContextValue, Upload, formSet } from ".";

// =======================================
export interface FormFieldRefObject {
  reset: () => void;
}

class DiscardSubject {
  observers: DiscardObserver[] = [];

  fired() {
    this.observers.forEach((observer) => {
      observer.receive();
    });
  }
  subscribe(observer: DiscardObserver) {
    this.observers.push(observer);
  }
}

export class DiscardObserver {
  fieldRef: FormFieldRefObject;

  constructor(fieldRef: FormFieldRefObject) {
    this.fieldRef = fieldRef;
  }

  receive() {
    this.fieldRef.reset();
  }
}

// =======================================

export const Submit = React.createContext<
  SubmitContextValue<Upload> & {
    discardEvent: DiscardSubject;
    createNewDiscardObserver: (fieldRef: FormFieldRefObject) => void;
  }
>({
  isAllowed: formSet.upload,
  setIsAllowed: () => {},
  isAllGood: false,
  discardEvent: new DiscardSubject(),
  createNewDiscardObserver: () => {},
});

export const useSubmit = () => {
  return useContext(Submit);
};

interface Props {
  children: JSX.Element;
}

export const SubmitProvider = ({ children }: Props) => {
  const [isAllowed, setIsAllowed] = useState<Upload>(formSet.upload);

  const discardEvent = useMemo(() => new DiscardSubject(), []);

  const createNewDiscardObserver = useCallback(
    (fieldRef: FormFieldRefObject) => {
      const discardObserver = new DiscardObserver(fieldRef);
      discardEvent.subscribe(discardObserver);
    },
    [discardEvent]
  );

  const isAllGood = isAllowed.caption.isValid && isAllowed.video.isValid;

  return (
    <Submit.Provider
      value={{
        isAllowed,
        setIsAllowed,
        isAllGood,
        discardEvent,
        createNewDiscardObserver,
      }}
    >
      {children}
    </Submit.Provider>
  );
};