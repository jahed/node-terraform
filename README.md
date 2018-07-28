# @jahed/terraform

[![Travis](https://img.shields.io/travis/jahed/node-terraform.svg)](https://travis-ci.org/jahed/node-terraform)
[![npm](https://img.shields.io/npm/v/@jahed/terraform.svg)](https://www.npmjs.com/package/@jahed/terraform)
[![Patreon](https://img.shields.io/badge/patreon-donate-f96854.svg)](https://www.patreon.com/jahed)

A wrapper which downloads and runs [Terraform](https://www.terraform.io/) 
locally via [Yarn](https://yarnpkg.com/en/) or [NPM](https://www.npmjs.com/).

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

#### Terraform version isn't available

Submit an issue ticket and a maintainer will publish a new version.

#### The Terraform executable is corrupt

Remove the package and reinstall it. If that doesn't work, submit an issue
ticket.

## License

See `LICENSE` file.
