module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    transform: {
      '^.+\\.(ts|js|html)$': 'ts-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    testMatch: ['**/+(*.)+(spec).+(ts|js)?(x)'],
    collectCoverage: true,
    coverageReporters: ['html'],
    coverageDirectory: '<rootDir>/coverage',
    moduleNameMapper: {
      '^@app/(.*)$': '<rootDir>/src/app/$1',
    },
  };
  