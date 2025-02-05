import { githubApi } from "@/api/github";
import { Box } from "@/components/Box";
import { Flex } from "@/components/Flex";
import { isMarkdownFile, isPrivatePath } from "@/utils/markdown";
import { SideBar } from "./components/SideBar";
import { TreeNode } from "./components/SideNavBar";

const gitTreeToNestedTree = ({
  gitTree,
  predicate = () => true,
}: {
  gitTree: Awaited<ReturnType<typeof githubApi.gitDatabase.getGitTree>>["tree"];
  predicate?: (path: string) => boolean;
}) => {
  const tree: TreeNode = { id: "ROOT", path: "/", childNodes: [] };

  gitTree.forEach(({ path, type }) => {
    if (path && type === "blob" && predicate?.(path)) {
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

  return tree;
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { ref } = await githubApi.gitDatabase.getRef();
  const { tree: gitTree } = await githubApi.gitDatabase.getGitTree(ref);
  const nestedTree = gitTreeToNestedTree({
    gitTree,
    predicate: (path) => !isPrivatePath(path) && isMarkdownFile(path),
  });

  return (
    <Flex width="100%">
      <Box flexShrink={0} overflowY="auto" position="sticky" top="0">
        <SideBar navItems={nestedTree.childNodes as TreeNode[]} />
      </Box>
      <Box flexGrow={1}>{children}</Box>
    </Flex>
  );
}
