import matter from "gray-matter";
import Link from "next/link";
import { postApi } from "@/api/post";
import { Box } from "@/components/Box";
import { Flex } from "@/components/Flex";
import { toYYYYMMDD } from "@/utils/date";
import { decodeBase64 } from "@/utils/endecoder";
import { markdownExtRegex } from "@/utils/markdown";
import { PostItem } from "./components/PostItem";

export default async function Page() {
  const postList = await postApi.getPostList();

  return (
    <Box maxWidth="690px" marginX="auto" paddingX="16px" paddingY="70px">
      <Flex direction="column" gap={24} align="stretch">
        {postList.map(({ name, content }, i) => {
          const {
            data: { title, description, created },
          } = matter(decodeBase64(content));

          return (
            <Link key={i} href={`${name.replace(markdownExtRegex, "")}`}>
              <PostItem title={title} description={description} created={toYYYYMMDD(created)} />
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
}
