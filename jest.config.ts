/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
 testTimeout: 15000,
};