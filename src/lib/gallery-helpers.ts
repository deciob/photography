export type ImageSize =
  | "thumbnails-small"
  | "thumbnails-large"
  | "large"
  | "original";

export function getImageUrl(
  filename: string,
  size: ImageSize,
  base: string = "",
) {
  return `${base}/gallery/images/${size}/${filename}`;
}

export function getImageSrcSet(filename: string, base: string = "") {
  return {
    small: getImageUrl(filename, "thumbnails-small", base),
    large: getImageUrl(filename, "thumbnails-large", base),
    full: getImageUrl(filename, "large", base),
    original: getImageUrl(filename, "original", base),
  };
}
