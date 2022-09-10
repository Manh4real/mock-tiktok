import { createEntityAdapter, createSlice, EntityId, PayloadAction } from "@reduxjs/toolkit";
import { Video } from "_/types";

import { RootState } from "_/features/store";
import { useSelector } from "react-redux";

const videosAdapter = createEntityAdapter<Video>({
    selectId: ({ id }) => id,
    sortComparer: (a, b) => {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
})
const initialState = videosAdapter.getInitialState<Video[]>([]);

const videosSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
        setVideos: (state, action: PayloadAction<Video[]>) => {
            videosAdapter.upsertMany(state, action.payload)
        },
        resetVideos: (state) => {
            videosAdapter.removeAll(state);
        }
    }
});

export const { setVideos, resetVideos } = videosSlice.actions;
export const {
    selectAll: selectAllVideos,
    selectById: selectVideoById,
    selectEntities: selectVideosEntities,
    selectIds: selectVideosIds,
    selectTotal: selectVideosTotal
} = videosAdapter.getSelectors((state: RootState) => state.videos);

export const useVideosIds = () => useSelector(selectVideosIds);
export const useVideoById = (id: EntityId) => {
    return useSelector(
        (state: RootState) => selectVideoById(state, id)
    );
}

export const useVideosEntities = () => useSelector(selectVideosEntities);

export default videosSlice.reducer;