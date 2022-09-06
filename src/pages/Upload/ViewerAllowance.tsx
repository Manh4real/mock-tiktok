import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

// styles
import styles from "./Upload.module.scss";

// types
import { Viewer } from "_/types";
import { useSubmit } from "_/contexts/submit/upload";

interface Props {
  setIsAllowed: (value: Viewer) => void;
}
//
const initialValue = "public";
const ViewerAllowance = ({ setIsAllowed }: Props) => {
  const [value, setValue] = useState<Viewer>(initialValue);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, []);

  //=====================================================
  const { createNewDiscardObserver } = useSubmit();
  useEffect(() => {
    createNewDiscardObserver({
      reset: () => {
        reset();
        setIsAllowed(initialValue);
      },
    });
  }, [createNewDiscardObserver, reset, setIsAllowed]);
  //=====================================================

  //
  useEffect(() => {
    setIsAllowed(value);
  }, [setIsAllowed, value]);

  return (
    <div className={styles["form__field"]}>
      <div className={clsx(styles["form__title"])}>Who can view this video</div>
      <div className={clsx(styles["form__select-container"])}>
        <select
          name="viewer"
          id="viewer"
          className={clsx(styles["form__select"])}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setValue(e.target.value as Viewer);
          }}
        >
          <option value="public">Public</option>
          <option value="friends">Friends</option>
          <option value="private">Private</option>
        </select>
      </div>
    </div>
  );
};

export default ViewerAllowance;
