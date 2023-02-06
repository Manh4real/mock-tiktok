import React, { useEffect } from "react";

// variables
import routes, { pagesTitle } from "_/config/routes";

// components
import Posts from "./Posts";

// Redux
import { useAppDispatch } from "_/features/hooks";
import { resetVideos } from "_/features/videos/videosSlice";
import { clearVideoId } from "_/features/currentVideo/currentVideoSlice";

function Home() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(resetVideos());
    dispatch(clearVideoId());
  }, [dispatch]);

  //
  useEffect(() => {
    document.title = pagesTitle[routes.root] as string;
  }, []);

  return (
    <div>
      <Posts />
    </div>
  );
}

export default React.memo(Home);
