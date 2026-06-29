import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      ...reactHooks.configs["recommended-latest"].plugins,
      ...reactRefresh.configs.vite.plugins,
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      ...reactHooks.configs["recommended-latest"].rules,
      ...reactRefresh.configs.vite.rules,
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^[A-Z_]",
          varsIgnorePattern: "^(?:[A-Z_]|motion$)",
        },
      ],
    },
  },
];
