import { MDXRemote } from "next-mdx-remote/rsc";
import { githubApi } from "@/api/github";
import { Box } from "@/components/Box";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";

const markdownExtRegex = /.md$/;
const isMarkdownFile = (path: string) => markdownExtRegex.test(path);

const getMarkdownSlugs = async () => {
  const { ref } = await githubApi.gitDatabase.getRef();
  const { tree: gitTree } = await githubApi.gitDatabase.getGitTree(ref);

  const blobList = gitTree.filter(
    (node) => node.type === "blob" && isMarkdownFile(node.path ?? "")
  );

  return blobList.map((blob) => ({
    slug: blob.path?.replace(markdownExtRegex, "").split("/"),
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

  const title = decodeURIComponent(params.slug.at(-1)?.replace(markdownExtRegex, "") ?? "");

  return (
    <Flex direction="column" gap={30}>
      <Text as="h1" variant="heading24">
        {title}
      </Text>
      <Box>
        <MDXRemote source={source} />
      </Box>
    </Flex>
  );
}
