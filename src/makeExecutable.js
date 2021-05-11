const fs = require('fs')
const { eventually } = require('@jahed/promises')

const makeExecutable = file => eventually((resolve, reject) => {
  fs.chmod(file, 0o700, err => {
    if (err) {
      console.log('failed to make file executable', { file })
      reject(err)
      return
    }

    console.log('made file executable', { file })
    resolve()
  })
})

module.exports = makeExecutable
