import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'

import currentUserReducer from "./currentUser/currentUserSlice"
import modalReducer from "./modal/modalSlice"
import currentVideoReducer from "./currentVideo/currentVideoSlice"
import videosReducer from "./videos/videosSlice"
import accountsReducer from "./accounts/accountsSlice"
import alertReducer from './alert/alertSlice'

import { videoApi } from "_/services/video";

export const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        modal: modalReducer,
        currentVideo: currentVideoReducer,
        videos: videosReducer,
        accounts: accountsReducer,
        alert: alertReducer,
        [videoApi.reducerPath]: videoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(videoApi.middleware),
})


// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;