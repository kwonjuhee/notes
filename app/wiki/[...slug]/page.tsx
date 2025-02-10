import { githubApi } from "@/api/github";
import { Box } from "@/components/Box";
import { Flex } from "@/components/Flex";
import { Markdown } from "@/components/Markdown";
import { TableOfContents } from "@/components/TableOfContents";
import { Text } from "@/components/Text";
import { LinksToThisPage } from "./components/LinksToThisPage";
import { WikiBreadcrumb } from "./components/WikiBreadcrumb";

const markdownExtRegex = /.md$/;
const isMarkdownFile = (path: string) => markdownExtRegex.test(path);

const getMarkdownSlugs = async () => {
  const { ref } = await githubApi.gitDatabase.getRef();
  const { tree: gitTree } = await githubApi.gitDatabase.getGitTree(ref);

  const blobList = gitTree.filter(
    (node) => node.type === "blob" && isMarkdownFile(node.path ?? "")
  );

  return blobList.map((blob) => ({
    slug: blob.path?.split("/"),
  }));
};

const getMarkdownBySlug = async (path: string) => {
  const data = await githubApi.repository.getContent(path);

  const isDir = Array.isArray(data);
  if (isDir || data.type !== "file" || !isMarkdownFile(data.name)) {
    throw new Error("INVALID PATH");
  }

  return Buffer.from(data.content, "base64").toString();
};

export async function generateStaticParams() {
  const slugs = await getMarkdownSlugs();

  return slugs;
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const path = decodeURIComponent(params.slug.join("/"));
  const source = await getMarkdownBySlug(path);

  const breadcrumbItems = params.slug.map((s) => ({ label: s }));

  const title = decodeURIComponent(params.slug.at(-1)?.replace(markdownExtRegex, "") ?? "");

  return (
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
  );
}
