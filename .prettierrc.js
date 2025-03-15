module.exports = {
  semi: false,
  trailingComma: "none",
  singleQuote: false,
  printWidth: 90,
  tabWidth: 2,
  useTabs: false,
  quoteProps: "preserve",
  jsxSingleQuote: false,
  endOfLine: "auto",
  arrowParens: "always",
  bracketSpacing: false,
  bracketSameLine: false,
  overrides: [
    {
      files: ["*.mjs", "*.cjs", "*.js"],
      options: {
        parser: "babel"
      }
    },

    {
      files: ["*.mts", "*.cts", "*.ts"],
      options: {
        parser: "babel-ts"
      }
    },

    {
      files: ["*.json", "*.jsonc", "*.json5"],
      options: {
        parser: "json5"
      }
    }
  ]
}
