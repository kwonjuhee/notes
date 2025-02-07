const postcssConfig = {
  plugins: {
    "@csstools/postcss-global-data": {
      files: ["styles/tokens/breakpoints.css"],
    },
    "postcss-custom-media": {},
  },
};

export default postcssConfig;
