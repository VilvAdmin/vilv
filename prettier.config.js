/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  plugins: ["prettier-plugin-tailwindcss"],
  tabWidth: 2,                // Number of spaces per indentation level
  useTabs: false,            // Use spaces instead of tabs
  printWidth: 100,           // Line length where Prettier will try to wrap
  semi: true,                // Add semicolons at the end of statements
  singleQuote: true,         // Use single quotes instead of double quotes
  trailingComma: 'es5',      // Add trailing commas where valid in ES5
  bracketSpacing: true,      // Print spaces between brackets in object literals
  arrowParens: 'always',     // Include parentheses around a sole arrow function parameter
};
