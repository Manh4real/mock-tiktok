export const CANVAS_IMAGE_QUALITY = 0.15;
export const CANVAS_IMAGE_TYPE = "image/jpeg";

export const CoverConstants = {
  IMAGES_NUM: 8,
  IMAGE_WIDTH: 84.2 * 10, // 1920
  IMAGE_HEIGHT: 150 * 10, // 1080
} as const;

export const savedCovers = new Map<string, string>();
