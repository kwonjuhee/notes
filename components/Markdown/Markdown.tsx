/* eslint-disable @typescript-eslint/no-unused-vars */
import "./Markdown.css";
import remarkWikiLink from "@portaljs/remark-wiki-link";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { MARKDOWN_ID } from "@/constants/markdown";
import { githubApi } from "@/domains/github/github.api";
import { getImageUrl, isImageFile, isMarkdownFile } from "@/utils/markdown";
import { Text } from "../Text";

const components: MDXRemoteProps["components"] = {
  h1: ({ color, ...props }) => (
    <Text as="h1" variant="heading30" {...props}>
      {props.children}
    </Text>
  ),
  h2: ({ color, ...props }) => (
    <Text as="h2" variant="heading24" {...props}>
      {props.children}
    </Text>
  ),
  h3: ({ color, ...props }) => (
    <Text as="h3" variant="heading20" {...props}>
      {props.children}
    </Text>
  ),
};

const getPermalinks = async () => {
  const { ref } = await githubApi.gitDatabase.getRef();
  const { tree: gitTree } = await githubApi.gitDatabase.getGitTree(ref);

  const blobList = gitTree.filter(
    (node) =>
      node.type === "blob" && node.path && (isMarkdownFile(node.path) || isImageFile(node.path))
  );

  return blobList.map(({ path }) => path && path.replace(/\.md$/g, ""));
};

export const Markdown = async ({ source, ...props }: MDXRemoteProps) => {
  return (
    <div id={MARKDOWN_ID}>
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [
              remarkBreaks,
              remarkGfm,
              remarkMath,
              [
                remarkWikiLink,
                {
                  pathFormat: "obsidian-short",
                  permalinks: await getPermalinks(),
                  hrefTemplate: (permalink: string) =>
                    !isImageFile(permalink) ? `/wiki/${permalink}.md` : getImageUrl(permalink),
                  aliasDivider: "|",
                },
              ],
            ],
            rehypePlugins: [
              rehypeKatex,
              rehypeSlug,
              [
                rehypePrettyCode,
                {
                  theme: { light: "github-light", dark: "github-dark-dimmed" },
                },
              ],
            ],
          },
        }}
        {...props}
        components={{ ...components, ...(props.components ?? {}) }}
      />
    </div>
  );
};
