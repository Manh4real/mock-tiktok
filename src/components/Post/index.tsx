import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

// styles
import styles from "./Post.module.scss";

// icons
import { MusicNote } from "_/components/icons";
import { IoMdShareAlt } from "react-icons/io";

// components
import Image from "_/components/Image";
import Video from "_/components/Video";
import AccountPopup from "_/components/AccountPopup";
import FeedShare from "_/components/FeedShare";
import TimeAgo from "./TimeAgo";
import FollowButton from "./FollowButton";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";

// service
// import { getAccountByNickname } from "_/services/account";

// utils
import { numberCompact } from "_/utils";

// types
import { Video as VideoInterface } from "_/types";

interface Props {
  item: VideoInterface;
}

function Post({ item }: Props) {
  const author = item.user;

  // useEffect(() => {
  //   getAccountByNickname(item.user.nickname).then((author) => {
  //     setAuthor(author);
  //   });
  // }, [item.user.nickname]);

  return (
    <div className={clsx(styles["container"], "scroll-snap-alignCenter")}>
      <div className={styles["post__follow-button"]}>
        <FollowButton accountId={author.id} isFollowed={author.is_followed} />
      </div>
      <div className={styles["left"]}>
        {author ? (
          <AccountPopup account={author}>
            {
              <Link
                to={"/@" + author.nickname}
                className={styles["author-avatar"]}
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
                  to={"/@" + author?.nickname}
                  className={styles["post__header-link"]}
                >
                  <h3
                    className={clsx(
                      styles["author-username"],
                      "hover-underlined"
                    )}
                  >
                    {author?.nickname}
                  </h3>
                  <span className="author-nickname">
                    {author.full_name ||
                      `${author.first_name} ${author.last_name}`}
                  </span>
                  <span>&middot;</span>
                  <TimeAgo time={item.created_at} />
                </Link>
              </AccountPopup>
            )}
          </header>
          <div className={styles["post__content"]}>{item.description}</div>
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
                original sound -{" "}
                {author?.full_name ||
                  `${author.first_name} ${author.last_name}`}
              </span>
            </Link>
          </h4>
        </div>
        <div className={styles["post__watch"]}>
          <div className={styles["post__video"]}>
            <Video
              src={item.file_url}
              placeholder={item.thumb_url}
              postId={item.id}
            />
          </div>
          <div style={{ display: "flex" }}>
            <div className={styles["post__buttons"]}>
              <LikeButton postId={item.id} likesCount={item.likes_count} />
              <CommentButton
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

export default Post;

/*
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
*/
