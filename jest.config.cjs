/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/src/styleMock.ts",
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  injectGlobals: true
};
