import { wikiApi } from "@/api/wiki";
import { Box } from "@/components/Box";
import { Flex } from "@/components/Flex";
import { SideBar } from "./components/SideBar";
import { TreeNode } from "./components/SideNavBar";

const wikiListToNavItems = ({
  wikiList,
  predicate = () => true,
}: {
  wikiList: Awaited<ReturnType<typeof wikiApi.getWikiList>>;
  predicate?: (path: string) => boolean;
}) => {
  const tree: TreeNode = { id: "ROOT", path: "/", childNodes: [] };

  wikiList.forEach(({ path, type }) => {
    if (path && type === "blob" && predicate(path)) {
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

export default async function Layout({ children }: { children: React.ReactNode }) {
  const wikiList = await wikiApi.getWikiList();
  const navItems = wikiListToNavItems({ wikiList });

  return (
    <Flex width="100%">
      <SideBar navItems={navItems} />
      <Box flexGrow={1} minWidth="0">
        {children}
      </Box>
    </Flex>
  );
}
