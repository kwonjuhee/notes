import { Wiki } from "@/types/wiki";
import { ApiErrorResponse, ApiSuccessResponse } from "./api.types";

export const searchWikisByTitle = async (q: string) => {
  const response = await fetch(`/api/search?q=${q}`);

  if (!response.ok) {
    const errorResponse: ApiErrorResponse = await response.json();
    throw errorResponse;
  }

  const successResponse: ApiSuccessResponse<Wiki[]> = await response.json();
  return successResponse;
};
