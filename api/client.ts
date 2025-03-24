import { Octokit } from "octokit";
import { getEnvVar } from "@/utils/env";

export const githubClient = new Octokit({
  auth: getEnvVar("GITHUB_AUTH"),
  request: {
    fetch: (url: string, options: RequestInit): Promise<Response> => {
      const modifiedOptions: RequestInit = {
        ...options,
        cache: "force-cache",
      };
      return fetch(url, modifiedOptions);
    },
  },
});
export type GithubClient = Octokit;
