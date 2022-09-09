import React, { useCallback, useEffect, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// icons
import { Spinner } from "_/components/icons";

// components
import Post from "_/components/Post";

// services
import { getVideoList } from "_/services/video";

// features
import {
  AutoplayScroll,
  AutoplayScrollObserver,
  AutoplayScrollObserverProps,
} from "_/features/autoplayScroll";

// styles
import styles from "./Home.module.scss";

// types
import { Video as VideoInterface } from "_/types";
import { usePagesFetch } from "_/hooks";

interface Props {
  type?: "for-you" | "following";
}
const Posts = ({ type = "for-you" }: Props) => {
  const fetchVideoList = useCallback(
    (page?: number) => {
      return getVideoList(type, page);
    },
    [type]
  );

  const {
    results: posts,
    hasMore,
    handleFetchNext: handleLoadMore,
  } = usePagesFetch<VideoInterface>(fetchVideoList, false, {
    errorMessage: "Can't get video list of " + type,
  });

  //===============================================================
  // auto play scroll
  const autoplayScrollSubject = useMemo(() => new AutoplayScroll(), []);
  const createAutoplayScrollObserver = useCallback(
    (props: AutoplayScrollObserverProps) => {
      const observer = new AutoplayScrollObserver(props);
      autoplayScrollSubject.subscribe(observer);

      return observer;
    },
    [autoplayScrollSubject]
  );
  const unsubscribe = useCallback(
    (observer: AutoplayScrollObserver) => {
      autoplayScrollSubject.unsubscribe(observer);
    },
    [autoplayScrollSubject]
  );

  useEffect(() => {
    const handleScroll = () => {
      autoplayScrollSubject.fire();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [autoplayScrollSubject]);
  //===============================================================

  return (
    <InfiniteScroll
      dataLength={posts.length} //This is important field to render the next data
      next={handleLoadMore}
      hasMore={hasMore}
      scrollThreshold={0.8}
      loader={
        <div className={styles["loader"]}>
          <Spinner style={{ width: "20px", height: "20px" }} />
        </div>
      }
      endMessage={
        <p
          style={{
            textAlign: "center",
            paddingBottom: "20px",
            fontSize: "22px",
          }}
        >
          <b>You've seen it all ! 🥂🥳</b>
        </p>
      }
    >
      <div className={styles["posts"]}>
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              item={post}
              createAutoplayScrollObserver={createAutoplayScrollObserver}
              unsubscribe={unsubscribe}
            />
          );
        })}
      </div>
    </InfiniteScroll>
  );
};

export default Posts;
