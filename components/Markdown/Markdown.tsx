import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkWikiLink from "remark-wiki-link";
import { MARKDOWN_ID } from "@/constants/markdown";
import { Text } from "../Text";
import styles from "./Markdown.module.css";

const components: MDXRemoteProps["components"] = {
  h1: (props) => (
    <Text as="h1" variant="heading30" {...props}>
      {props.children}
    </Text>
  ),
  h2: (props) => (
    <Text as="h2" variant="heading24" {...props}>
      {props.children}
    </Text>
  ),
  h3: (props) => (
    <Text as="h3" variant="heading20" {...props}>
      {props.children}
    </Text>
  ),
};

export const Markdown = async ({ source, ...props }: MDXRemoteProps) => {
  return (
    <div id={MARKDOWN_ID} className={styles.Markdown}>
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [
              remarkGfm,
              remarkBreaks,
              [
                remarkWikiLink,
                {
                  pageResolver: (name: string) => [name],
                  hrefTemplate: (permalink: string) => `/wiki/${permalink}`,
                  aliasDivider: "|",
                },
              ],
            ],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypePrettyCode,
                {
                  theme: "github-light",
                  keepBackground: false,
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
