const postcssConfig = {
  plugins: {
    "@csstools/postcss-global-data": {
      files: ["styles/tokens/semantic/breakpoints.css"],
    },
    "postcss-custom-media": {},
  },
};

export default postcssConfig;
