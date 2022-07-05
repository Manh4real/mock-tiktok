import React from "react";
import clsx from "clsx";
import { Link, NavLink } from "react-router-dom";

// icons
import {
  Home as HomeIcon,
  Men as MenIcon,
  Camera,
  HashTag,
} from "_/components/icons";

// components
import FollowingAccountsSection from "../FollowingAccountsSection";
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
  const getSidebarClassName = ({ isActive }: NavLinkProps) => {
    return clsx(styles["sidebar__nav-link"], {
      [styles["sidebar__nav-link--active"]]: isActive,
    });
  };
  const getSideBarNavLinkContent = (
    Icon: React.FC<IconProps>,
    title: string
  ) => {
    return ({ isActive }: NavLinkProps) => {
      return (
        <>
          <Icon solid={isActive} />
          <h3>{title}</h3>
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
      <div
        className={clsx(
          styles["sidebar__section"],
          styles["sidebar__discover"]
        )}
      >
        <h5 className={styles["sidebar__header-title"]}>Discover</h5>
        <div className={styles["sidebar__discover-tags"]}>
          <Link to="/tag/gang" className={styles["sidebar__discover-tag"]}>
            <HashTag /> gang
          </Link>
          <Link to="/tag/rap" className={styles["sidebar__discover-tag"]}>
            <HashTag /> rap
          </Link>
          <Link to="/tag/culture" className={styles["sidebar__discover-tag"]}>
            <HashTag /> culture
          </Link>
          <Link to="/tag/art" className={styles["sidebar__discover-tag"]}>
            <HashTag /> art
          </Link>
          <Link
            to="/tag/philosophy"
            className={styles["sidebar__discover-tag"]}
          >
            <HashTag /> philosophy
          </Link>
          <Link to="/tag/physics" className={styles["sidebar__discover-tag"]}>
            <HashTag /> physics
          </Link>
        </div>
      </div>
      <SidebarDelimiter />
      <Footer />
    </div>
  );
}

export const SidebarDelimiter = () => {
  return <div className={styles["sidebar__delimiter"]}></div>;
};

export default CommonSidebar;
