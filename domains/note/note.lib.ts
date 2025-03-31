import { notFound } from "next/navigation";
import { RequestError } from "octokit";
import { cache } from "react";
import { checkAuthentication } from "@/domains/auth/auth.actions";
import { Category, Note } from "@/domains/note/note.types";
import { decodeBase64 } from "@/utils/endecoder";
import {
  isMarkdownFile,
  isPrivatePath,
  markdownExtRegex,
  wikilinkByFileNameRegex,
  wikilinkRegex,
} from "@/utils/markdown";
import { githubApi } from "../github/github.api";
import { Blob, GetFileContentResponseData } from "../github/github.types";

export const getNoteList = cache(async (): Promise<Note[]> => {
  const { ref } = await githubApi.gitDatabase.getRef();
  const [{ tree }, categoryList] = await Promise.all([
    await githubApi.gitDatabase.getGitTree(ref),
    getCategoryList(),
  ]);

  const blobs = tree.filter((node) => node.type === "blob") as Blob[];
  const notes = blobs.map(transformBlobToNote);

  const { isLoggedIn } = await checkAuthentication();

  const isExistCategoryPath = (path: string) =>
    categoryList.some((category) => path.startsWith(category.slug));

  const isPublicCategoryPath = (path: string) =>
    categoryList.some((category) => path.startsWith(category.slug) && !category.isPrivate);

  const filteredNotes = notes.filter(
    (note) =>
      !isPrivatePath(note.path) &&
      isMarkdownFile(note.path) &&
      (isLoggedIn ? isExistCategoryPath(note.path) : isPublicCategoryPath(note.path))
  );

  return filteredNotes;
});

const transformBlobToNote = (blob: Blob): Note => {
  const slugs = blob.path.split("/");
  return {
    path: blob.path,
    name: slugs.at(-1) as string,
  };
};

export const getNotesByCategory = async (categorySlug: string) => {
  const notes = await getNoteList();

  return notes.filter((note) => note.path.startsWith(`${categorySlug}/`));
};

export const getNoteByPath = async (path: string): Promise<Note & { content: string }> => {
  try {
    if (!isMarkdownFile(path)) throw new Error("Invalid path");

    const data = await githubApi.repository.getContent(path);

    const isDir = Array.isArray(data);
    if (isDir || data.type !== "file") throw new Error("Invalid path");

    return {
      path: data.path,
      name: data.name,
      content: Buffer.from(data.content, "base64").toString(),
    };
  } catch (e) {
    if (e instanceof RequestError && e.status === 404) {
      notFound();
    }

    throw e;
  }
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

export const getLinks = async () => {
  const notes = await getNoteList();
  const notesWithContent = await Promise.all(notes.map((node) => getNoteByPath(node.path)));

  return notesWithContent.reduce(
    (acc, note) => {
      const matches = Array.from(note.content.matchAll(wikilinkRegex));

      if (!matches) return acc;

      const targetNotes = matches
        .map(([, targetNote]) =>
          notes.find((e) => e.name.replace(markdownExtRegex, "") === targetNote)
        )
        .filter(Boolean) as Note[];

      return [
        ...acc,
        ...targetNotes.map((targetNote) => ({
          source: note.path,
          target: targetNote.path,
        })),
      ];
    },
    [] as Array<{ source: string; target: string }>
  );
};

export const getBacklinks = async (noteName: string) => {
  const notes = await getNoteList();
  const notesWithcontent = await Promise.all(notes.map((node) => getNoteByPath(node.path)));

  return notesWithcontent.filter((data) => wikilinkByFileNameRegex(noteName).test(data.content));
};
