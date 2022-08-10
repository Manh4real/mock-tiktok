import React, { useCallback, useEffect, useState } from "react";

type Direction = "vertical" | "horizontal";

interface Options {
    target: number,
    initialValue: number,
    direction: Direction,
    onMouseUp?: () => void,
    onMouseMove?: () => void
}

const useProgress = (
    ref: React.RefObject<HTMLElement>,
    options: Options,
) => {
    const {
        direction,
        initialValue,
        target,
        onMouseUp,
        onMouseMove
    } = options;
    const [min, max] = [0, 1];
    const [hasMouseDown, setHasMouseDown] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(initialValue);

    const handleMouseDown = () => {
        setHasMouseDown(true);
    };

    const updateProgress = useCallback((
        e: MouseEvent | React.MouseEvent,
        callback?: (newProgress: number) => void
    ) => {
        if (!ref.current) return;

        const el = ref.current;
        const { top, height, left, width } = el.getBoundingClientRect();

        let newProgress: number = 0;

        switch (direction) {
            case "vertical":
                if (e.clientY < top) {
                    newProgress = max;
                } else if (e.clientY > top + height) {
                    newProgress = min;
                } else {
                    newProgress = 1 - (e.clientY - top) / height;
                }

                break;
            case "horizontal":
                if (e.clientX < left) {
                    newProgress = min;
                } else if (e.clientX > left + width) {
                    newProgress = max;
                } else {
                    newProgress = (e.clientX - left) / width;
                }

                break;
            default:
                break;
        }

        setProgress(newProgress);

        if (callback) callback(newProgress);

    }, [direction, ref, min, max]);

    // window event
    useEffect(() => {
        const handleMouseUp = () => {
            setHasMouseDown(false);

            if (onMouseUp) onMouseUp();
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (hasMouseDown) {
                updateProgress(e);

                if (onMouseMove) onMouseMove();
            }

            e.preventDefault();
        };

        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [hasMouseDown, updateProgress, onMouseUp, onMouseMove]);


    return {
        progress,
        setProgress,
        current: progress * target,
        hasMouseDown,
        handleMouseDown,
        updateProgress
    }
}

export default useProgress;