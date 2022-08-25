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
  modal?: React.ForwardRefExoticComponent<React.RefAttributes<ModalRefObject>>;
}

export interface ModalRefObject {
  handleOpen: () => void;
  handleClose: (e: React.MouseEvent) => void;
}

export interface Account {
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

  onLive?: boolean;
}

export interface Post {
  id: number;
  content: string;
  placeholder: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  audio_url: string;
  video_url: string;
  posted_at: number;
  author_id: number;
}
