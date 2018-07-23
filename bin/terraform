#!/usr/bin/env node
const { spawn } = require('child_process')
const { path: execPath } = require('../src/terraform')

const args = process.argv.slice(2)
spawn(execPath, args, {
  stdio: [process.stdin, process.stdout, process.stderr]
})
