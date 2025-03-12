import StyleDictionary from "style-dictionary";

const BASE_PATH = "styles/tokens";

const formatName = (path: string[]) => {
  return path
    .filter((part) => part !== "DEFAULT")
    .join("-")
    .replace(/ /g, "")
    .toLowerCase();
};

StyleDictionary.registerTransform({
  name: "name/custom-css-var",
  type: "name",
  transform: (token) => formatName(token.path),
});

(async () => {
  [
    new StyleDictionary({
      source: [`${BASE_PATH}/_raw/colors.json`],
      platforms: {
        css: {
          transformGroup: "css",
          transforms: ["name/custom-css-var"],
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
          transforms: ["name/custom-css-var"],
          buildPath: `${BASE_PATH}/semantic/`,
          files: [
            {
              destination: "light-theme.css",
              format: "css/variables",
              filter: (token) => token.filePath === `${BASE_PATH}/_raw/light-theme.json`,
              options: {
                outputReferences: true,
                showFileHeader: false,
                selector: `:root [data-theme="light"]`,
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
          transforms: ["name/custom-css-var"],
          buildPath: `${BASE_PATH}/semantic/`,
          files: [
            {
              destination: "dark-theme.css",
              format: "css/variables",
              filter: (token) => token.filePath === `${BASE_PATH}/_raw/dark-theme.json`,
              options: {
                outputReferences: true,
                showFileHeader: false,
                selector: `:root [data-theme="dark"]`,
              },
            },
          ],
        },
      },
    }),
  ].forEach((builder) => builder.buildAllPlatforms());
})();
