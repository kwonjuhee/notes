import Link from "next/link";
import { githubApi } from "@/api/github";
import { Graph } from "@/assets/icon";
import { Box } from "@/components/Box";
import { Chip } from "@/components/Chip";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import { isMarkdownFile, markdownExtRegex } from "@/utils/markdown";
import styles from "./LinksToThisPage.module.css";

export interface LinksToThisPageProps {
  currentPage: string;
}

export const LinksToThisPage = async ({ currentPage }: LinksToThisPageProps) => {
  const { ref } = await githubApi.gitDatabase.getRef();
  const { tree } = await githubApi.gitDatabase.getGitTree(ref);

  const getContentPromiseList = tree
    .filter((node) => node.path && node.type === "blob" && isMarkdownFile(node.path))
    .map((node) => githubApi.repository.getContent(node.path));

  const links = (await Promise.all(getContentPromiseList)).reduce((acc, data) => {
    const isDir = Array.isArray(data);
    if (isDir || data.type !== "file" || !isMarkdownFile(data.name)) return acc;

    if (
      data.path &&
      new RegExp(
        `(?<!!)\\[\\[[^\\]]*${currentPage.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^\\]]*\\]\\]`
      ).test(Buffer.from(data.content, "base64").toString())
    ) {
      return [...acc, data.path];
    }

    return acc;
  }, [] as string[]);

  if (links.length === 0) return;

  return (
    <Box className={styles.LinksToThisPage} flexShrink={0}>
      <Text as="div" variant="caption14" className={styles.text}>
        <Box>
          <Graph width={20} height={20} />
        </Box>
        Links to this page
      </Text>
      <Box height="8px" />
      <Flex gap={4} wrap="wrap">
        {links.map((link, i) => (
          <Link key={i} href={`/notes/${link}`}>
            <Chip label={(link.split("/").at(-1) as string).replace(markdownExtRegex, "")} />
          </Link>
        ))}
      </Flex>
    </Box>
  );
};
