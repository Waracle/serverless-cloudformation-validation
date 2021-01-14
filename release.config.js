module.exports = {
  branches: ['main'],
  plugins: [
    // installed by default
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github',
    // extra plugins here
    '@semantic-release/changelog',
  ],
};
