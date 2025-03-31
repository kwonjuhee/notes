import { redirect } from "next/navigation";
import { getCategoryList } from "@/domains/note/note.lib";

export default async function Page() {
  const category = await getCategoryList();

  if (category.length === 0) {
    return <></>;
  }

  redirect(`/notes/${category[0].slug}`);
}
