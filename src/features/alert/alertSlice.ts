import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from "_/features/store";

interface InitialState {
    isShowed: boolean
    message: string
}

interface Action {
    message: string
}

const initialState: InitialState = {
    isShowed: false,
    message: ""
};

const alertSlice = createSlice({
    initialState,
    name: "alert",
    reducers: {
        show: (state, action: PayloadAction<Action>) => {
            state.message = action.payload.message;
            state.isShowed = true;
        },
        hide: (state) => {
            state.message = "";
            state.isShowed = false;
        }
    }
});

export const { show, hide } = alertSlice.actions;
export const useAlert = () => {
    return useSelector((state: RootState) => state.alert);
}

export default alertSlice.reducer;