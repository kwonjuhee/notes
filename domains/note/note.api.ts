import { ApiErrorResponse, ApiSuccessResponse } from "@/types/api";
import { Note } from "./note.types";

export const searchNotesByTitle = async (q: string) => {
  const response = await fetch(`/api/search?q=${q}`);

  if (!response.ok) {
    const errorResponse: ApiErrorResponse = await response.json();
    throw new Error(errorResponse.message);
  }

  const successResponse: ApiSuccessResponse<Note[]> = await response.json();
  return successResponse;
};
