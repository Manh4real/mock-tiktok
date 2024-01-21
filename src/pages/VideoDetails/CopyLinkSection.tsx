import React from "react";
import clsx from "clsx";

// styles
import styles from "./VideoDetails.module.scss";

// Redux
import { useAppDispatch } from "_/features/hooks";
import { show } from "_/features/alert/alertSlice";

const CopyLinkSection = () => {
  const dispatch = useAppDispatch();

  const url = window.location.href;

  const fallbackCopyTextToClipboard = (text: string) => {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      console.log("Fallback: Copying text command was " + msg);

      dispatch(show({ message: "Copied!" }));
    } catch (err) {
      dispatch(show({ message: "Unable to copy!" }));
      console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
  };
  const copyTextToClipboard = (text: string) => {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Async: Copying to clipboard was successful!");

        dispatch(show({ message: "Copied!" }));
      },
      (err) => {
        console.error("Async: Could not copy text: ", err);

        dispatch(show({ message: "Unable to copy!" }));
      }
    );
  };

  return (
    <div className={clsx("flex-align-center", styles["copy-link"])}>
      <div className={clsx("text-overflow-elipse", styles["link-text"])}>
        {url}
      </div>
      <div
        className={clsx("button", "grey-outlined", styles["copy-link-button"])}
        onClick={() => {
          copyTextToClipboard(url);
        }}
      >
        Copy link
      </div>
    </div>
  );
};

export default CopyLinkSection;
