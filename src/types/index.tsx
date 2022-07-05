export interface IconProps {
  solid?: boolean;
}

export interface PopupMenuItem {
  action?: string;
  icon?: JSX.Element;
  title: string;
  to?: string;
  children?: {
    title: string;
    content: PopupMenuItem[];
  };
  delimited?: boolean;
  modal?: React.ForwardRefExoticComponent<React.RefAttributes<unknown>>;
}

export interface ModalRefObject {
  handleOpen: () => void;
}

export interface SearchResult {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  nickname: string;
  avatar: string;
  bio: string;
  tick: boolean;
  followings_count: number;
  followers_count: number;
  likes_count: number;
  website_url: string;
  facebook_url: string;
  youtube_url: string;
  twitter_url: string;
  instagram_url: string;
  created_at: string;
  updated_at: string;
}
