import { isMarkdownFile } from "@/utils/markdown";
import { githubApi } from "../github/github.api";
import { GetFileContentResponseData } from "../github/github.types";

export const BLOG_POSTS_DIR = "blog";

export const getPostList = async () => {
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
