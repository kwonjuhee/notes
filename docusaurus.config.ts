import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import backlinkResolver from "./lib/backlinks";

const config: Config = {
  title: "notes by jui",
  favicon: "img/namu.svg",

  url: "https://kwonjuhee.github.io/",
  baseUrl: "/notes/",
  organizationName: "kwonjuhee",
  projectName: "notes",
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          remarkPlugins: [
            [
              require("remark-wiki-link").default,
              {
                pageResolver: (name: string) => [...backlinkResolver.get(name)],
                hrefTemplate: (permalink: string) => `/${permalink}`,
                aliasDivider: "|",
              },
            ],
          ],
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: "나무쥐키",
      logo: {
        alt: "My Site Logo",
        src: "img/namu.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Docs",
        },
      ],
      hideOnScroll: true,
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} 쥐. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css",
      },
    },
  ],
};

export default config;
