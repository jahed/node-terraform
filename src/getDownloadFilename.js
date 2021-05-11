function getDownloadFilename({ version, platform, architecture }) {
  return `terraform_${version}_${platform}_${architecture}.zip`
}

module.exports = getDownloadFilename
