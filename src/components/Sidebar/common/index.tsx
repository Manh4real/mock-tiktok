import React from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

// icons
import { Home as HomeIcon, Men as MenIcon, Camera } from "_/components/icons";

// components
import FollowingAccountsSection from "../FollowingAccountsSection";
import DiscoverSection from "../DiscoverSection";
import Footer from "../Footer";

// styles
import styles from "../Sidebar.module.scss";

// variables
import routes from "_/config/routes";

// types
import { IconProps } from "_/types";

interface NavLinkProps {
  isActive: boolean;
}
interface Props {
  compact?: boolean;
  style?: {
    [index: string]: string | number;
  };
  children?: React.ReactNode;
}

function CommonSidebar({ compact = false, style, children }: Props) {
  // simplify writing class name
  const getSidebarClassName = ({ isActive }: NavLinkProps) => {
    return clsx(styles["sidebar__nav-link"], {
      [styles["sidebar__nav-link--active"]]: isActive,
    });
  };

  // simplify writing NavLink render prop
  const getSideBarNavLinkContent = (
    Icon: React.FC<IconProps>,
    title: string
  ) => {
    return ({ isActive }: NavLinkProps) => {
      return (
        <>
          <Icon solid={isActive} />
          <h3 className={styles["text"]}>{title}</h3>
        </>
      );
    };
  };

  return (
    <div
      className={clsx(styles["sidebar"], { [styles["is--compact"]]: compact })}
      style={style}
    >
      <div className={styles["sidebar__nav"]}>
        <NavLink to={routes.root} className={getSidebarClassName}>
          {getSideBarNavLinkContent(HomeIcon, "For you")}
        </NavLink>
        <NavLink to={routes.following} className={getSidebarClassName}>
          {getSideBarNavLinkContent(MenIcon, "Following")}
        </NavLink>
        <NavLink to={routes.live} className={getSidebarClassName}>
          {getSideBarNavLinkContent(Camera, "LIVE")}
        </NavLink>
      </div>
      <SidebarDelimiter />
      {children}
      <SidebarDelimiter />
      <FollowingAccountsSection />
      <DiscoverSection />
      <SidebarDelimiter />
      <Footer />
    </div>
  );
}

export const SidebarDelimiter = () => {
  return <div className={styles["sidebar__delimiter"]}></div>;
};

export default CommonSidebar;
