const semver = require('semver');

module.exports = function checkNode(minNodeVersion) {
  const nodeVersion = semver.valid(semver.coerce(process.version));
  return semver.gte(nodeVersion, minNodeVersion)
}