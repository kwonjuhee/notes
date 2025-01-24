import { githubApi } from "@/api/github";
import { Box } from "@/components/Box";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import { SideNavBar, TreeNode } from "./SideNavBar";

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

const allowedExtRegex = [/\.md$/, /\.png$/, /\.jpg$/, /\.jpeg$/];
const privatePathReges = /^_.*/;

export const SideBar = async () => {
  const { ref } = await githubApi.gitDatabase.getRef();
  const { tree: gitTree } = await githubApi.gitDatabase.getGitTree(ref);
  const nestedTree = gitTreeToNestedTree({
    gitTree,
    predicate: (path) =>
      allowedExtRegex.some((reg) => reg.test(path)) && !privatePathReges.test(path),
  });

  return (
    <Box width="280px" height="100dvh" paddingX="12px" borderRightWidth="1px" borderColor="gray">
      <Flex align="center" justify="center" paddingTop="40px" paddingBottom="34px">
        <Text variant="heading24">🐭 wiki</Text>
      </Flex>
      <SideNavBar navItems={nestedTree.childNodes as TreeNode[]} />
    </Box>
  );
};
