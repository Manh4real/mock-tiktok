import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from "_/features/store";


interface State {
    isOpened: boolean;
}

const initialState: State = {
    isOpened: false
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModalStateClosed: (state) => {
            state.isOpened = false;
        },
        setModalStateOpened: (state) => {
            state.isOpened = true;
        }
    }
});

export const { setModalStateClosed, setModalStateOpened } = modalSlice.actions;

export const useModalOpeningState = () => {
    return useSelector((state: RootState) => state.modal.isOpened);
}

export default modalSlice.reducer;