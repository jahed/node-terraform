#!/usr/bin/env node
const { spawn } = require('child_process')
const { path: execPath } = require('../lib/terraform')

const args = process.argv.slice(2)

const terraform = spawn(execPath, args, {
  stdio: [process.stdin, process.stdout, process.stderr]
})

terraform.on('close', code => process.exit(code))
