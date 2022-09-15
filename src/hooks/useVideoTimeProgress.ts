import { useCallback, useState } from "react";

// hooks
import { useProgress } from "_/hooks";

const useVideoTimeProgress = (
    progressBarRef: React.RefObject<HTMLDivElement>,
    videoRef: React.RefObject<HTMLVideoElement>
) => {
    const [shownTime, setShownTime] = useState<number>(0);

    const {
        hasMouseDown,
        handleMouseDown,
        progress,
        setProgress,
        interactiveUpdateProgress,
        current,
    } = useProgress(progressBarRef, {
        direction: "horizontal",
        initialValue: 0,
        target: videoRef.current?.duration || 0,
        onMouseUp: (hadMouseDownOnProgressBar) => {
            if (!hadMouseDownOnProgressBar) return;

            if (videoRef.current) {
                videoRef.current.currentTime = current;
            }
        },
        onMouseMove: () => {
            setShownTime(current);
        },
    });

    const handleTimeUpdate = useCallback(() => {
        if (hasMouseDown) return;

        if (videoRef.current) {
            setShownTime(videoRef.current.currentTime);
            setProgress(videoRef.current.currentTime / videoRef.current.duration);
        }
    }, [hasMouseDown, setProgress, videoRef]);

    const handleClick = (e: React.MouseEvent) => {
        interactiveUpdateProgress(e, function (newProgress) {
            if (videoRef.current) {
                videoRef.current.currentTime =
                    newProgress * videoRef.current.duration;
            }
        });
        setShownTime(current);
    }

    const resetTime = useCallback(() => {
        console.log("??");

        setProgress(0);
    }, [setProgress]);

    return {
        shownTime,
        setShownTime,
        handleMouseDown,
        handleClick,
        progress,
        interactiveUpdateProgress,
        handleTimeUpdate,
        resetTime,
        currentProgress: current
    }
}

export default useVideoTimeProgress;