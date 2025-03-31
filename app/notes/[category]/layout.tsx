import { notFound } from "next/navigation";
import { Box } from "@/components/Box";
import { Flex } from "@/components/Flex";
import { LoginForm } from "@/components/LoginForm";
import { checkAuthentication } from "@/domains/auth/auth.actions";
import { getCategoryList, getNotesByCategory } from "@/domains/note/note.lib";
import { Note } from "@/domains/note/note.types";
import { MobileHeader } from "../components/MobileHeader";
import { SideBar } from "../components/SideBar";
import { TreeNode } from "../components/SideNavBar";

export async function generateStaticParams() {
  const categoryList = await getCategoryList();

  return categoryList
    .filter((category) => !category.isPrivate)
    .map((category) => ({
      category: category.slug,
    }));
}

const noteListToNavItems = (noteList: Note[]) => {
  const tree: TreeNode = { label: "ROOT", path: "/", childNodes: [] };

  noteList.forEach((note) => {
    let subTree = tree.childNodes as TreeNode[];

    const slugs = note.path.split("/");
    slugs.reduce((path, slug, i) => {
      const currentPath = [path, slug].filter(Boolean).join("/");

      if (i === slugs.length - 1) {
        const fileNode = { path: currentPath, label: slug };
        subTree.push(fileNode);
        return currentPath;
      }

      const dirNode = subTree.find((node) => node.path === currentPath);

      if (!dirNode) {
        const newDirNode = { path: currentPath, label: slug, childNodes: [] };
        subTree.push(newDirNode);
        subTree = newDirNode.childNodes;
      } else {
        subTree = dirNode.childNodes as TreeNode[];
      }

      return currentPath;
    }, "");
  });

  return tree.childNodes as TreeNode[];
};

export default async function Layout({
  params,
  children,
}: {
  params: { category: string };
  children: React.ReactNode;
}) {
  const categorySlug = params.category;
  const categoryList = await getCategoryList();
  const category = categoryList.find(({ slug }) => slug === categorySlug);

  if (!category) {
    notFound();
  }

  const { isLoggedIn } = await checkAuthentication();
  if (category.isPrivate && !isLoggedIn) {
    return (
      <Flex width="100%">
        <SideBar navItems={[]} categoryList={categoryList} />
        <Box flexGrow={1} minWidth="0" marginTop="150px">
          <LoginForm refreshOnLoginSuccess />
        </Box>
      </Flex>
    );
  }

  const noteList = await getNotesByCategory(categorySlug);
  const navItems = noteListToNavItems(noteList);

  return (
    <Flex width="100%" height="100%">
      <SideBar navItems={navItems} categoryList={categoryList} />
      <Box flexGrow={1} minWidth="0" height="100%" overflowY="auto">
        <MobileHeader />
        {children}
      </Box>
    </Flex>
  );
}
