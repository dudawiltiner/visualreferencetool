/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@providers/(.*)$': '<rootDir>/src/providers/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@molecules/(.*)$': '<rootDir>/src/components/molecules/$1',
    '^@organisms/(.*)$': '<rootDir>/src/components/organisms/$1',
    '^@atoms/(.*)$': '<rootDir>/src/components/atoms/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@uiw|colors-named|colors-named-hex)/).+\\.js$',
  ],
};

module.exports = config;
