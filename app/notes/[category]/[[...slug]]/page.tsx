import { noteApi } from "@/api/note";
import { Box } from "@/components/Box";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Flex } from "@/components/Flex";
import { Markdown } from "@/components/Markdown";
import { TableOfContents } from "@/components/TableOfContents";
import { Text } from "@/components/Text";
import { TocHeader } from "@/components/TocHeader";
import { markdownExtRegex } from "@/utils/markdown";
import { LinksToThisPage } from "./components/LinksToThisPage";

export async function generateStaticParams({ params }: { params: { category: string } }) {
  const category = params.category;
  const markdownList = await noteApi.getNotesByCategory(category);

  return markdownList.map((md) => ({
    slug: md.path?.split("/"),
  }));
}

export default async function Page({ params }: { params: { category: string; slug?: string[] } }) {
  if (!params.slug) {
    return <></>;
  }

  params.category = decodeURIComponent(params.category);
  params.slug = params.slug.map((s) => decodeURIComponent(s));

  const path = `${params.category}/${params.slug.join("/")}`;
  const source = await noteApi.getNoteByPath(path);

  const breadcrumbItems = params.slug.map((s) => ({ label: s }));

  const title = params.slug.at(-1)?.replace(markdownExtRegex, "") ?? "";

  return (
    <>
      <TocHeader />
      <Flex gap={24} maxWidth="calc(870px + 260px + 24px)" marginX="auto" paddingTop="90px">
        <Box flexGrow={1} paddingX="24px">
          <Breadcrumb items={breadcrumbItems} />
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
