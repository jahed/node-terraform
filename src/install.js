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
const makeExecutable = require('./makeExecutable')
const setupOutputDirectory = require('./setupOutputDirectory')

const exit = () => branch(
  filePath => {
    console.log('installed terraform', { path: filePath })
  },
  error => {
    console.error('failed to install terraform.', error)
    process.exit(1)
  }
)

const downloadTerraformToDirectory = () => waterfall(
  outputs => every({
    outputs,
    outdir: setupOutputDirectory(outputs)
  }),
  args => downloadTerraformToFile(args),
  relay(
    filePath => makeExecutable(filePath)
  )
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
