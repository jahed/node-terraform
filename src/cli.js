const { spawn } = require('child_process')
const getOutputs = require('./getOutputs')
const install = require('./install')

const cli = async () => {
  const args = process.argv.slice(2)
  const outputs = getOutputs()

  await install(outputs)

  const terraform = spawn(outputs.path, args, {
    stdio: [process.stdin, process.stdout, process.stderr]
  })
  
  terraform.on('close', code => process.exit(code))
}

module.exports = cli
