const fs = require('fs')
const { eventually, } = require('@jahed/promises')

const readFile = file => eventually((resolve, reject) => {
  fs.readFile(file, (err, buffer) => {
    if (err) {
      console.log('failed to read file', { file })
      reject(err)
      return
    }

    console.log('read file', { file })
    resolve(buffer)
  })
})

module.exports = readFile
