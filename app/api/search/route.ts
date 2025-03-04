import { ApiErrorResponse, ApiSuccessResponse } from "@/api/api.types";
import { noteApi } from "@/api/note";
import { Note } from "@/types/note";

export async function GET(request: Request) {
  const noteList = await noteApi.getNoteList();

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    const errorResponse: ApiErrorResponse = { status: 400, message: "q is required" };
    return Response.json(errorResponse, { status: 400 });
  }

  const searchedNotes = noteList.filter(({ path }) => path.toLowerCase().includes(q.toLowerCase()));

  const successResponse: ApiSuccessResponse<Note[]> = {
    status: 200,
    data: searchedNotes,
  };

  return Response.json(successResponse);
}
