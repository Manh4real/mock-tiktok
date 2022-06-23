import React, { useState } from "react";
import clsx from "clsx";
import { Link, NavLink } from "react-router-dom";

import {
  Home as HomeIcon,
  Men as MenIcon,
  Camera,
  HashTag,
  VerifyBadge,
} from "_/components/icons";
import CustomButton from "_/components/CustomButton";

import styles from "./Sidebar.module.scss";

import { IconProps } from "_/types";

interface NavLinkProps {
  isActive: boolean;
}

function Sidebar() {
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
    <div className={styles["sidebar"]}>
      <div className={styles["sidebar__nav"]}>
        <NavLink to="/" className={getSidebarClassName}>
          {getSideBarNavLinkContent(HomeIcon, "For you")}
        </NavLink>
        <NavLink to="/following" className={getSidebarClassName}>
          {getSideBarNavLinkContent(MenIcon, "Following")}
        </NavLink>
        <NavLink to="/live" className={getSidebarClassName}>
          {getSideBarNavLinkContent(Camera, "LIVE")}
        </NavLink>
      </div>
      <SidebarDelimiter />
      <LogInSection />
      <SidebarDelimiter />
      <div
        className={clsx(
          styles["sidebar__section"],
          styles["sidebar__suggested-accs"]
        )}
      >
        <h5 className={styles["sidebar__header-title"]}>Suggested accounts</h5>
        <div className={styles["sidebar__accs__cnt"]}>
          <div>
            <Link to="/" className={styles["sidebar__accs-link"]}>
              <div className={styles["sidebar__acc-avatar"]}>
                <img src="" alt="" />
              </div>
              <div>
                <div className={styles["sidebar__acc-username"]}>
                  selena_gomez2301
                  <VerifyBadge />
                </div>
                <div className={styles["sidebar__acc-user-desc"]}>
                  Selena Gomez
                </div>
              </div>
            </Link>
            <Link to="/" className={styles["sidebar__accs-link"]}>
              <div className={styles["sidebar__acc-avatar"]}>
                <img src="" alt="" />
              </div>
              <div>
                <div className={styles["sidebar__acc-username"]}>
                  21_savage
                  <VerifyBadge />
                </div>
                <div className={styles["sidebar__acc-user-desc"]}>
                  21 Savage
                </div>
              </div>
            </Link>
            <Link to="/" className={styles["sidebar__accs-link"]}>
              <div className={styles["sidebar__acc-avatar"]}>
                <img src="" alt="" />
              </div>
              <div>
                <div className={styles["sidebar__acc-username"]}>manh4real</div>
                <div className={styles["sidebar__acc-user-desc"]}>
                  Nguyen Van Manh
                </div>
              </div>
            </Link>
            <Link to="/" className={styles["sidebar__accs-link"]}>
              <div className={styles["sidebar__acc-avatar"]}>
                <img src="" alt="" />
              </div>
              <div>
                <div className={styles["sidebar__acc-username"]}>4Lgang</div>
                <div className={styles["sidebar__acc-user-desc"]}>
                  Gang gang
                </div>
              </div>
            </Link>
            <Link to="/" className={styles["sidebar__accs-link"]}>
              <div className={styles["sidebar__acc-avatar"]}>
                <img src="" alt="" />
              </div>
              <div>
                <div className={styles["sidebar__acc-username"]}>
                  thebigsteppers
                  <VerifyBadge />
                </div>
                <div className={styles["sidebar__acc-user-desc"]}>
                  Kendrick Lamar
                </div>
              </div>
            </Link>
          </div>
          <button className={clsx("pink-font", styles["sidebar__more-btn"])}>
            See all
          </button>
        </div>
      </div>
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
      <div
        className={clsx(styles["sidebar__section"], styles["sidebar__footer"])}
      >
        <ul className={styles["sidebar__footer-list"]}>
          <li>
            <a href="/" className={styles["sidebar__footer-link"]}>
              About
            </a>
          </li>
          <li>
            <a href="/" className={styles["sidebar__footer-link"]}>
              Tiktok Browse
            </a>
          </li>
          <li>
            <a href="/" className={styles["sidebar__footer-link"]}>
              NewsRoom
            </a>
          </li>
          <li>
            <a href="/" className={styles["sidebar__footer-link"]}>
              Contact
            </a>
          </li>
          <li>
            <a href="/" className={styles["sidebar__footer-link"]}>
              Careers
            </a>
          </li>
          <li>
            <a href="/" className={styles["sidebar__footer-link"]}>
              ByteDance
            </a>
          </li>
        </ul>
        <ul className={styles["sidebar__footer-list"]}>
          <li>
            <a href="/" className={styles["sidebar__footer-link"]}>
              Tiktok for Good
            </a>
          </li>
          <li>
            <a href="/" className={styles["sidebar__footer-link"]}>
              Advertise
            </a>
          </li>
          <li>
            <a href="/" className={styles["sidebar__footer-link"]}>
              Developers
            </a>
          </li>
          <li>
            <a href="/" className={styles["sidebar__footer-link"]}>
              Transparency
            </a>
          </li>
          <li>
            <a href="/" className={styles["sidebar__footer-link"]}>
              TikTok Rewards
            </a>
          </li>
        </ul>
        <ul className={styles["sidebar__footer-list"]}>
          <li>
            <a href="/" className={styles["sidebar__footer-link"]}>
              Help
            </a>
          </li>
          <li>
            <a href="/" className={styles["sidebar__footer-link"]}>
              Safety
            </a>
          </li>
          <li>
            <a href="/" className={styles["sidebar__footer-link"]}>
              Terms
            </a>
          </li>
          <li>
            <a href="/" className={styles["sidebar__footer-link"]}>
              Privacy
            </a>
          </li>
          <li>
            <a href="/" className={styles["sidebar__footer-link"]}>
              Creator Portal
            </a>
          </li>
          <li>
            <a href="/" className={styles["sidebar__footer-link"]}>
              Community Guidelines
            </a>
          </li>
        </ul>

        <p>© 2022 TikTok</p>
      </div>
    </div>
  );
}

const FollowingAccountsSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  if (!isLoggedIn) {
    return <></>;
  }
  return (
    <>
      <div
        className={clsx(
          styles["sidebar__section"],
          styles["sidebar__following-accs"]
        )}
      >
        <h5 className={styles["sidebar__header-title"]}>Following accounts</h5>
        <div className={styles["sidebar__accs__cnt"]}>
          <div>
            <Link to="/" className={styles["sidebar__accs-link"]}>
              <div className={styles["sidebar__acc-avatar"]}>
                <img src="" alt="" />
              </div>
              <div>
                <div className={styles["sidebar__acc-username"]}>
                  squatuniversity
                  <VerifyBadge />
                </div>
                <div className={styles["sidebar__acc-user-desc"]}>
                  Squat University
                </div>
              </div>
            </Link>
            <Link to="/" className={styles["sidebar__accs-link"]}>
              <div className={styles["sidebar__acc-avatar"]}>
                <img src="" alt="" />
              </div>
              <div>
                <div className={styles["sidebar__acc-username"]}>
                  thejoestanek
                  <VerifyBadge />
                </div>
                <div className={styles["sidebar__acc-user-desc"]}>
                  Joe Stanek
                </div>
              </div>
            </Link>
          </div>
          <button className={clsx("pink-font", styles["sidebar__more-btn"])}>
            See more
          </button>
        </div>
      </div>
      <SidebarDelimiter />
    </>
  );
};

const LogInSection = () => {
  return (
    <div className={clsx(styles["sidebar__section"])}>
      <p style={{ color: "var(--grey-200)" }}>
        Log in to follow creators, like videos, and view comments.
      </p>
      <CustomButton
        style={{
          width: "100%",
          marginTop: "20px",
        }}
        large
        outlined
      >
        Log in
      </CustomButton>
    </div>
  );
};

const SidebarDelimiter = () => {
  return <div className={styles["sidebar__delimiter"]}></div>;
};

export default Sidebar;
