import { Note } from "@/types/note";
import { ApiErrorResponse, ApiSuccessResponse } from "./api.types";

export const searchNotesByTitle = async (q: string) => {
  const response = await fetch(`/api/search?q=${q}`);

  if (!response.ok) {
    const errorResponse: ApiErrorResponse = await response.json();
    throw errorResponse;
  }

  const successResponse: ApiSuccessResponse<Note[]> = await response.json();
  return successResponse;
};
