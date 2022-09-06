import React, { useEffect, useImperativeHandle, useState } from "react";
import clsx from "clsx";

// icons
import { GoMute, GoUnmute } from "react-icons/go";

// styles
import styles from "./UploadVideo.module.scss";

// types
import { VoiceRefObject } from "./types";

interface Props {
  setActualVideoVolume: (value: number) => void;
}

const Voice = (
  { setActualVideoVolume }: Props,
  ref: React.Ref<VoiceRefObject>
) => {
  const [muted, setMuted] = useState<boolean>(false);

  const handleMute = () => {
    setMuted((prev) => !prev);
  };

  useEffect(() => {
    setActualVideoVolume(muted ? 0 : 1);
  }, [setActualVideoVolume, muted]);

  useImperativeHandle(ref, () => ({
    muted,
  }));

  return (
    <div className={clsx(styles["voice"], styles["button"])}>
      <div
        role="button"
        className={clsx(styles["mute-btn"])}
        onClick={handleMute}
      >
        {muted ? <GoMute /> : <GoUnmute />}
      </div>
    </div>
  );
};

export default React.forwardRef(Voice);
