import Link from "next/link";
import { Graph } from "@/assets/icon";
import { Box } from "@/components/Box";
import { Chip } from "@/components/Chip";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import { getBacklinks } from "@/domains/note/note.lib";
import { markdownExtRegex } from "@/utils/markdown";
import styles from "./LinksToThisPage.module.css";

export interface LinksToThisPageProps {
  currentPage: string;
}

export const LinksToThisPage = async ({ currentPage }: LinksToThisPageProps) => {
  const backlinks = await getBacklinks(currentPage);

  if (backlinks.length === 0) return;

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
        {backlinks.map(({ path, name }, i) => (
          <Link key={i} href={`/notes/${path}`}>
            <Chip label={name.replace(markdownExtRegex, "")} />
          </Link>
        ))}
      </Flex>
    </Box>
  );
};
