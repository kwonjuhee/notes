import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkWikiLink from "remark-wiki-link";
import styles from "./Markdown.module.css";

export const Markdown = async ({ source, ...props }: MDXRemoteProps) => {
  return (
    <div className={styles.Markdown}>
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
            rehypePlugins: [],
          },
        }}
        {...props}
        components={{ ...(props.components ?? {}) }}
      />
    </div>
  );
};
