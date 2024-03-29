import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

// styles
import styles from "./Post.module.scss";

// icons
import { MusicNote } from "_/components/icons";
import { IoMdShareAlt } from "react-icons/io";

// components
import Image from "_/components/Image";
import AccountPopup from "_/components/AccountPopup";
import FeedShare from "_/components/FeedShare";
import TimeAgo from "_/components/TimeAgo";
import FollowButton from "./FollowButton";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import VideoContainer from "./VideoContainer";

// utils
import { numberCompact, toTag } from "_/utils";

// types
import { Video as VideoInterface, VideoRefObject } from "_/types";
import {
  AutoplayScrollObserver,
  AutoplayScrollObserverProps,
} from "_/features/autoplayScroll";

// Redux
import { useAccountById } from "_/features/accounts/accountsSlice";

interface Props {
  index: number;
  item: VideoInterface;
  createAutoplayScrollObserver: (
    props: AutoplayScrollObserverProps
  ) => AutoplayScrollObserver;
  unsubscribe: (observer: AutoplayScrollObserver) => void;
}

function Post({
  index,
  item,
  createAutoplayScrollObserver,
  unsubscribe,
}: Props) {
  const author = useAccountById(item.user_id) || item.user;
  const authorName =
    author.full_name || `${author.first_name} ${author.last_name}`;
  const postContent = toTag(item.description);

  //===============================================================
  // ⚠️ Autoplay scroll
  const videoRef = useRef<VideoRefObject>({
    pause: () => {},
    play: () => {},
    muted: (value: boolean) => value,
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = ref.current;

    const observer = createAutoplayScrollObserver({
      elem: current,
      action: () => {
        videoRef.current.play();
      },
    });

    // Initially, first video plays
    if (index === 0) {
      videoRef.current.muted(true);
      videoRef.current.play();
      videoRef.current.muted(false);
    }

    return () => unsubscribe(observer);
  }, [createAutoplayScrollObserver, unsubscribe, index]);
  //===============================================================

  return (
    <div
      ref={ref}
      className={clsx(styles["container"], "scroll-snap-alignCenter")}
    >
      <div className={styles["post__follow-button"]}>
        <FollowButton styles={styles} accountId={author.id} />
      </div>
      <div className={styles["left"]}>
        {author ? (
          <AccountPopup account={author}>
            {
              <Link
                to={"/@" + author.nickname}
                className={styles["author-avatar"]}
                aria-haspopup={"true"}
              >
                <Image width="100%" height="100%" src={author.avatar} />
              </Link>
            }
          </AccountPopup>
        ) : (
          <div className={styles["author-avatar"]}></div>
        )}
      </div>
      <div className={styles["right"]}>
        <div className={styles["text"]}>
          <header>
            {author && (
              <AccountPopup account={author}>
                <Link
                  to={"/@" + author.nickname}
                  className={styles["post__header-link"]}
                  aria-haspopup={"true"}
                >
                  <h3
                    className={clsx(
                      styles["author-username"],
                      "hover-underlined"
                    )}
                  >
                    {author.nickname}
                  </h3>
                  <span className="author-nickname">{authorName}</span>
                  <span>&middot;</span>
                  <TimeAgo time={item.created_at} />
                </Link>
              </AccountPopup>
            )}
          </header>
          <div className={styles["post__content"]}>{postContent}</div>
        </div>
        <div className={styles["post__audio"]}>
          <h4>
            <Link
              to={item.music || "/"}
              className="hover-underlined flex-align-center"
              style={{ width: "max-content" }}
            >
              <MusicNote />
              <span style={{ marginLeft: "5px" }}>
                original sound - {authorName}
              </span>
            </Link>
          </h4>
        </div>
        <div className={styles["post__watch"]}>
          <VideoContainer ref={videoRef} video={item} />
          <div style={{ display: "flex" }}>
            <div className={styles["post__buttons"]}>
              <LikeButton
                styles={styles}
                isLiked={item.is_liked}
                postId={item.id}
                likesCount={item.likes_count}
              />
              <CommentButton
                styles={styles}
                postId={item.id}
                commentsCount={item.comments_count}
              />
              <FeedShare>
                <button>
                  <span className={styles["icon"]}>
                    <IoMdShareAlt />
                  </span>
                  <span>
                    {item.shares_count === 0
                      ? "Share"
                      : numberCompact(item.shares_count)}
                  </span>
                </button>
              </FeedShare>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Post);
