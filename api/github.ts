import { getEnvVar } from "@/utils/env";
import { GithubClient, githubClient } from "./client";
import { GetContentResponseData, GetGitTreeResponseData, GetRefResponseData } from "./github.types";

class GithubApi {
  protected client: GithubClient;
  protected owner: string;
  protected repo: string;

  constructor() {
    this.client = githubClient;
    this.owner = getEnvVar("GITHUB_OWNER");
    this.repo = getEnvVar("GITHUB_REPO");
  }
}

class GitDatabaseApi extends GithubApi {
  async getRef(ref: string = "heads/main"): Promise<GetRefResponseData> {
    const response = await this.client.rest.git.getRef({
      owner: this.owner,
      repo: this.repo,
      ref,
    });

    return response.data;
  }

  /**
   * @TODO
   * If `truncated` is true in the response then the number of items in the tree array exceeded our maximum limit.
   * (The limit for `tree` array is 100,000 entries with a maximum size of 7MB)
   *
   * If you need to fetch more items, use the non-recursive method of fetching trees, and fetch one sub-tree at a time.
   */
  async getGitTree(treeSha: string): Promise<GetGitTreeResponseData> {
    const response = await this.client.rest.git.getTree({
      owner: this.owner,
      repo: this.repo,
      tree_sha: treeSha,
      recursive: "true",
    });

    return response.data;
  }
}

class RepositoryApi extends GithubApi {
  async getContent(path: string = ""): Promise<GetContentResponseData> {
    const response = await this.client.rest.repos.getContent({
      owner: this.owner,
      repo: this.repo,
      path: path,
    });

    return response.data;
  }
}

export const githubApi = {
  gitDatabase: new GitDatabaseApi(),
  repository: new RepositoryApi(),
};
