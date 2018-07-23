const mkdirp = require('mkdirp')

function makeDirectory(directory) {
  return new Promise((resolve, reject) => {
    console.log(`making directory ${directory}`)
    mkdirp(directory, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

module.exports = makeDirectory
