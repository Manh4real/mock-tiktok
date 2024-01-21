import { createSubmitContext, formSet } from ".";

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
  unsubscribe(o: DiscardObserver) {
    const index = this.observers.findIndex((observer) => observer === o);

    if (index === -1) return;

    this.observers.splice(index, 1);
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

const initialContextValue = {
  discardEvent: new DiscardSubject(),
  createNewDiscardObserver: () => {},
  unsubscribeDiscard: () => {},
};

const initDiscardSubject = () => {
  const discardEvent = new DiscardSubject();

  return {
    discardEvent,
    createNewDiscardObserver: (fieldRef: FormFieldRefObject) => {
      const discardObserver = new DiscardObserver(fieldRef);
      discardEvent.subscribe(discardObserver);
    },
    unsubscribeDiscard: (o: DiscardObserver) => {
      discardEvent.unsubscribe(o);
    },
  };
};

export const { provider: SubmitProvider, useSubmit } = createSubmitContext(
  formSet.upload,
  (isAllowed) => isAllowed.caption.isValid && isAllowed.video.isValid,
  initDiscardSubject(),
  initialContextValue
);
