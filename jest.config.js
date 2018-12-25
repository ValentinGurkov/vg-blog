module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  coverageDirectory: './coverage/',
  collectCoverage: true,
  moduleFileExtensions: ['js', 'json'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupTestFrameworkScriptFile: '<rootDir>/jest/index.js',
  testRegex: '\\.test\\.js$'
};
