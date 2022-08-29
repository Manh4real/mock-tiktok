import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";

// styles
import styles from "./FeedShare.module.scss";

// icons
import {
  AnchorIcon,
  FilledCodeIcon,
  PaperPlane,
  WhatsApp,
} from "_/components/icons";
import { BsChevronDown, BsFacebook } from "react-icons/bs";

// types
import { Placement } from "@popperjs/core";
interface Props {
  placement?: Placement;
  children: JSX.Element;
}

function FeedShare({ placement = "top-start", children }: Props) {
  const [expanded, setExpanded] = useState<Boolean>(false);

  const handleClick = () => {
    setExpanded(true);
  };

  return (
    <div>
      <Tippy
        interactive
        placement={placement}
        delay={[300, 100]}
        onHidden={() => {
          setExpanded(false);
        }}
        render={(attrs) => (
          <div className={styles["FeedSharePopup"]} tabIndex={-1} {...attrs}>
            <Link to="/" className="flex-align-center">
              <FilledCodeIcon />
              <span className={styles["title"]}>Embed</span>
            </Link>
            <Link to="/" className="flex-align-center">
              <PaperPlane filled={true} />
              <span className={styles["title"]}>Send to friends</span>
            </Link>
            <Link to="/" className="flex-align-center">
              <BsFacebook fill="#0075FA" />
              <span className={styles["title"]}>Share to Facebook</span>
            </Link>
            <Link to="/" className="flex-align-center">
              <WhatsApp />
              <span className={styles["title"]}>Share to WhatsApp</span>
            </Link>
            <Link to="/" className="flex-align-center">
              <AnchorIcon />
              <span className={styles["title"]}>Copy link</span>
            </Link>

            {expanded && <MoreSection />}

            {!expanded && (
              <button className={styles["more-button"]} onClick={handleClick}>
                <BsChevronDown strokeWidth={1.5} />
              </button>
            )}
          </div>
        )}
      >
        {children}
      </Tippy>
    </div>
  );
}

const MoreSection = () => {
  return (
    <>
      <Link to="/" className="flex-align-center">
        <BsFacebook fill="#0075FA" />
        <span className={styles["title"]}>Share to Facebook</span>
      </Link>
      <Link to="/" className="flex-align-center">
        <WhatsApp />
        <span className={styles["title"]}>Share to WhatsApp</span>
      </Link>
      <Link to="/" className="flex-align-center">
        <AnchorIcon />
        <span className={styles["title"]}>Copy link</span>
      </Link>
      <Link to="/" className="flex-align-center">
        <BsFacebook fill="#0075FA" />
        <span className={styles["title"]}>Share to Facebook</span>
      </Link>
      <Link to="/" className="flex-align-center">
        <WhatsApp />
        <span className={styles["title"]}>Share to WhatsApp</span>
      </Link>
    </>
  );
};

export default FeedShare;
