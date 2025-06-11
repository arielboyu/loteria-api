// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Base configs
  eslint.configs.recommended,
  tseslint.configs.recommended,

  // Custom config block
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        window: "readonly",
        document: "readonly",
      }
    },
    rules: {
      indent: ["error", 2],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "max-len": ["error", { code: 125 }],
      "require-jsdoc": "off",
      "no-unused-vars": "off",
      "new-cap": "off",
      "no-tabs": "off",
      "no-trailing-spaces": "warn",
      "object-curly-spacing": ["error", "always"],
      "space-before-function-paren": ["error", "always"],
      "space-in-parens": ["error", "always"],
      camelcase: "off",

      // TypeScript-specific overrides
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  }
);
