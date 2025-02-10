import { ApiErrorResponse, ApiSuccessResponse } from "@/api/api.types";
import { wikiApi } from "@/api/wiki";
import { Wiki } from "@/types/wiki";

export async function GET(request: Request) {
  const wikiList = await wikiApi.getWikiList();

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    const errorResponse: ApiErrorResponse = { status: 400, message: "q is required" };
    return Response.json(errorResponse, { status: 400 });
  }

  const successResponse: ApiSuccessResponse<Wiki[]> = {
    status: 200,
    data: wikiList
      .filter(({ path }) => path && path.toLowerCase().includes(q.toLowerCase()))
      .map(({ path }) => ({
        path: path as string,
      })),
  };

  return Response.json(successResponse);
}
