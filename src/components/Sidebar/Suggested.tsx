import React, { useState } from "react";
import clsx from "clsx";

// components
import AccountPopup from "./AccountPopup";
import Account from "./Account";
import { SidebarDelimiter } from "./common";

// styles
import styles from "./Sidebar.module.scss";

// types
import { Account as AccountInterface } from "_/types";

export type SuggestedItem = Partial<AccountInterface>;

const SUGGESTED_DATA: SuggestedItem[] = [
  {
    nickname: "selena_gomez2301asdfasdfasdfsdf ",
    full_name: "Selena Gomez",
    avatar:
      "https://ca-times.brightspotcdn.com/dims4/default/037e6e5/2147483647/strip/true/crop/2160x2160+0+0/resize/840x840!/format/webp/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8f%2F8f%2F462226764ec386fc2a325793885d%2Fpic-10-1sophie-muller-copy.jpg",
    onLive: true,
    tick: true,
    followers_count: 1000000,
    likes_count: 30234000,
  },
  {
    nickname: "21_savage",
    full_name: "21 Savage",
    avatar:
      "https://upload.wikimedia.org/wikipedia/en/3/36/21_Savage_%E2%80%93_I_Am_Greater_Than_I_Was.png",
    tick: true,
    followers_count: 1234230000000,
    likes_count: 5032300,
  },
  {
    nickname: "manh4real",
    full_name: "Nguyen Van Manh",
    followers_count: 1,
    likes_count: 0,
  },
  {
    nickname: "4Lgang",
    full_name: "Gang gang",
    followers_count: 43000,
    likes_count: 3434500,
  },
  {
    nickname: "thebigstepper",
    full_name: "Kendrick Lamar",
    avatar:
      "https://upload.wikimedia.org/wikipedia/en/e/e1/Kendrick_Lamar_-_Mr._Morale_%26_the_Big_Steppers.png",
    tick: true,
    followers_count: 32527900,
    likes_count: 28860000,
  },
];

function Suggested() {
  const [suggestedShown, setSuggestedShown] = useState<boolean>(false);
  const [suggested, setSuggested] = useState<SuggestedItem[]>(SUGGESTED_DATA);

  const handleSeeAll = () => {
    if (!suggestedShown) setSuggested((prev) => [...prev, ...SUGGESTED_DATA]);
    else setSuggested([...SUGGESTED_DATA]);

    setSuggestedShown((prev) => !prev);
  };

  return (
    <React.Fragment>
      <>
        <div
          className={clsx(
            styles["sidebar__section"],
            styles["sidebar__suggested-accs"]
          )}
        >
          <h5 className={styles["sidebar__header-title"]}>
            Suggested accounts
          </h5>
          <div className={styles["sidebar__accs__cnt"]}>
            <div>
              {suggested.map((item, i) => {
                return (
                  <AccountPopup account={item} key={i}>
                    <Account account={item} />
                  </AccountPopup>
                );
              })}
            </div>
            <button
              className={clsx("pink-font", styles["sidebar__more-btn"])}
              onClick={handleSeeAll}
            >
              See {suggestedShown ? "less" : "all"}
            </button>
          </div>
        </div>
        <SidebarDelimiter />
      </>
    </React.Fragment>
  );
}

export default Suggested;
