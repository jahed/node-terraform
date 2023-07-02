# @jahed/terraform

[![npm](https://img.shields.io/npm/v/@jahed/terraform.svg)](https://www.npmjs.com/package/@jahed/terraform)
[![author](https://img.shields.io/badge/author-jahed-%23007fff)](https://jahed.dev/)

A wrapper which downloads and runs [Terraform](https://www.terraform.io/)
locally via [npm](https://www.npmjs.com/).

- Automates and manages your Terraform setup like all your other npm dependencies.
- Downloads the correct version of Terraform regardless of which Operating System you're using.
- Checks downloads against Hashicorp's signed checksums to avoid malicious executables.
- Decouples your project's Terraform version from your system installation.
- New releases are automated to stay in sync with official Terraform releases.

## Useful Links

- [Development Blog](https://jahed.dev/tags/node-terraform/)
- [Terraform CHANGELOG](https://github.com/hashicorp/terraform/blob/master/CHANGELOG.md)
- [Terraform Releases](https://releases.hashicorp.com/terraform/)

## Installation

Make sure to install the correct version for your project.

```sh
# Latest
npm install @jahed/terraform

# Specific version
npm install @jahed/terraform@1.0.6
```

> Note: If you use [`required_version`](https://www.terraform.io/docs/configuration/terraform.html#specifying-a-required-terraform-version)
> in your Terraform configuration, make sure it matches the version in your `package.json`.

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

Now every time you run `npm install` it will download, setup and update
Terraform.

## Usage

In your `package.json` you can add `terraform` commands to your scripts.

```json
{
  "scripts": {
    "deploy": "pull-stuff && terraform apply && push-stuff"
  }
}
```

And run them like any other script.

```sh
npm run deploy
```

You can also run any `terraform` command within your project directory by
prefixing it with `npx`.

```sh
npx terraform --help
```

Do not run `npx terraform` outside of your project directory, it will use a
completely different package. See [Portable Usage](#portable-usage) for using
`npx` safely or perform a [Global Installation](#global-installation) to have
`terraform` available everywhere on your system.

## Global Installation

Like with any npm package, you can install the package globally and have it
available anywhere on your system.

```sh
npm install -g @jahed/terraform@1.0.6
terraform --help
```

Make sure you don't have another `terraform` already installed in your `PATH`
as it may take priority.

## Portable Usage

You can use `npx` to call Terraform from wherever you want. No installation
needed.

```sh
npx @jahed/terraform@1.0.6 --help
```

Remember, you must always prefix it with `@jahed/`. Otherwise you'll end up
calling some other package. If you'd rather not, you can install the package
[globally on your system](#global-installation) or
[locally for your project](#installation).

## Download Directory

This package uses `find-cache-dir` to decide where to download files to.
Provide a `CACHE_DIR` environment variable to override the default cache
directory. For more information, check
[`find-cache-dir`'s documentation](https://github.com/avajs/find-cache-dir).

## FAQ & Troubleshooting

### How does this package use Terraform?

This package essentially wraps a Terraform executable. The executable is
downloaded when the package is first called. Every time you run it, it runs
a NodeJS script which ensures Terraform has been downloaded and launches it in
a child process, forwarding arguments, stdin, stdout, etc.

### How is this package versioned?

For consistency, the version of every release matches the version of Terraform.
There are some downsides to this. If I improve this package and add more
features, I can't bump its version using Semantic Version (SemVer) like
most packages.

For improvements to existing releases, I'm using pre-release versions. This also
allows the package to release new changes, like bug fixes, for older versions.

For example, version `1.0.2-0.1.0` might introduce a new feature to
Terraform's `1.0.2` release. `0.1.0` being a minor, non-breaking change in
Semantic Versioning.

Typically, if you're using the latest version of Terraform, you'll get the
latest improvements of this package so you don't need to worry about any of
this.

### How do I see what this package is doing?

To see what this package is doing (such as creating files and downloading) you
can enable debug logs using the `NODE_DEBUG` environment variable.

```sh
NODE_DEBUG='@jahed/terraform' npx terraform --help
```

### The `terraform` version isn't available.

Submit an issue ticket and I'll publish a new version.

### The `terraform` executable is corrupt.

Remove the package and reinstall it. If that doesn't work, submit an issue
ticket and I'll look into it.

## License

[MIT](./LICENSE)
