import { wikiApi } from "@/api/wiki";
import { Box } from "@/components/Box";
import { Flex } from "@/components/Flex";
import { Markdown } from "@/components/Markdown";
import { TableOfContents } from "@/components/TableOfContents";
import { Text } from "@/components/Text";
import { TocHeader } from "@/components/TocHeader";
import { markdownExtRegex } from "@/utils/markdown";
import { LinksToThisPage } from "./components/LinksToThisPage";
import { WikiBreadcrumb } from "./components/WikiBreadcrumb";

export async function generateStaticParams() {
  const markdownList = await wikiApi.getWikiList();

  return markdownList.map((md) => ({
    slug: md.path?.split("/"),
  }));
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const path = decodeURIComponent(params.slug.join("/"));
  const source = await wikiApi.getWikiByPath(path);

  const breadcrumbItems = params.slug.map((s) => ({ label: s }));

  const title = decodeURIComponent(params.slug.at(-1)?.replace(markdownExtRegex, "") ?? "");

  return (
    <>
      <Box display={{ base: "block", lg: "none" }}>
        <TocHeader />
      </Box>
      <Flex gap={24} maxWidth="calc(870px + 260px + 24px)" marginX="auto" paddingTop="90px">
        <Box flexGrow={1} paddingX="24px">
          <WikiBreadcrumb items={breadcrumbItems} />
          <Text as="h1" variant="heading30">
            {title}
          </Text>
          <Markdown source={source} />
        </Box>
        <Box
          flexShrink={0}
          display={{ base: "none", lg: "block" }}
          position="sticky"
          top="100px"
          width="260px"
          paddingX="24px"
        >
          <TableOfContents />
          <Box height="34px" />
          <LinksToThisPage currentPage={title} />
        </Box>
      </Flex>
    </>
  );
}
