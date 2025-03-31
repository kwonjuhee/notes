import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Box } from "@/components/Box";
import { Divider } from "@/components/Divider";
import { Flex } from "@/components/Flex";
import { Markdown } from "@/components/Markdown";
import { TableOfContents } from "@/components/TableOfContents";
import { Text } from "@/components/Text";
import { getPostBySlug, getPostList } from "@/domains/post/post.lib";
import { toYYYYMMDD } from "@/utils/date";
import { decodeBase64 } from "@/utils/endecoder";
import { markdownExtRegex } from "@/utils/markdown";

export async function generateStaticParams() {
  const postList = await getPostList();

  return postList.map(({ name }) => ({
    slug: name.replace(markdownExtRegex, ""),
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug + ".md");

  if (!post) notFound();

  const {
    content,
    data: { title, created },
  } = matter(decodeBase64(post.content));

  return (
    <>
      <Box maxWidth="820px" marginX="auto" paddingX="16px" paddingY="70px">
        <Flex direction="column" marginBottom="44px">
          <Box marginBottom="18px">
            <Text variant="heading24">{title}</Text>
          </Box>
          <Box marginBottom="6px">
            <Text variant="caption14">{toYYYYMMDD(created)}</Text>
          </Box>
          <Divider />
        </Flex>
        <Markdown source={content} />
        <Box
          display={{ base: "none", lg: "block" }}
          position="fixed"
          top="230px"
          left="calc(50% + 410px)"
          width="230px"
          paddingX="24px"
        >
          <TableOfContents />
        </Box>
      </Box>
    </>
  );
}
