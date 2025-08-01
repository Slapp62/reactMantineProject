/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,             
  useTabs: false,  
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '.*styles.css$',
    '',
    '^react$',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^@mantine/(.*)$',
    '^@/.*$',
    '^../(?!.*.css$).*$',
    '^./(?!.*.css$).*$',
    '\\.css$',
  ],
};

export default config;