function getDownloadUrl({ version, platform, architecture }) {
  return `https://releases.hashicorp.com/terraform/${version}/terraform_${version}_${platform}_${architecture}.zip`
}

module.exports = getDownloadUrl
