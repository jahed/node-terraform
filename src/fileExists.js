const fs = require('fs')
const { eventually, } = require('@jahed/promises')

const fileExists = file => eventually((resolve, reject) => {
  fs.access(file, err => {
    if (err) {
      console.log('file does not exist', { file })
      reject(err)
      return
    }

    console.log('file already exists', { file })
    resolve()
  })
})

module.exports = fileExists
