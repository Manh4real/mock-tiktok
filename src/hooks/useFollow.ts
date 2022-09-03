import { AxiosError } from "axios";
import { useState } from "react";
import { useLoginContext } from "_/contexts";

import { followAccount, unfollowAccount } from "_/services/account";

const useFollow = (initialState: boolean, accountId: number) => {
    const [followed, setFollowed] = useState<boolean>(initialState);

    const { currentUser } = useLoginContext();

    const toggle = () => {
        const currentUserId = currentUser?.info.data.id;

        if (currentUserId === accountId) {
            alert("You cannot follow yourself.");
            return;
        }

        if (!followed) {
            followAccount(accountId)
                .then(() => {
                    setFollowed(true);
                })
                .catch((e: AxiosError) => {
                    const response = e.response?.data as any;

                    console.log(response.message);

                    alert(`Follow Account Error: ${response.message || "Something went wrong"}.`);
                });
        } else {
            unfollowAccount(accountId)
                .then(() => {
                    setFollowed(false);
                })
                .catch((e: AxiosError) => {
                    const response = e.response?.data as any;

                    console.log(response.message);

                    alert(`Unfollow Account Error: ${response.message || "Something went wrong"}.`);
                });
        }
    };

    return [followed, toggle] as [boolean, () => void];
}

export default useFollow;