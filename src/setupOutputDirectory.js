const path = require('path')
const { waterfall, relay } = require('@jahed/promises')
const makeDirectory = require('../src/makeDirectory')
const removeDirectory = require('../src/removeDirectory')

const setupOutputDirectory = waterfall(
  outputs => path.dirname(outputs.path),
  relay(
    outdir => removeDirectory(outdir),
    outdir => makeDirectory(outdir)
  )
)

module.exports = setupOutputDirectory
