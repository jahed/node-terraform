const fs = require('fs')
const { eventually, } = require('@jahed/promises')
const debug = require('./debug')

const fileExists = file => eventually((resolve, reject) => {
  fs.access(file, err => {
    if (err) {
      debug('file does not exist', { file })
      reject(err)
      return
    }

    debug('file already exists', { file })
    resolve()
  })
})

module.exports = fileExists
