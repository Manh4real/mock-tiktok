import { useEffect, useState } from "react";
import { useAppDispatch } from "_/features/hooks";
import { setModalStateClosed, setModalStateOpened, useModalOpeningState } from "_/features/modal/modalSlice";

const useModal = () => {
    const [visible, setVisible] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const hasModalOpened = useModalOpeningState();

    // handling event functions
    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!hasModalOpened) return;

        setVisible(false);
        document.body.style.overflow = "overlay";

        //
        dispatch(setModalStateClosed());
    };
    const handleOpen = () => {
        if (hasModalOpened) return;

        setVisible(true);
        document.body.style.overflow = "hidden";

        //
        dispatch(setModalStateOpened());
    };

    // dom event
    useEffect(() => {
        const handleCloseByKey = function (e: KeyboardEvent) {
            if (e.key === "Escape") {
                setVisible(false);
                document.body.style.overflow = "overlay";
            }
        };

        window.addEventListener("keydown", handleCloseByKey);

        return () => window.removeEventListener("keydown", handleCloseByKey);
    }, []);

    return {
        isOpened: visible,
        handleOpen,
        handleClose
    }
}

export default useModal;