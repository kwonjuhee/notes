import { Octokit } from "octokit";
import { getEnvVar } from "@/utils/env";

export const githubClient = new Octokit({ auth: getEnvVar("GITHUB_AUTH") });
export type GithubClient = Octokit;
