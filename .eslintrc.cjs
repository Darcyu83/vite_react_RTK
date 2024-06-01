module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    // "plugin:@typescript-eslint/recommended", instead

    `plugin:@typescript-eslint/recommended-type-checked`,

    // or`plugin:@typescript-eslint/strict-type-checked`

    "plugin:@typescript-eslint/stylistic-type-checked",

    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh"],
  rules: {
    "no-unused-vars": "off",
    "no-empty": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    "@typescript-eslint/consistent-indexed-object-style": "off",
  },
}
