import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// context
import { useCurrentVideo as context_useCurrentVideo } from "_/contexts";

const useNavigateToVideoDetails = (postId: number) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { currentVideo } = context_useCurrentVideo();

    return useCallback(() => {
        currentVideo.videoRef?.pause();
        navigate(`/video/${postId}`, { state: { background: location } });
    }, [currentVideo.videoRef, location, navigate, postId]);
}

export default useNavigateToVideoDetails;