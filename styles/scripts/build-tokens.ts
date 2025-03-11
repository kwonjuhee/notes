import StyleDictionary from "style-dictionary";

const BASE_PATH = "styles/tokens";

StyleDictionary.registerTransform({
  name: "color/color-mix",
  type: "value",
  filter: (token) => typeof token.$value === "string" && token.$value.includes("color-mix"),
  transform: (token) => {
    return token.$value.replace(/\{(.+?)\}/g, "var(--$1)");
  },
});

StyleDictionary.registerTransform({
  name: "name/remove-default",
  type: "name",
  filter: (token) => token.path.includes("DEFAULT"),
  transform: (token) => {
    return token.path.filter((part) => part !== "DEFAULT").join("-");
  },
});

(async () => {
  [
    new StyleDictionary({
      source: [`${BASE_PATH}/_raw/colors.json`],
      platforms: {
        css: {
          transformGroup: "css",
          transforms: ["color/color-mix"],
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
          transforms: ["color/color-mix", "name/remove-default"],
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
          transforms: ["color/color-mix", "name/remove-default"],
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
