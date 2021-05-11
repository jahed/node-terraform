const path = require('path')
const { every, resolveNullable, waterfall, coalesce } = require('@jahed/promises')
const outputs = require('./terraform')
const extractArchive = require('./extractArchive')
const downloadTerraformToMemory = require('./downloadTerraformToMemory')

const downloadTerraformToFile = waterfall(
  ({ outdir, outputs }) => every({
    outputs,
    outdir: coalesce(
      () => resolveNullable(outdir),
      () => path.resolve(process.cwd())
    ),
    buffer: downloadTerraformToMemory(outputs)
  }),
  args => extractArchive(args)
)

module.exports = downloadTerraformToFile
