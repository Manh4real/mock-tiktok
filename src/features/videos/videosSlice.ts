import { createEntityAdapter, createSlice, EntityId, PayloadAction, Update } from "@reduxjs/toolkit";
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
        addVideo: (state, action: PayloadAction<Video>) => {
            console.log(action.payload);

            videosAdapter.addOne(state, action.payload);
        },
        setVideos: (state, action: PayloadAction<Video[]>) => {
            videosAdapter.upsertMany(state, action.payload)
        },
        deleteVideo: (state, action: PayloadAction<EntityId>) => {
            videosAdapter.removeOne(state, action.payload)
        },
        updateVideo: (state, action: PayloadAction<Update<Video>>) => {
            videosAdapter.updateOne(state, action.payload)
        },
        resetVideos: (state) => {
            videosAdapter.removeAll(state);
        }
    }
});

export const { setVideos, addVideo, deleteVideo, updateVideo, resetVideos } = videosSlice.actions;
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
export const useVideoLike = (videoId: EntityId) => !!useVideoById(videoId)?.is_liked;

export const useVideosEntities = () => useSelector(selectVideosEntities);

export default videosSlice.reducer;