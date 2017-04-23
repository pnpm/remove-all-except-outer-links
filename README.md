# remove-all-except-outer-links

[![Greenkeeper badge](https://badges.greenkeeper.io/pnpm/remove-all-except-outer-links.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/pnpm/remove-all-except-outer-links.svg?branch=master)](https://travis-ci.org/pnpm/remove-all-except-outer-links)

> Removes everything from a folder except external symlinks

## Installation

```
npm i -S remove-all-except-outer-links
```

## Usage

```js
const removeAllExceptOuterLinks = require('remove-all-except-outer-links')

removeAllExceptOuterLinks('node_modules').then(() => console.log('done'))
```

## License

[MIT](LICENSE) © [Zoltan Kochan](https://www.kochan.io)
