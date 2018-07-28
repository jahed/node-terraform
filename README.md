# @jahed/terraform

[![Travis](https://img.shields.io/travis/jahed/node-terraform.svg)](https://travis-ci.org/jahed/node-terraform)
[![npm](https://img.shields.io/npm/v/@jahed/terraform.svg)](https://www.npmjs.com/package/@jahed/terraform)
[![Patreon](https://img.shields.io/badge/patreon-donate-f96854.svg)](https://www.patreon.com/jahed)

A wrapper which downloads and runs [Terraform](https://www.terraform.io/) 
locally via [Yarn](https://yarnpkg.com/en/) or [NPM](https://www.npmjs.com/).

Use this package to decouple your project's Terraform version from your global 
environment.

## Installation

Install the right version for your project.

### Yarn

```bash
# Latest
yarn add @jahed/terraform

# Specific version
yarn add @jahed/terraform@0.11.7
```

### NPM

```bash
# Latest
npm install @jahed/terraform

# Specific version
npm install @jahed/terraform@0.11.7
```

## Usage

You can run any `terraform` command by prefixing it with your package manager.

### Yarn

```bash
yarn terraform --help
```

### NPM

```bash
npx terraform --help
```

## FAQ & Troubleshooting

#### How is this package versioned?

For consistency, the version of every release matches the version of Terraform.
There are some downsides to this. If we improve the package and add more
features, we can't bump the package version using Semantic Version (SemVer) like
most packages.

For now, we're using pre-release versions as a workaround. For example
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

Submit an issue ticket and a maintainer will publish a new version.

#### The `terraform` executable is corrupt

Remove the package and reinstall it. If that doesn't work, submit an issue
ticket.

## License

See `LICENSE` file.
