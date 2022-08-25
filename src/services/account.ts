import { fakeApi } from "_/api";

export const getAccount = async (id: number) => {
    const result = await fakeApi.get(`accounts/${id}`);
    const data = result.data;

    return data;
}

export const getSuggestedAccounts = async () => {
    const result = await fakeApi.get('accounts', {
        params: {
            _limit: 10
        }
    });
    const data = result.data;

    return data;
}

export const getFollowingAccounts = async () => {
    const result = await fakeApi.get(`accounts?id=12367860&id=12367861`);

    const data = result.data;

    return data;
}