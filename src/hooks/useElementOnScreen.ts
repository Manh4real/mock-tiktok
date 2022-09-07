import React, { useCallback, useEffect, useMemo, useState } from "react";

let currentElementRefs = new Map<React.RefObject<HTMLElement> | null, React.RefObject<HTMLElement> | null>([]);

const useElementOnScreen = (
  options: IntersectionObserverInit,
  targetRef: React.RefObject<HTMLElement>
) => {
  const [isVisibile, setIsVisible] = useState<boolean>(false);

  const callbackFunction: IntersectionObserverCallback = useCallback((entries) => {
    const [entry] = entries; //const entry = entries[0]

    const rect = entry.boundingClientRect;

    const _isVisible =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);

    console.log({ _isVisible, cur: targetRef.current });

    setIsVisible(_isVisible);
    // setIsVisible(entry.isIntersecting);
  }, [targetRef]);

  const optionsMemo = useMemo(() => {
    return options;
  }, [options]);

  useEffect(() => {
    if (!targetRef) return;

    const observer = new IntersectionObserver(callbackFunction, optionsMemo);
    const currentTarget = targetRef.current;

    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [targetRef, optionsMemo, callbackFunction]);

  const check = useMemo(() => {
    // if (!currentElementRef && isVisibile) currentElementRef = targetRef;
    // else if (!isVisibile && currentElementRef === targetRef) {
    //   currentElementRef = null;
    // }

    // return currentElementRef === targetRef;

    if (isVisibile) currentElementRefs.set(targetRef, targetRef);
    else currentElementRefs.delete(targetRef);

    return currentElementRefs.values().next().value === targetRef;
  }, [isVisibile, targetRef]);

  // console.log({ isVisibile, check, cur: currentElementRefs.values().next().value, targetRef });
  // console.log(currentElementRefs.values());
  // console.log(currentElementRefs.values().next().value);
  if (isVisibile) console.log(targetRef);


  return check;

  // return isVisibile && check;
  // return isVisibile;
};

export default useElementOnScreen;
