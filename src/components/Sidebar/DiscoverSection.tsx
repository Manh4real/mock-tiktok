import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

// icons
import { HashTag, MusicNote } from "_/components/icons";

// styles
import styles from "./Sidebar.module.scss";

const DISCOVER_DATA = [
  {
    title: "gang",
    type: "tag",
  },
  {
    title: "rap",
    type: "tag",
  },
  {
    title: "culture",
    type: "tag",
  },
  {
    title: "art",
    type: "tag",
  },
  {
    title: "Me or Sum (feat. Future & Lil Baby) - Nardo Wick",
    type: "music",
  },
  {
    title: "philosophy",
    type: "tag",
  },
  {
    title: "physics",
    type: "tag",
  },
  {
    title: "ELEMENT. - Kendrick Lamar",
    type: "music",
  },
];

function DiscoverSection() {
  return (
    <div
      className={clsx(styles["sidebar__section"], styles["sidebar__discover"])}
    >
      <h5 className={styles["sidebar__header-title"]}>Discover</h5>
      <div className={styles["sidebar__discover-tags"]}>
        {DISCOVER_DATA.map((item) => {
          let icon: JSX.Element | null = null;

          if (item.type === "tag") {
            icon = <HashTag />;
          } else if (item.type === "music") {
            icon = <MusicNote />;
          }

          return (
            <Link
              key={item.title}
              to={item.type + "/" + item.title}
              className={styles["sidebar__discover-tag"]}
            >
              {icon}
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default DiscoverSection;
