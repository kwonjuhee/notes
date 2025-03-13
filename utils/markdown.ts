import { CLOUDINARY_URL } from "@/constants/markdown";

export const markdownExtRegex = /\.md$/;
export const imageExtRegex = /\.(jpg|jpeg|png|webp|avif|svg)$/;
export const privatePathRegex = /^_.*/;
export const wikilinkRegex = (noteName: string) =>
  new RegExp(`(?<!!)\\[\\[[^\\]]*${noteName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^\\]]*\\]\\]`);

export const isMarkdownFile = (path: string) => markdownExtRegex.test(path);

export const isImageFile = (path: string) => imageExtRegex.test(path);

export const isPrivatePath = (path: string) => privatePathRegex.test(path);

export const getImageUrl = (url: string) => {
  return `${CLOUDINARY_URL}/${url.replace(/\s+/g, "-")}`;
};
