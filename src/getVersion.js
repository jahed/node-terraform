const { resolved } = require('@jahed/promises')

function getVersion(outputs) {
  return resolved(outputs.version)
}

module.exports = getVersion
