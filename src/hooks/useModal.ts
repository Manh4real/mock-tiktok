import { useEffect, useState } from "react";
import { useAppDispatch } from "_/features/hooks";
import { setModalStateClosed, setModalStateOpened, useModalOpeningState } from "_/features/modal/modalSlice";

// helpers
import { overflowBodyHidden } from "_/helpers";

const useModal = () => {
    const [visible, setVisible] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const hasModalOpened = useModalOpeningState();

    // handling event functions
    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!hasModalOpened) return;

        setVisible(false);
        overflowBodyHidden(false);
        dispatch(setModalStateClosed());
    };
    const handleOpen = () => {
        if (hasModalOpened) return;

        setVisible(true);
        overflowBodyHidden(true);

        dispatch(setModalStateOpened());
    };

    // dom event
    useEffect(() => {
        const handleCloseByKey = function (e: KeyboardEvent) {
            if (e.key === "Escape") {
                setVisible(false);
                overflowBodyHidden(false);

                dispatch(setModalStateClosed());
            }
        };

        window.addEventListener("keydown", handleCloseByKey);

        return () => window.removeEventListener("keydown", handleCloseByKey);
    }, [dispatch]);

    return {
        isOpened: visible,
        handleOpen,
        handleClose
    }
}

export default useModal;