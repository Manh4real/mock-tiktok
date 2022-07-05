// icons
import { FiLogOut, FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import {
  Language,
  QuestionMark,
  RoundedKeyboard,
  TiktokCoin,
} from "_/components/icons";

// components
import KeyboardModal from "./KeyboardModal";

// types
import { PopupMenuItem } from "_/types";

export const INCOMMON_MENU_LIST: PopupMenuItem[] = [
  {
    icon: <Language />,
    title: "English",
    children: {
      title: "Language",
      content: [
        {
          title: "Tiếng Việt",
        },
        {
          title: "English",
          children: {
            title: "English",
            content: [
              {
                title: "English (US)",
              },
              {
                title: "English (UK)",
              },
            ],
          },
        },
        {
          title: "Italian",
        },
        {
          title: "French",
        },
        {
          title: "Indonesia",
        },
        {
          title: "German",
        },
        {
          title: "Espanol",
        },
        {
          title: "Thai",
        },
        {
          title: "Brazilian",
        },
      ],
    },
  },
  {
    icon: <QuestionMark />,
    to: "/feedback",
    title: "Feedback and help",
  },
  {
    icon: <RoundedKeyboard />,
    title: "Keyboard shortcuts",
    modal: KeyboardModal,
  },
];

export const PROFILE_MENU_LIST: PopupMenuItem[] = [
  {
    icon: <CgProfile />,
    to: "/@gang4L",
    title: "View profile",
  },
  {
    icon: <TiktokCoin />,
    to: "/coin",
    title: "Get coins",
  },
  {
    icon: <FiSettings />,
    to: "/setting",
    title: "Settings",
  },
  ...INCOMMON_MENU_LIST,
  {
    icon: <FiLogOut />,
    to: "/logout",
    title: "Log out",
    delimited: true,
  },
];
