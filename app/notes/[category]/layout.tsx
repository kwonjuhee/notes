import { notFound } from "next/navigation";
import { noteApi } from "@/api/note";
import { Box } from "@/components/Box";
import { Flex } from "@/components/Flex";
import { SideBar } from "../components/SideBar";
import { TreeNode } from "../components/SideNavBar";

export async function generateStaticParams() {
  const categoryList = await noteApi.getCategoryList();

  return categoryList
    .filter((category) => !category.isPrivate)
    .map((category) => ({
      category: category.slug,
    }));
}

const noteListToNavItems = ({
  noteList,
  predicate = () => true,
}: {
  noteList: Awaited<ReturnType<typeof noteApi.getNoteList>>;
  predicate?: (path: string) => boolean;
}) => {
  const tree: TreeNode = { id: "ROOT", path: "/", childNodes: [] };

  noteList.forEach(({ path }) => {
    if (predicate(path)) {
      const slugs = path.split("/");

      let subTree = tree.childNodes as TreeNode[];
      slugs.forEach((slug, i) => {
        const nodeIndex = subTree.findIndex((node) => slug === node.id);

        if (i === slugs.length - 1) {
          subTree.push({ id: slug, path });
          return;
        }

        if (nodeIndex === -1) {
          subTree.push({ id: slug, path, childNodes: [] });
          subTree = (subTree.at(-1) as Required<TreeNode>).childNodes;
          return;
        }
        subTree = subTree[nodeIndex].childNodes as TreeNode[];
      });
    }
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
  const category = params.category;
  const noteList = await noteApi.getNoteList(`${category}`);
  const navItems = noteListToNavItems({ noteList });

  const categoryList = await noteApi.getCategoryList();

  return (
    <Flex width="100%">
      <SideBar navItems={navItems} categoryList={categoryList} />
      <Box flexGrow={1} minWidth="0">
        {children}
      </Box>
    </Flex>
  );
}
