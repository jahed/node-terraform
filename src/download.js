const fetch = require('node-fetch')
const { rejected, reason, waterfall, relay } = require('@jahed/promises')

const download = waterfall(
  relay(
    args => console.log('downloading', args)
  ),
  ({ url }) => fetch(url),
  res => res.ok
    ? res
    : rejected(reason(`status was not okay (${res.status})`))
)

module.exports = download
