import React, { useCallback, useEffect, useState } from "react";

type Direction = "vertical" | "horizontal";

interface Options {
    target: number,
    initialValue: number,
    direction: Direction,
    onMouseUp?: (hadMouseDown: boolean) => void, /** Should be memoized */
    onMouseMove?: () => void, /** Should be memoized */
    onChange?: (newValue: number) => void /** Should be memoized */
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
        onMouseMove,
        onChange
    } = options;
    const [min, max] = [0, 1];
    const [hasMouseDown, setHasMouseDown] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(initialValue);

    const handleMouseDown = () => {
        setHasMouseDown(true);
    };

    const interactiveUpdateProgress = useCallback((
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

        if (onChange) onChange(newProgress);
        if (callback) callback(newProgress);

    }, [direction, ref, min, max, onChange]);

    // window event
    useEffect(() => {
        const handleMouseUp = () => {
            setHasMouseDown(false);

            if (onMouseUp) onMouseUp(hasMouseDown);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (hasMouseDown) {
                e.preventDefault();
                interactiveUpdateProgress(e);

                if (onMouseMove) onMouseMove();
            }

        };

        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [hasMouseDown, interactiveUpdateProgress, onMouseUp, onMouseMove]);


    return {
        progress,
        setProgress,
        current: progress * target,
        hasMouseDown,
        handleMouseDown,
        interactiveUpdateProgress
    }
}

export default useProgress;