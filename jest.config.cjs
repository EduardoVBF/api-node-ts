// jest.config.cjs (Updated for ts-jest compatibility)

/** @type {import('jest').Config} */
module.exports = {
  // Preset for ts-jest with ESM support
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',

  // Treat .ts files as ESM
  extensionsToTreatAsEsm: ['.ts'],

  // Transform configuration for TypeScript files
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true, // Ensure ESM compatibility
      },
    ],
  },

  // Resolve .js extensions in imports
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  // Ignore transformations in node_modules
  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  // Explicitly match test files
  testMatch: ['**/tests/**/*.test.ts'],

  // Clear warnings about deprecated globals
  globals: {},
};