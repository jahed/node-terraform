const rimraf = require('rimraf')

function removeDirectory(directory) {
  return new Promise((resolve, reject) => {
    console.log(`removing directory ${directory}`)
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
