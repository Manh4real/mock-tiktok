import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface Current {
  postId: number;
  muted: boolean;
  volume: number;
}
interface ContextValueInterface {
  currentVideo: Current;
  handleVideoChange: (postId: number) => void;
  handleToggleMute: () => void;
  saveVolume: (value: number) => void;
  setMute: (muted: boolean) => void;
}

const initialValue: Current = {
  postId: -999,
  muted: false,
  volume: 0.5,
};
const Context = React.createContext<ContextValueInterface>({
  currentVideo: initialValue,
  handleVideoChange: () => {},
  handleToggleMute: () => {},
  saveVolume: () => {},
  setMute: () => {},
});

const useCurrentVideo = () => {
  return useContext(Context);
};

const Provider = ({ children }: { children: JSX.Element }) => {
  const [current, setCurrent] = useState<Current>(initialValue);

  const handleVideoChange = useCallback((postId: number) => {
    setCurrent((prev) => {
      return { ...prev, postId };
    });
  }, []);

  const setMute = useCallback((muted: boolean) => {
    setCurrent((prev) => {
      return { ...prev, muted };
    });
  }, []);

  const handleToggleMute = useCallback(() => {
    setCurrent((prev) => {
      return { ...prev, muted: !prev.muted };
    });
  }, []);

  const saveVolume = useCallback((value: number) => {
    setCurrent((prev) => {
      return { ...prev, volume: value };
    });
  }, []);

  // dom events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e) return;

      const eventTarget = e.target as HTMLElement;
      if (eventTarget.tagName === "INPUT") return;

      if (e.key.toLowerCase() !== "m") return;

      handleToggleMute();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleToggleMute]);

  return (
    <Context.Provider
      value={useMemo(
        () => ({
          currentVideo: current,
          handleVideoChange,
          handleToggleMute,
          saveVolume,
          setMute,
        }),
        [current, handleVideoChange, handleToggleMute, saveVolume, setMute]
      )}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider as CurrentVideoProvider, useCurrentVideo };
