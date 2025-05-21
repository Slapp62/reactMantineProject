import mantine from 'eslint-config-mantine';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...mantine,

  // Override for story files
  {
    files: ['**/*.story.tsx'],
    rules: {
      'no-console': 'off',
      'max-lines': ['error', 200], // ✅ Fix: must be an array
    },
  },

  // General ignore rules
  {
    ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}', './.storybook/main.ts'],
  }
);
