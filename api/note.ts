import { Category } from "@/types/category";
import { decodeBase64 } from "@/utils/endecoder";
import { isMarkdownFile, isPrivatePath } from "@/utils/markdown";
import { githubApi } from "./github";
import { GetFileContentResponseData } from "./github.types";

const getNoteList = async (prefix: string = "") => {
  const { ref } = await githubApi.gitDatabase.getRef();
  const { tree: gitTree } = await githubApi.gitDatabase.getGitTree(ref);

  const mdList = gitTree.filter(
    (node) =>
      node.type === "blob" &&
      node.path &&
      !isPrivatePath(node.path) &&
      isMarkdownFile(node.path) &&
      node.path.startsWith(prefix)
  );

  return mdList;
};

const getNoteByPath = async (path: string) => {
  if (!isMarkdownFile(path)) throw new Error("Invalid path");

  const data = await githubApi.repository.getContent(path);

  const isDir = Array.isArray(data);
  if (isDir || data.type !== "file") throw new Error("Invalid path");

  return Buffer.from(data.content, "base64").toString();
};

export const getCategoryList = async (): Promise<Category[]> => {
  try {
    const data = (await githubApi.repository.getContent(
      "/category.json"
    )) as GetFileContentResponseData;

    const content = JSON.parse(decodeBase64(data.content));

    return content;
  } catch (e) {
    return [];
  }
};

export const noteApi = {
  getNoteList,
  getNoteByPath,
  getCategoryList,
};
