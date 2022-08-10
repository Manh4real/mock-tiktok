import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

// styles
import styles from "./Post.module.scss";

// icons
import { Chat, MusicNote } from "_/components/icons";
import { BsFillHeartFill } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";

// components
import Image from "_/components/Image";
import Video from "_/components/Video";
import AccountPopup from "_/components/AccountPopup";
import FollowButton from "./FollowButton";

import FeedShare from "_/components/FeedShare";

// hoc
import { withLoginModal } from "_/hoc";

// types
import { WithLoginModal } from "_/hoc/withLoginModal";

interface Props extends WithLoginModal {}

const ACCOUNT = [
  {
    nickname: "squatuniversity",
    full_name: "Squat University",
    avatar: "",
    tick: true,
    followers_count: 32527900,
    likes_count: 28860000,
  },
];

function Post({ showLoginModal }: Props) {
  return (
    <div className={styles["container"]}>
      <div className={styles["post__follow-button"]}>
        <FollowButton />
      </div>
      <div className={styles["left"]}>
        <AccountPopup account={ACCOUNT[0]}>
          <Link to="/@squatuniversity" className={styles["author-avatar"]}>
            <Image width="100%" height="100%" />
          </Link>
        </AccountPopup>
      </div>
      <div className={styles["right"]}>
        <div className={styles["text"]}>
          <header>
            <Link
              to="/@squatuniversity"
              className={styles["post__header-link"]}
            >
              <h3
                className={clsx(styles["author-username"], "hover-underlined")}
              >
                squatuniversity
              </h3>
              <span className="author-nickname">Squat University</span>
              <span>&middot;</span>
              <span>5d ago</span>
            </Link>
          </header>
          <div className={styles["post__content"]}>
            <span>Lifting is for ALL AGES!</span>
            <Link
              to="/tag/lifting"
              className={clsx(styles["post__tag"], "hover-underlined")}
            >
              <strong>#lifting</strong>
            </Link>
            <Link
              to="/tag/grandma"
              className={clsx(styles["post__tag"], "hover-underlined")}
            >
              <strong>#grandma</strong>
            </Link>
            <Link
              to="/tag/grandmasoftiktok"
              className={clsx(styles["post__tag"], "hover-underlined")}
            >
              <strong>#grandmasoftiktok</strong>
            </Link>
            <Link
              to="/tag/gym"
              className={clsx(styles["post__tag"], "hover-underlined")}
            >
              <strong>#gym</strong>
            </Link>
            <Link
              to="/tag/fitness"
              className={clsx(styles["post__tag"], "hover-underlined")}
            >
              <strong>#fitness</strong>
            </Link>
            <Link
              to="/tag/fit"
              className={clsx(styles["post__tag"], "hover-underlined")}
            >
              <strong>#fit</strong>
            </Link>
            <Link
              to="/tag/strong"
              className={clsx(styles["post__tag"], "hover-underlined")}
            >
              <strong>#strong</strong>
            </Link>
            <Link
              to="/tag/powerlifting"
              className={clsx(styles["post__tag"], "hover-underlined")}
            >
              <strong>#powerlifting</strong>
            </Link>
          </div>
        </div>
        <div className={styles["post__audio"]}>
          <h4>
            <Link
              to="/"
              className="hover-underlined flex-align-center"
              style={{ width: "max-content" }}
            >
              <MusicNote />
              <span style={{ marginLeft: "5px" }}>
                original sound - Squat University
              </span>
            </Link>
          </h4>
        </div>
        <div className={styles["post__watch"]}>
          <div className={styles["post__video"]}>
            <Video src="../videos/Lil Baby x Gunna - Drip Too Hard.mp4" />
          </div>
          <div style={{ display: "flex" }}>
            <div className={styles["post__buttons"]}>
              <button
                onClick={() => {
                  showLoginModal();
                }}
              >
                <span className={styles["icon"]}>
                  <BsFillHeartFill />
                </span>
                <span>6598</span>
              </button>
              <button
                onClick={() => {
                  showLoginModal();
                }}
              >
                <span className={styles["icon"]}>
                  <Chat />
                </span>
                <span>83</span>
              </button>
              <FeedShare>
                <button>
                  <span className={styles["icon"]}>
                    <IoMdShareAlt />
                  </span>
                  <span>311</span>
                </button>
              </FeedShare>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withLoginModal(Post);
