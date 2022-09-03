// icons
import { FiLogOut, FiSettings } from "react-icons/fi";
import {
  Language,
  QuestionMark,
  RoundedKeyboard,
  TiktokCoin,
} from "_/components/icons";

// components
import KeyboardModal from "_/components/KeyboardModal";

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
          children: {
            title: "Thai",
            content: [
              {
                title: "Thai 1",
              },
              { title: "Thai 2" },
            ],
          },
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
