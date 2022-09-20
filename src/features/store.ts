import { configureStore } from '@reduxjs/toolkit';

import currentUserReducer from "./currentUser/currentUserSlice"
import modalReducer from "./modal/modalSlice"
import currentVideoReducer from "./currentVideo/currentVideoSlice"
import videosReducer from "./videos/videosSlice"
import accountsReducer from "./accounts/accountsSlice"

export const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        modal: modalReducer,
        currentVideo: currentVideoReducer,
        videos: videosReducer,
        accounts: accountsReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;