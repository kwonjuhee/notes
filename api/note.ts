import { Category } from "@/types/category";
import { Note } from "@/types/note";
import { decodeBase64 } from "@/utils/endecoder";
import { isMarkdownFile, isPrivatePath } from "@/utils/markdown";
import { githubApi } from "./github";
import { Blob, GetFileContentResponseData } from "./github.types";

const getNoteList = async (prefix = ""): Promise<Note[]> => {
  const { ref } = await githubApi.gitDatabase.getRef();
  const { tree } = await githubApi.gitDatabase.getGitTree(ref);

  const blobs = tree.filter((node) => node.type === "blob") as Blob[];

  const notes = blobs.map(transformBlobToNote);

  const filteredNotes = notes.filter(
    (note) => !isPrivatePath(note.path) && isMarkdownFile(note.path) && note.path.startsWith(prefix)
  );

  return filteredNotes;
};

const transformBlobToNote = (blob: Blob): Note => {
  const slugs = blob.path.split("/");
  return {
    path: blob.path,
    name: slugs.at(-1) as string,
  };
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
