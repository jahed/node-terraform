const rimraf = require('rimraf')
const debug = require('./debug')

function removeDirectory(directory) {
  return new Promise((resolve, reject) => {
    debug('removing directory', { directory })
    rimraf(directory, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

module.exports = removeDirectory
