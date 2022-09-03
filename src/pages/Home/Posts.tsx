import React, { useEffect, useState } from "react";
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
import { Video, Video as VideoInterface } from "_/types";

const Posts = () => {
  const [page, setPage] = useState<number>(-1);
  const [totalPage, setTotalPage] = useState<number>(1);
  // const [end, setEnd] = useState<boolean>(false);
  const [posts, setPosts] = useState<VideoInterface[]>([]);

  const handleLoadMore = () => {
    // if (end) return;

    if (page >= totalPage) return;

    getVideoList("for-you", page + 1).then((data) => {
      const rs = data.data as Video[];

      setPosts((prev) => [...prev, ...rs]);

      //
      const currentPage = data.meta.pagination.current_page;
      setPage(currentPage);
    });
  };

  //
  // useEffect(() => {
  //   if (page === 1) window.scrollTo(0, 0);
  // });

  useEffect(() => {
    getVideoList().then((data) => {
      const rs = data.data as Video[];

      setPosts(rs);

      //
      const total = data.meta.pagination.total_pages;
      setTotalPage(total);

      const currentPage = data.meta.pagination.current_page;
      setPage(currentPage);
    });
  }, []);

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
      hasMore={page < totalPage}
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
