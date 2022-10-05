import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
    EntityId,
    PayloadAction,
    Update
} from "@reduxjs/toolkit";
import { Account } from "_/types";

import { RootState } from "_/features/store";
import { useSelector } from "react-redux";
import {
    getAccountByNickname,
    getFollowingAccounts,
    getSuggestedAccounts,
    unfollowAccount
} from "_/services/account";

const accountsAdapter = createEntityAdapter<Account>({
    selectId: ({ id }) => id
})
const initialState = accountsAdapter.getInitialState<Account[]>([]);

const accountsSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {
        addAccount: (state, action: PayloadAction<Account>) => {
            accountsAdapter.upsertOne(state, action.payload);
        },
        setAccounts: (state, action: PayloadAction<Account[]>) => {
            accountsAdapter.upsertMany(state, action.payload)
        },
        updateAccount: (state, action: PayloadAction<Update<Account>>) => {
            accountsAdapter.updateOne(state, action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFollowingAccounts.fulfilled, (state, action: PayloadAction<Account[]>) => {
                accountsAdapter.upsertMany(state, action.payload);
            })
            .addCase(fetchSuggestedAccounts.fulfilled, (state, action: PayloadAction<Account[]>) => {
                accountsAdapter.upsertMany(state, action.payload);
            })
            .addCase(unfollowAccountThunk.fulfilled, (state, action: PayloadAction<Account>) => {
                accountsAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: {
                        is_followed: action.payload.is_followed
                    }
                });
            })
            .addCase(getAccount.fulfilled, (state, action: PayloadAction<Account>) => {
                accountsAdapter.upsertOne(state, action.payload);
            })
    }
});

export const getAccount = createAsyncThunk("accounts/getAccount", async function (payload: string, thunkAPI) {
    const nickname = payload;

    const response = await getAccountByNickname(nickname);

    return response;
})

export const fetchFollowingAccounts = createAsyncThunk(
    "accounts/following",
    async function (payload: { page?: number }, thunkAPI) {
        const response = await getFollowingAccounts(payload.page);

        if (!response) return [];

        return response;
    }
);
export const fetchSuggestedAccounts = createAsyncThunk(
    "accounts/suggested",
    async function (payload, thunkAPI) {
        const response = await getSuggestedAccounts();

        if (!response) return null;

        return response;
    }
);
export const unfollowAccountThunk = createAsyncThunk(
    "accounts/unfollow",
    async function (payload: number, thunkAPI) {
        const response = await unfollowAccount(payload);

        return response;
    }
);

export const { addAccount, setAccounts, updateAccount } = accountsSlice.actions;
export const {
    selectAll: selectAllAccounts,
    selectById: selectAccountById,
    selectEntities: selectAccountsEntities,
    selectIds: selectAccountsIds,
    selectTotal: selectAccountsTotal
} = accountsAdapter.getSelectors((state: RootState) => state.accounts);

export const useAccountsIds = () => useSelector(selectAccountsIds);
export const useAccountById = (id: EntityId) => {
    return useSelector(
        (state: RootState) => selectAccountById(state, id)
    );
}
export const useIsFollowed = (accountId: EntityId) => {
    return !!useAccountById(accountId)?.is_followed;
}

const selectFollowingAccounts = createSelector(
    (state: RootState) => state.accounts,
    (accounts: Account[]) => {
        return accounts.filter(account => account.is_followed)
    }
);
export const useFollowingAccounts = () => useSelector(selectFollowingAccounts)

export default accountsSlice.reducer;