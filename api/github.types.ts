import { GithubClient } from "./client";

export type GetRefResponseData = Awaited<ReturnType<GithubClient["rest"]["git"]["getRef"]>>["data"];

export type GetGitTreeResponseData = Awaited<
  ReturnType<GithubClient["rest"]["git"]["getTree"]>
>["data"];

export type GitTree = GetGitTreeResponseData["tree"];

export type Blob = GitTree[number] & { type: "blob"; path: string };

export type GetContentResponseData = Awaited<
  ReturnType<GithubClient["rest"]["repos"]["getContent"]>
>["data"];

export type GetFileContentResponseData = Extract<GetContentResponseData, { type: "file" }>;
