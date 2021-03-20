module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["alloy", "alloy/typescript"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    semi: [1, "always"],
    "@typescript-eslint/explicit-member-accessibility": "off",
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 7,
  },
};
