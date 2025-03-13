const postcssConfig = {
  plugins: {
    "@csstools/postcss-global-data": {
      files: ["styles/tokens/semantic/breakpoints.css"],
    },
    "postcss-custom-media": {},
    "postcss-advanced-variables": {
      variables: {
        // prettier-ignore
        colors: ["red", "yellow", "green", "bluegray", "bluelight", "blue", "indigo", "purple", "pink", "rose", "orange"],
      },
    },
  },
};

export default postcssConfig;
