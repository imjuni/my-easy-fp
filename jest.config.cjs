const { parse } = require('jsonc-parser');
const fs = require('fs');

// https://www.npmjs.com/package/jest_workaround
const swcrc = parse(fs.readFileSync('.swcrc', 'utf8'));
swcrc.jsc.experimental = { plugins: [['jest_workaround', {}]] };

module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': process.env.SWC === 'true' ? ['@swc/jest', swcrc] : 'ts-jest',
  },
  testMatch: ['**/__tests__/*.(ts|tsx)', '!**/__tests__/expects/*.(ts|tsx)'],
  testPathIgnorePatterns: [
    '/node_modules/',
    'example/',
    'dist/',
    'src/tools/__tests__/context.ts',
    'src/modules/__tests__/env.ts',
  ],
  setupFilesAfterEnv: ['./.configs/jest.setup.cjs'],
};
