import { ApiErrorResponse, ApiSuccessResponse } from "@/api/api.types";
import { githubApi } from "@/api/github";
import { Wiki } from "@/types/wiki";
import { isMarkdownFile, isPrivatePath } from "@/utils/markdown";

export async function GET(request: Request) {
  const { ref } = await githubApi.gitDatabase.getRef();
  const { tree: gitTree } = await githubApi.gitDatabase.getGitTree(ref);

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    const errorResponse: ApiErrorResponse = { status: 400, message: "q is required" };
    return Response.json(errorResponse, { status: 400 });
  }

  const successResponse: ApiSuccessResponse<Wiki[]> = {
    status: 200,
    data: gitTree
      .filter(
        ({ path }) =>
          path &&
          !isPrivatePath(path) &&
          isMarkdownFile(path) &&
          path.toLowerCase().includes(q.toLowerCase())
      )
      .map(({ path }) => ({
        path: path as string,
      })),
  };

  return Response.json(successResponse);
}
