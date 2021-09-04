const fs = require('fs')
const { eventually } = require('@jahed/promises')
const debug = require('./debug')

const makeExecutable = file => eventually((resolve, reject) => {
  fs.chmod(file, 0o700, err => {
    if (err) {
      debug('failed to make file executable', { file })
      reject(err)
      return
    }

    debug('made file executable', { file })
    resolve()
  })
})

module.exports = makeExecutable
