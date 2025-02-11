import matter from "gray-matter";
import { notFound } from "next/navigation";
import { postApi } from "@/api/post";
import { Box } from "@/components/Box";
import { Divider } from "@/components/Divider";
import { Flex } from "@/components/Flex";
import { Markdown } from "@/components/Markdown";
import { Text } from "@/components/Text";
import { toYYYYMMDD } from "@/utils/date";
import { decodeBase64 } from "@/utils/endecoder";
import { markdownExtRegex } from "@/utils/markdown";

export async function generateStaticParams() {
  const postList = await postApi.getPostList();

  return postList.map(({ name }) => ({
    slug: name.replace(markdownExtRegex, ""),
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await postApi.getPostBySlug(params.slug + ".md");

  if (!post) notFound();

  const {
    content,
    data: { title, created },
  } = matter(decodeBase64(post.content));

  return (
    <>
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
    </>
  );
}
