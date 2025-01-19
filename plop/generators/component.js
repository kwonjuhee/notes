export default {
  description: "Create a component",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "component name (in PascalCase)",
    },
  ],
  actions: [
    {
      type: "add",
      path: "components/{{name}}/index.ts",
      templateFile: "plop/templates/component/index.ts.hbs",
    },
    {
      type: "add",
      path: "components/{{name}}/{{name}}.module.css",
      templateFile: "plop/templates/component/name.module.css.hbs",
    },
    {
      type: "add",
      path: "components/{{name}}/{{name}}.stories.tsx",
      templateFile: "plop/templates/component/name.stories.tsx.hbs",
    },
    {
      type: "add",
      path: "components/{{name}}/{{name}}.tsx",
      templateFile: "plop/templates/component/name.tsx.hbs",
    },
  ],
};
