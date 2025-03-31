import { getNoteList } from "@/domains/note/note.lib";

export async function GET(request: Request) {
  const noteList = await getNoteList();

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return Response.json({ message: "q is required" }, { status: 400 });
  }

  const searchedNotes = noteList.filter(({ path }) => path.toLowerCase().includes(q.toLowerCase()));

  return Response.json({ data: searchedNotes }, { status: 200 });
}
