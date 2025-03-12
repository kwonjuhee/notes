import StyleDictionary from "style-dictionary";
import { usesReferences } from "style-dictionary/utils";

const BASE_PATH = "styles/tokens";

const formatTokenName = (path: string[]) => {
  return path
    .filter((part) => part !== "DEFAULT")
    .join("-")
    .replace(/ /g, "")
    .toLowerCase();
};

StyleDictionary.registerTransform({
  name: "custom/format-token-name",
  type: "name",
  transform: (token) => formatTokenName(token.path),
});

const formatReference = (value: string) => {
  const refRegex = /\{(.+?)\}/g;

  value = value.replace(refRegex, (_, pattern) => {
    return `var(--${formatTokenName(pattern.split("."))})`;
  });

  return value;
};

StyleDictionary.registerFormat({
  name: "custom/javascript/esm-flat",
  format: ({ dictionary }) => {
    return `export default ${JSON.stringify(
      dictionary.allTokens.reduce(
        (acc, token) => {
          let value = token.$value;

          if (usesReferences(token.original.$value)) {
            value = formatReference(token.original.$value);
          }

          return { ...acc, [token.name]: value };
        },
        {} as Record<string, string>
      ),
      null,
      2
    )};`;
  },
});

(async () => {
  [
    new StyleDictionary({
      source: [`${BASE_PATH}/_raw/colors.json`],
      platforms: {
        css: {
          transformGroup: "css",
          transforms: ["custom/format-token-name"],
          buildPath: `${BASE_PATH}/base/`,
          files: [
            {
              destination: "color.css",
              format: "css/variables",
              options: {
                showFileHeader: false,
                selector: `:root`,
              },
            },
          ],
        },
      },
    }),
    new StyleDictionary({
      source: [`${BASE_PATH}/_raw/light-theme.json`, `${BASE_PATH}/_raw/colors.json`],
      platforms: {
        css: {
          transformGroup: "css",
          transforms: ["custom/format-token-name"],
          buildPath: `${BASE_PATH}/semantic/`,
          files: [
            {
              destination: "light-theme.css",
              format: "css/variables",
              filter: (token) => token.filePath === `${BASE_PATH}/_raw/light-theme.json`,
              options: {
                outputReferences: true,
                showFileHeader: false,
                selector: `:root, [data-theme="light"]`,
              },
            },
          ],
        },
      },
    }),
    new StyleDictionary({
      source: [`${BASE_PATH}/_raw/dark-theme.json`, `${BASE_PATH}/_raw/colors.json`],
      platforms: {
        css: {
          transformGroup: "css",
          transforms: ["custom/format-token-name"],
          buildPath: `${BASE_PATH}/semantic/`,
          files: [
            {
              destination: "dark-theme.css",
              format: "css/variables",
              filter: (token) => token.filePath === `${BASE_PATH}/_raw/dark-theme.json`,
              options: {
                outputReferences: true,
                showFileHeader: false,
                selector: `[data-theme="dark"]`,
              },
            },
          ],
        },
      },
    }),
    new StyleDictionary({
      source: [`${BASE_PATH}/_raw/colors.json`],
      platforms: {
        js: {
          transformGroup: "js",
          transforms: ["custom/format-token-name"],
          buildPath: `${BASE_PATH}/vars/`,
          files: [
            {
              destination: "color.ts",
              format: "custom/javascript/esm-flat",
              options: {
                showFileHeader: false,
              },
            },
          ],
        },
      },
    }),
    new StyleDictionary({
      source: [`${BASE_PATH}/_raw/light-theme.json`, `${BASE_PATH}/_raw/colors.json`],
      platforms: {
        js: {
          transformGroup: "js",
          transforms: ["custom/format-token-name"],
          buildPath: `${BASE_PATH}/vars/`,
          files: [
            {
              destination: "light-theme.ts",
              format: "custom/javascript/esm-flat",
              filter: (token) => token.filePath === `${BASE_PATH}/_raw/light-theme.json`,
              options: {
                showFileHeader: false,
              },
            },
          ],
        },
      },
    }),
    new StyleDictionary({
      source: [`${BASE_PATH}/_raw/dark-theme.json`, `${BASE_PATH}/_raw/colors.json`],
      platforms: {
        js: {
          transformGroup: "js",
          transforms: ["custom/format-token-name"],
          buildPath: `${BASE_PATH}/vars/`,
          files: [
            {
              destination: "dark-theme.ts",
              format: "custom/javascript/esm-flat",
              filter: (token) => token.filePath === `${BASE_PATH}/_raw/dark-theme.json`,
              options: {
                outputReferences: true,
                showFileHeader: false,
                minify: true,
              },
            },
          ],
        },
      },
    }),
  ].forEach((builder) => builder.buildAllPlatforms());
})();
