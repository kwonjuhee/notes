import { isMarkdownFile } from "@/utils/markdown";
import { githubApi } from "./github";
import { GetFileContentResponseData } from "./github.types";

export const BLOG_POSTS_DIR = "blog";

const getPostList = async () => {
  const data = await githubApi.repository.getContent(BLOG_POSTS_DIR);

  if (!Array.isArray(data)) throw new Error(`Not a directory path`);

  const mdList = data.filter(
    ({ type, name }) => type === "file" && isMarkdownFile(name)
  ) as GetFileContentResponseData[];

  const postList = (await Promise.all(
    mdList.map(({ path }) => githubApi.repository.getContent(path))
  )) as GetFileContentResponseData[];

  return postList;
};

export const getPostBySlug = async (slug: string) => {
  const postList = await getPostList();

  return postList.find((post) => post.name === slug);
};

export const postApi = {
  getPostList,
  getPostBySlug,
};
