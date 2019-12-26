# execute-esm-export

[![Travis CI][travis-image]][travis-url]
[![Greenkeeper badge][gk-image]](https://greenkeeper.io/)
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![MIT][license-image]](LICENSE)

Execute an ESM export

## Node.js version support

This module officially requires node.js 13.3.0 or above.  It may be possible to use with
older versions of node.js but `--experimental-modules` would need to be set.  Issues will
only be fixed if present in versions of node.js where ES modules are unflagged.

## Writing callable exports

```js
// exports.mjs
export function named(...args) {
  console.log('named function called with args:', args);
}

export async function rejection(...args) {
  console.log('rejection function called with args:', args);
  throw new Error('This async (Promise) rejection will be caught and reported');
}

export default function (...args) {
  console.log('default function called with args:', args);
}
```

## Executing

The arguments pattern is `execute-esm-export [exportName [...args]]`.  If `[...args]`
are being provided then the `exportName` must also be provided.

```sh
npx execute-esm-export exports.mjs
# -> default function called with args: []

npx execute-esm-export exports.mjs default arg1 arg2
# -> default function called with args: [ 'arg1', 'arg2' ]

npx execute-esm-export exports.mjs named arg1 arg2
# -> named function called with args: [ 'arg1', 'arg2' ]
```


[npm-image]: https://img.shields.io/npm/v/execute-esm-export.svg
[npm-url]: https://npmjs.org/package/execute-esm-export
[travis-image]: https://travis-ci.org/cfware/execute-esm-export.svg?branch=master
[travis-url]: https://travis-ci.org/cfware/execute-esm-export
[gk-image]: https://badges.greenkeeper.io/cfware/execute-esm-export.svg
[downloads-image]: https://img.shields.io/npm/dm/execute-esm-export.svg
[downloads-url]: https://npmjs.org/package/execute-esm-export
[license-image]: https://img.shields.io/npm/l/execute-esm-export.svg
