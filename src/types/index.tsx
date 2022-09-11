import React from "react";

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
  modal?: React.FC<ModalProps>;
}

export interface ModalProps {
  handleOpen?: () => void;
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

  videos: Video[];
  is_followed: boolean;

  onLive?: boolean;
}

export interface Post {
  id: number;
  content: string;
  placeholder: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  views_count: number;
  audio_url: string;
  video_url: string;
  posted_at: number;
  author_id: number;
}

export interface Video {
  id: number;
  uuid: string;
  user_id: number;
  type: string;
  thumb_url: string;
  file_url: string;
  description: string;
  music: string;
  is_liked: boolean;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  views_count: number;
  viewable: Viewer;
  allows: ViewerPermission;
  published_at: string;
  created_at: string;
  updated_at: string;
  user: Account;
  meta: {
    file_size: number;
    file_format: string;
    mime_type: string;
    playtime_string: string;
    playtime_seconds: number;
    bitrate: number;
    video: {
      dataformat: string;
      rotate: number;
      resolution_x: number;
      resolution_y: number;
      fourcc: string;
      fourcc_lookup: string;
      frame_rate: number;
    };
  };
}

export interface Comment {
  id: number;
  comment: string;
  likes_count: number;
  is_liked: boolean;
  created_at: string;
  updated_at: string;
  user: Account;
}

export type Viewer = "public" | "friends" | "private";
export type ViewerPermission = ("comment" | "duet" | "stitch")[];

export interface VideoRefObject {
  pause: () => void;
  play: () => void;
}

export type VideoListType = "for-you" | "following" | "profile";

//
export type ResponseWithPagination<T> = {
  data: T[];
  meta: {
    pagination: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
      links: {
        prev?: string;
        next?: string;
      };
    };
  };
};
