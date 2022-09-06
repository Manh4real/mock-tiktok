import React, { useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// icons
import { Spinner } from "_/components/icons";

// components
import Post from "_/components/Post";

// services
// import { getPosts } from "_/services/post";
import { getVideoList } from "_/services/video";

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
    errorMessage: "Can't get video list of" + type,
  });

  // #region
  // ⚠️🆘 Experiment: Infinite scroll
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (loading || end) return;

  //     const threshold = 0.8;
  //     const a = Math.trunc(
  //       document.documentElement.scrollTop + window.innerHeight
  //     );
  //     const b = document.documentElement.offsetHeight;

  //     if (Math.abs(a - b) <= 1) {
  //     if (a >= b * threshold) {
  //       console.log({ page });

  //       const nextPage = page + 1;

  //       setLoading(true);

  //       // prevent user from scrolling to the end
  //       // of the document too fast (sometimes)
  //       // thus call the same api twice (undesired)
  //       window.scrollBy(0, -5); // ⚠️ No test taken

  //       getPosts(nextPage)
  //         .then((newPosts) => {
  //           if (newPosts.length === 0) {
  //             setEnd(true);
  //             return;
  //           }

  //           setPosts((prev) => [...prev, ...newPosts]);
  //           setPage(nextPage);
  //         })
  //         .finally(() => {
  //           setLoading(false);
  //         });
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [end, page, loading]);
  // #endregion

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
          return <Post key={post.id} item={post} />;
        })}
      </div>
    </InfiniteScroll>
  );
};

export default Posts;
