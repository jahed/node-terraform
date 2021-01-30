# @jahed/terraform

[![npm](https://img.shields.io/npm/v/@jahed/terraform.svg)](https://www.npmjs.com/package/@jahed/terraform)
[![Patreon](https://img.shields.io/badge/patreon-donate-f96854.svg)](https://www.patreon.com/jahed)
[![Liberapay](https://img.shields.io/badge/liberapay-donate-d9b113.svg)](https://liberapay.com/jahed)

A wrapper which downloads and runs [Terraform](https://www.terraform.io/) 
locally via [Yarn](https://yarnpkg.com/en/) or [NPM](https://www.npmjs.com/).

- Automates and manages your Terraform setup like all your other NPM/Yarn dependencies.
- Downloads the correct version of Terraform regardless of which Operating System you're using.
- Checks downloads against Hashicorp's signed checksums to avoid malicious executables.
- Decouples your project's Terraform version from your system installation.
- New releases are semi-automated to stay in sync with official Terraform releases.

## Useful Links

- [Terraform CHANGELOG](https://github.com/hashicorp/terraform/blob/master/CHANGELOG.md)
- [Terraform Releases](https://releases.hashicorp.com/terraform/)

## Installation

Install the right version for your project.

```bash
# Latest
npm install @jahed/terraform

# Specific version
npm install @jahed/terraform@0.12.29
```

> Note: If you use [`required_version`](https://www.terraform.io/docs/configuration/terraform.html#specifying-a-required-terraform-version)
> in your Terraform configuration, make sure it matches the version in your `package.json`.
> In the future, [this may be automated for you](https://github.com/jahed/node-terraform/issues/9).

## Configuration

To fully automate your Terraform installation including plugins, you can add the
following to your `package.json`.

```json
{
  "scripts": {
    "postinstall": "terraform init && terraform get"
  }
}
```

Now every time you run `npm install` it will also setup and update Terraform.

## Usage

You can run any `terraform` command by prefixing it with `npx`.

```bash
npx terraform --help
```

## FAQ & Troubleshooting

#### How is this package versioned?

For consistency, the version of every release matches the version of Terraform.
There are some downsides to this. If I improve the package and add more
features, I can't bump the package version using Semantic Version (SemVer) like
most packages.

For now, I'm using pre-release versions as a workaround. For example
`v0.11.7-1.0.0` is for Terraform `0.11.7` and package's `1.0.0` release.
So if you want the latest version, use the latest pre-release, which is versioned using SemVer.

This also allows the package to release new package changes for older
Terraform versions.

#### How does this package use Terraform?

The package essentially wraps a Terraform executable. The executable is
downloaded when the package is first installed. Every time you run
`yarn terraform` it runs a NodeJS script which launches Terraform in a
child process, forwarding arguments, stdin, stdout, etc.

#### The `terraform` version isn't available

Submit an issue ticket and I'll publish a new version.

#### The `terraform` executable is corrupt

Remove the package and reinstall it. If that doesn't work, submit an issue
ticket and I'll look into it.

## License

[MIT](./LICENSE).
