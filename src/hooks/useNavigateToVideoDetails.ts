import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useNavigateToVideoDetails = (postId: number) => {
    const navigate = useNavigate();
    const location = useLocation();

    return useCallback(() => {

        navigate(`/video/${postId}`, { state: { background: location } });
    }, [location, navigate, postId]);
}

export default useNavigateToVideoDetails;