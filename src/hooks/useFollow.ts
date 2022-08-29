import { useState } from "react";

import { followAccount, unfollowAccount } from "_/services/account";

const useFollow = (initialState: boolean, accountId: number) => {
    const [followed, setFollowed] = useState<boolean>(initialState);

    const toggle = () => {
        if (!followed) {
            followAccount(accountId)
                .then(() => {
                    setFollowed(true);
                })
                .catch(() => {
                    alert("Follow Account Error: Something went wrong.");
                });
        } else {
            unfollowAccount(accountId)
                .then(() => {
                    setFollowed(false);
                })
                .catch(() => {
                    alert("Unfollow Account Error: Something went wrong.");
                });
        }
    };

    return [followed, toggle] as [boolean, () => void];
}

export default useFollow;