import { AxiosError } from "axios";
import { updateAccount, useIsFollowed } from "_/features/accounts/accountsSlice";

// Redux
import { useCurrentUserInfo } from "_/features/currentUser/currentUserSlice";
import { useAppDispatch } from "_/features/hooks";
import { show } from "_/features/alert/alertSlice";

import { followAccount, unfollowAccount } from "_/services/account";

const useFollow = (accountId: number) => {
    const followed = useIsFollowed(accountId);

    const dispatch = useAppDispatch();
    const currentUserInfo = useCurrentUserInfo();

    const toggle = () => {
        const currentUserId = currentUserInfo?.id;

        if (currentUserId === accountId) {
            // alert("You cannot follow yourself.");
            dispatch(show({ message: "You cannot follow yourself." }))
            return;
        }

        if (!followed) {
            followAccount(accountId)
                .then(() => {
                    dispatch(updateAccount({
                        id: accountId,
                        changes: {
                            is_followed: true
                        }
                    }));
                })
                .catch((e: AxiosError) => {
                    const response = e.response?.data as any;

                    console.log(response.message);

                    // alert(`Follow Account Error: ${response.message || "Something went wrong"}.`);
                    dispatch(show({ message: `Follow Account Error: ${response.message || "Something went wrong"}.` }))

                });
        } else {
            unfollowAccount(accountId)
                .then(() => {
                    dispatch(updateAccount({
                        id: accountId,
                        changes: {
                            is_followed: false
                        }
                    }));
                })
                .catch((e: AxiosError) => {
                    const response = e.response?.data as any;

                    console.log(response.message);

                    // alert(`Unfollow Account Error: ${response.message || "Something went wrong"}.`);
                    dispatch(show({ message: `Unfollow Account Error: ${response.message || "Something went wrong"}.` }))
                });
        }
    };

    return [followed, toggle] as [boolean, () => void];
}

export default useFollow;