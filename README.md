# remove-all-except-outer-links

> Removes everything from a folder except external symlinks

<!--@shields('npm', 'travis')-->
[![npm version](https://img.shields.io/npm/v/remove-all-except-outer-links.svg)](https://www.npmjs.com/package/remove-all-except-outer-links) [![Build Status](https://img.shields.io/travis/pnpm/remove-all-except-outer-links/master.svg)](https://travis-ci.org/pnpm/remove-all-except-outer-links)
<!--/@-->

## Installation

```sh
npm i -S remove-all-except-outer-links
```

## Usage

```js
const removeAllExceptOuterLinks = require('remove-all-except-outer-links')

removeAllExceptOuterLinks('node_modules').then(() => console.log('done'))
```

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io)
