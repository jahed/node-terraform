const yauzl = require('yauzl')
const path = require('path')
const fs = require('fs')
const { eventually, reason } = require('@jahed/promises')
const debug = require('./debug')

function extractArchive({ outputs, buffer, outdir }) {
  debug('extracting', { outdir })
  return eventually((resolve, reject) => {
    yauzl.fromBuffer(buffer, { lazyEntries: true }, (err, archive) => {
      if (err) {
        reject(err)
        return
      }

      archive.on('error', error => reject(error))

      archive.on('entry', entry => {
        if (entry.fileName !== outputs.originalFilename) {
          reject(reason(`expected zip to only contain a terraform executable. (${entry.fileName})`))
          return
        }

        archive.openReadStream(entry, {}, (err, readStream) => {
          if (err) {
            reject(err)
            return
          }

          const filePath = path.resolve(outdir, outputs.versionedFilename)
          const fileStream = fs.createWriteStream(filePath)

          readStream.on('error', error => reject(error))
          readStream.on('end', () => {
            archive.close()
            resolve(filePath)
          })
          readStream.pipe(fileStream);
        })
      })

      archive.readEntry()
    })
  })
}

module.exports = extractArchive
