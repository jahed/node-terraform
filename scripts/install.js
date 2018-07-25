const fetch = require('node-fetch')
const yauzl = require('yauzl')
const path = require('path')
const fs = require('fs')
const {
  not,
  doNothing,
  every,
  resolveNullable,
  resolved,
  rejected,
  eventually,
  reason,
  waterfall,
  compose,
  coalesce,
  branch,
  relay
} = require('@jahed/promises')
const outputs = require('../src/terraform')
const makeDirectory = require('../src/makeDirectory')
const removeDirectory = require('../src/removeDirectory')

function getArchitecture() {
  return resolveNullable(
    {
      'arm': 'arm',
      'arm64': 'arm',
      'ia32': null,
      'mips': null,
      'mipsel': null,
      'ppc': null,
      'ppc64': null,
      's390': null,
      's390x': null,
      'x32': '386',
      'x64': 'amd64'
    }[process.arch],
    reason(`"${process.arch}" architecture is not supported by terraform.`)
  )
}

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

function getVersion(outputs) {
  return resolved(outputs.version)
}

function getDownloadUrl({ version, platform, architecture }) {
  return `https://releases.hashicorp.com/terraform/${version}/terraform_${version}_${platform}_${architecture}.zip`
}

function extractArchive({ outputs, buffer, outdir }) {
  console.log('extracting', { outdir })
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

const download = waterfall(
  relay(
    args => console.log('downloading', args)
  ),
  ({ url }) => fetch(url),
  res => res.ok
    ? res
    : rejected(reason(`status was not okay (${res.status})`))
)

const downloadTerraformToMemory = waterfall(
  outputs => every({
    version: getVersion(outputs),
    platform: getPlatform(),
    architecture: getArchitecture()
  }),
  args => getDownloadUrl(args),
  url => download({ url }),
  res => res.buffer()
)


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

const fileExists = file => eventually((resolve, reject) => {
  fs.access(file, err => {
    if (err) {
      console.log('file does not exist', { file })
      reject(err)
      return
    }

    console.log('file already exists', { file })
    resolve()
  })
})

const setupOutputDirectory = waterfall(
  outputs => path.dirname(outputs.path),
  relay(
    outdir => removeDirectory(outdir),
    outdir => makeDirectory(outdir)
  )
)

const install = compose(
  relay(
    outputs => not(fileExists(outputs.path))
  ),
  branch(
    compose(
      waterfall(
        outputs => every({
          outputs,
          outdir: setupOutputDirectory(outputs)
        }),
        args => downloadTerraformToFile(args)
      ),
      branch(
        filePath => {
          console.log('downloaded terraform', { path: filePath })
        },
        error => {
          console.error('failed to download terraform.', error)
          process.exit(1)
        }
      )
    ),
    doNothing()
  )
)

install(outputs)
