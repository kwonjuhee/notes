export const markdownExtRegex = /\.md$/;
export const imageExtRegex = /\.(jpg|jpeg|png|webp|avif|svg)$/;
export const privatePathRegex = /^_.*/;

export const isMarkdownFile = (path: string) => markdownExtRegex.test(path);

export const isImageFile = (path: string) => imageExtRegex.test(path);

export const isPrivatePath = (path: string) => privatePathRegex.test(path);
