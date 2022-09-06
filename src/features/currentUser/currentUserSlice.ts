import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '_/features/store';
import { useSelector } from 'react-redux';

// services
import { getCurrentUser } from "_/services/account";
import { login as api_login, signup as api_signup, logout as api_logout } from "_/services/auth";
import { updateCurrentUser as api_updateCurrentUser } from "_/services/account";

// types
import { Account } from "_/types";

interface State {
    info: Account | null;
}

const initialState: State = {
    info: null
};

type LoginPayload = {
    email: string,
    password: string
}
type UpdateProfileBody = Partial<{
    first_name: string;
    last_name: string;
    nickname: string;
    avatar: File;
    bio: string;
}>

export const initCurrentUser = createAsyncThunk("currentUser/init", async function (arg, thunkAPI) {
    const result = await getCurrentUser();

    return result;
});
export const updateCurrentUser = createAsyncThunk("currentUser/update", async function (payload: UpdateProfileBody, thunkAPI) {
    const body = payload;
    const result = await api_updateCurrentUser(body);

    return result;
})
export const login = createAsyncThunk("currentUser/login", async function (payload: LoginPayload, thunkAPI) {
    const { email, password } = payload;

    const result = await api_login(email, password);

    return result;
})
export const signup = createAsyncThunk("currentUser/signup", async function (payload: LoginPayload, thunkAPI) {
    const { email, password } = payload;

    const result = await api_signup(email, password);

    return result;
})
export const logout = createAsyncThunk("currentUser/logout", async function () {
    const result = await api_logout();

    return result.data;
})

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        saveCurrentUserInfo: (state, action: PayloadAction<Account>) => {
            state.info = action.payload;
        },
        clearCurrentUser: (state) => {
            state.info = null;
            localStorage.setItem("tiktok_access_token", JSON.stringify(null));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initCurrentUser.fulfilled, (state, action: PayloadAction<Account>) => {
                state.info = action.payload;
            })
            .addCase(initCurrentUser.rejected, (state) => {
                state.info = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.info = action.payload;
            })
            .addCase(login.rejected, (state) => {
                state.info = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.info = action.payload;
            })
            .addCase(signup.rejected, (state) => {
                state.info = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.info = null;
            })
            .addCase(updateCurrentUser.fulfilled, (state, action) => {
                state.info = action.payload;
            })
    }
});

export const { saveCurrentUserInfo, clearCurrentUser } = currentUserSlice.actions;

export const selectCurrentUserInfo = (state: RootState) => state.currentUser.info;

export const useCurrentUserInfo = () => useSelector(selectCurrentUserInfo);
export const useIsLoggedIn = () => {
    const currentUserInfo = useSelector(selectCurrentUserInfo);
    return !!currentUserInfo;
}

export default currentUserSlice.reducer;