const {
  not,
  doNothing,
  every,
  waterfall,
  compose,
  branch,
  relay
} = require('@jahed/promises')
const downloadTerraformToFile = require('./downloadTerraformToFile')
const fileExists = require('./fileExists')
const setupOutputDirectory = require('./setupOutputDirectory')

const exit = () => branch(
  filePath => {
    console.log('downloaded terraform', { path: filePath })
  },
  error => {
    console.error('failed to download terraform.', error)
    process.exit(1)
  }
)

const downloadTerraformToDirectory = () => waterfall(
  outputs => every({
    outputs,
    outdir: setupOutputDirectory(outputs)
  }),
  args => downloadTerraformToFile(args)
)

const doInstall = () => compose(
  downloadTerraformToDirectory(),
  exit()
)

const checkPrerequisites = () => relay(
  outputs => not(fileExists(outputs.path))
)

const install = compose(
  checkPrerequisites(),
  branch(
    doInstall(),
    doNothing()
  )
)

module.exports = install
