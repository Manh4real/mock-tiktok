import React, { useCallback, useContext, useMemo, useState } from "react";
import { VideoRefObject } from "_/types";

interface Current {
  videoRef: VideoRefObject | null;
}
interface ContextValueInterface {
  currentVideo: Current;
  changeVideoRef: (videoRef: VideoRefObject) => void;
}

const initialValue: Current = {
  videoRef: null,
};
const Context = React.createContext<ContextValueInterface>({
  currentVideo: initialValue,
  changeVideoRef: () => {},
});

const useCurrentVideo = () => {
  return useContext(Context);
};

const Provider = ({ children }: { children: JSX.Element }) => {
  const [current, setCurrent] = useState<Current>(initialValue);

  const changeVideoRef = useCallback((videoRef: VideoRefObject) => {
    setCurrent((prev) => ({
      ...prev,
      videoRef,
    }));
  }, []);

  return (
    <Context.Provider
      value={useMemo(
        () => ({
          currentVideo: current,
          changeVideoRef,
        }),
        [current, changeVideoRef]
      )}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider as CurrentVideoProvider, useCurrentVideo };
