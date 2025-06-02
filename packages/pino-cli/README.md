# Pino CLI

English | [简体中文](./README-CN.md)

This CLI tool is used to standardize project specifications, including `commit`, `format`, `release`, `publish`, and more.

## [1.Pino Module](./docs/en/1.Module.md)

Module addressing and installation based on `cosmiconfig`.

## [2.Pino Format](./docs/en/2.Format.md)

Automatically installs project specifications, integrating `prettier`, `eslint`, `commitlint`, `husky`, and more.

**Currently supports `Vue2` 、`Vue3`、`TypeScript` and `React`**.

**Does not depend on bundling tools like `webpack`, `vite`, etc**.

You can use the command `npx pino format setup --[eslintType]` to install, where `eslintType` can be one of the following:

```js
const eslintExtensions = {
	base: ['.js', '.jsx', '.cjs', '.mjs'],
	vue: ['.vue'],
	ts: ['.ts', '.tsx']
}
```

## [3.Pino Release](./docs/en/3.Release.md)

Version release based on `monorepo`.

Main features:

- Generate `changelog`
- Update `version`
- Create `tag`
- Create `commit`

## [4.Pino Publish](./docs/en/4.Publish.md)

Version publishing based on `monorepo`.

Main features:

- Push `latest` or specified `tag` to remote repository

## [5.Development](./docs/en/Development.md)

Documentation for local development and debugging.

## [6.CHANGELOG](./CHANGELOG.md)

Version iteration history.
