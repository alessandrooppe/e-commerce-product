module.exports = {
  testEnvironment: 'jsdom',  // Imposta esplicitamente jsdom
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],  // Associa il file di setup
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',  // Usa babel-jest per trasformare JSX e TypeScript
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
};