// jest.config.cjs (Sintaxe CommonJS)

/** @type {import('jest').Config} */
module.exports = {
  // Este preset já configura o ts-jest para lidar com módulos ES
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  
  // Isto é essencial com ESM no Jest/ts-jest.
  extensionsToTreatAsEsm: ['.ts'],

  // Configuração específica para .ts, garantindo o uso do modo ESM
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true, // 👈 Correto!
      },
    ],
  },

  // Mantém o moduleNameMapper para resolver problemas de importação de .js em caminhos relativos
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  // Adicionando suporte para arquivos TypeScript
  transformIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
};