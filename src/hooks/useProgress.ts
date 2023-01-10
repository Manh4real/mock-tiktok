import React, { useCallback, useEffect, useRef, useState } from "react";

type Direction = "vertical" | "horizontal";

interface Options {
    target: number,
    initialValue: number,
    direction: Direction,
    onMouseUp?: (hadMouseDown: boolean) => void, /** Should be memoized */
    onMouseMove?: () => void, /** Should be memoized */
    onChange?: (newValue: number) => void /** Should be memoized */
}
interface Rect {
    top: number;
    height: number;
    left: number;
    width: number;
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

    const rect = useRef<Rect>({ top: 0, height: 0, left: 0, width: 0 });

    const interactiveUpdateProgress = useCallback((
        e: MouseEvent | React.MouseEvent,
        callback?: (newProgress: number) => void
    ) => {
        const { top, height, left, width } = rect.current;

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

    }, [direction, min, max, onChange]);

    // get rect
    useEffect(() => {
        if (ref.current) {
            rect.current = ref.current.getBoundingClientRect();
        }
    }, [ref]);

    // window event
    useEffect(() => {
        const handleMouseUp = () => {
            if (hasMouseDown) {
                setHasMouseDown(false);

                if (onMouseUp) onMouseUp(hasMouseDown);
            }
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