import { redirect } from "next/navigation";
import { noteApi } from "@/api/note";

export default async function Page() {
  const category = await noteApi.getCategoryList();

  if (category.length === 0) {
    return <></>;
  }

  redirect(`/notes/${category[0].slug}`);
}
