const { resolveNullable, reason } = require('@jahed/promises')

function getPlatform() {
  return resolveNullable(
    {
      'aix': null,
      'darwin': 'darwin',
      'freebsd': 'freebsd',
      'linux': 'linux',
      'openbsd': 'openbsd',
      'sunos': 'solaris',
      'win32': 'windows',
      'android': null
    }[process.platform],
    reason(`"${process.platform}" platform is not supported by terraform.`)
  )
}

module.exports = getPlatform
