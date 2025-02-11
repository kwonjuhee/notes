import { GithubClient } from "./client";

export type GetRefResponseData = Awaited<ReturnType<GithubClient["rest"]["git"]["getRef"]>>["data"];

export type GetGitTreeResponseData = Awaited<
  ReturnType<GithubClient["rest"]["git"]["getTree"]>
>["data"];

export type GetContentResponseData = Awaited<
  ReturnType<GithubClient["rest"]["repos"]["getContent"]>
>["data"];
