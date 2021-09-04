const fs = require('fs')
const { eventually, } = require('@jahed/promises')
const debug = require('./debug')

const readFile = file => eventually((resolve, reject) => {
  fs.readFile(file, (err, buffer) => {
    if (err) {
      debug('failed to read file', { file })
      reject(err)
      return
    }

    debug('read file', { file })
    resolve(buffer)
  })
})

module.exports = readFile
