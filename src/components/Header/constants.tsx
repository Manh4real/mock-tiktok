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
          action: "lang",
          title: "Tiếng Việt",
        },
        {
          title: "English",
          children: {
            title: "English",
            content: [
              {
                action: "lang",
                title: "English (US)",
              },
              {
                action: "lang",
                title: "English (UK)",
              },
            ],
          },
        },
        {
          action: "lang",
          title: "Italian",
        },
        {
          action: "lang",
          title: "French",
        },
        {
          action: "lang",
          title: "Indonesia",
        },
        {
          action: "lang",
          title: "German",
        },
        {
          action: "lang",
          title: "Espanol",
        },
        {
          title: "Thai",
          children: {
            title: "Thai",
            content: [
              {
                action: "lang",
                title: "Thai 1",
              },
              { 
                action: "lang",
                title: "Thai 2" 
              },
            ],
          },
        },
        {
          action: "lang",
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
