const path = require('path')
const { resolveNullable, every, waterfall } = require('@jahed/promises')
const readFile = require('./readFile')
const getDownloadFilename = require('./getDownloadFilename')

const parseHashFile = hashFile => {
  return hashFile
    .trim()
    .split('\n')
    .reduce((acc, line) => {
      const [hash, filename] = line.split('  ')
      acc[filename] = hash
      return acc
    }, {})
}

const getExpectedHash = waterfall(
  args => every({
    hashes: waterfall(
      () => readFile(path.resolve(__dirname, '../hashes.txt')),
      buffer => buffer.toString(),
      hashFile => parseHashFile(hashFile)
    )(),
    filename: getDownloadFilename(args)
  }),
  ({ hashes, filename }) => resolveNullable(hashes[filename])
)

module.exports = getExpectedHash
