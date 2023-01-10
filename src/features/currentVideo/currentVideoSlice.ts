import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { RootState } from "_/features/store";

interface CurrentVideo {
    postId: number;
    muted: boolean;
    volume: number;
}

interface State {
    currentVideo: CurrentVideo;
}

interface ChangeVideoPayload {
    postId: number,
}

const initialState: State = {
    currentVideo: {
        postId: -999,
        muted: true,
        volume: 0.5,
    }
}

const currentVideoSlice = createSlice({
    name: "currentVideo",
    initialState,
    reducers: {
        changeVideo: (state, action: PayloadAction<ChangeVideoPayload>) => {
            const { postId } = action.payload;
            state.currentVideo.postId = postId;
        },
        setMute: (state, action: PayloadAction<boolean>) => {
            state.currentVideo.muted = action.payload;
        },
        toggleMute: (state) => {
            state.currentVideo.muted = !state.currentVideo.muted;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.currentVideo.volume = action.payload;
            state.currentVideo.muted = action.payload === 0;
        },
        clearVideoId: (state) => {
            state.currentVideo.postId = -999;
        }
    }
})
export const {
    changeVideo,
    setMute,
    setVolume,
    toggleMute,
    clearVideoId
} = currentVideoSlice.actions;

export const useCurrentVideo = () => {
    return useSelector((state: RootState) => state.currentVideo.currentVideo);
}

export default currentVideoSlice.reducer;