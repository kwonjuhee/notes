import { isMarkdownFile, isPrivatePath } from "@/utils/markdown";
import { githubApi } from "./github";

const getWikiList = async () => {
  const { ref } = await githubApi.gitDatabase.getRef();
  const { tree: gitTree } = await githubApi.gitDatabase.getGitTree(ref);

  const mdList = gitTree.filter(
    (node) =>
      node.type === "blob" && node.path && !isPrivatePath(node.path) && isMarkdownFile(node.path)
  );

  return mdList;
};

const getWikiByPath = async (path: string) => {
  if (!isMarkdownFile(path)) throw new Error("Invalid path");

  const data = await githubApi.repository.getContent(path);

  const isDir = Array.isArray(data);
  if (isDir || data.type !== "file") throw new Error("Invalid path");

  return Buffer.from(data.content, "base64").toString();
};

export const wikiApi = {
  getWikiList,
  getWikiByPath,
};
