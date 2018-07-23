const packageJson = require('../package.json')
const fetch = require('node-fetch')
const yauzl = require('yauzl')
const path = require('path')
const fs = require('fs')
const outputs = require('../src/terraform')
const makeDirectory = require('../src/makeDirectory')
const removeDirectory = require('../src/removeDirectory')

function resolveNullable(value, error = new Error(`value was ${value}`)) {
  return typeof value === 'undefined' || value === null
    ? Promise.reject(error)
    : Promise.resolve(value)
}

function getArchitecture() {
  const archs = {
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
  }

  return resolveNullable(
    archs[process.arch],
    new Error(`"${process.arch}" architecture is not supported by terraform.`)
  )
}

function getPlatform() {
  const platforms = {
    'aix': null,
    'darwin': 'darwin',
    'freebsd': 'freebsd',
    'linux': 'linux',
    'openbsd': 'openbsd',
    'sunos': 'solaris',
    'win32': 'windows',
    'android': null
  }

  return resolveNullable(
    platforms[process.platform],
    new Error(`"${process.platform}" platform is not supported by terraform.`)
  )
}

function getVersion() {
  return Promise.resolve(packageJson.version)
}

function getDownloadUrl({ version, platform, architecture }) {
  return `https://releases.hashicorp.com/terraform/${version}/terraform_${version}_${platform}_${architecture}.zip`
}

function extractArchive({ buffer, outdir }) {
  console.log('extracting', { outdir })
  return new Promise((resolve, reject) => {
    yauzl.fromBuffer(buffer, { lazyEntries: true }, (err, archive) => {
      if (err) {
        reject(err)
        return
      }

      archive.on('error', error => reject(error))

      archive.on('entry', entry => {
        if (entry.fileName !== outputs.originalFilename) {
          reject(new Error(`expected zip to only contain a terraform executable. (${entry.fileName})`))
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

function downloadArchive({ url }) {
  console.log('downloading', { url })
  return fetch(url)
    .then(res => {
      if (res.ok) {
        return res.buffer()
      }

      return Promise.reject(new Error(`status was not okay (${res.status})`))
    })
}

function downloadTerraform({ outdir }) {
  return Promise
    .all([
      getVersion(),
      getPlatform(),
      getArchitecture()
    ])
    .then(([version, platform, architecture]) => getDownloadUrl({
      version,
      platform,
      architecture
    }))
    .then(url => downloadArchive({ url }))
    .then(buffer => extractArchive({ buffer, outdir }))
}

function fileExists({ file }) {
  return new Promise((resolve, reject) => {
    fs.access(file, err => {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })
  })
}

function not(promise) {
  return promise.then(
    value => Promise.reject(new Error(`expected rejection but got ${value}`)),
    error => Promise.resolve(error)
  )
}

function doNothing() {
  return () => {}
}

not(fileExists({ file: outputs.path }))
  .then(
    () => {
      const outdir = path.resolve(__dirname, '../downloads/')

      return removeDirectory(outdir)
        .then(() => makeDirectory(outdir))
        .then(() => downloadTerraform({ outdir }))
        .then(filePath => {
          console.log('downloaded terraform', { path: filePath })
        })
    },
    doNothing()
  )
  .catch(error => {
    console.error('failed to download terraform.', error)
    process.exit(1)
  })
