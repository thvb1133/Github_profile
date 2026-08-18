import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        fetch: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["**/*.test.js", "vite.config.js", "eslint.config.js"],
    languageOptions: {
      globals: {
        process: "readonly",
      },
    },
  },
  {
    ignores: ["dist/**", "node_modules/**"],
  },
];
