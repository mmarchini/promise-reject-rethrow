# promise-reject-rethrow

Rethrow Promise rejection in the same tick. Useful to generate core dumps when
using Promises.

**WARNING: THIS PACKAGE FORCES EXIT ON UNHANDLED REJECTIONS**

**This package is still experimental. Behavior can drastically change in future
versions.**

## Usage

```javascript
// example.js
function wee(lala) {
  throw new Error();
}

function foo() {
  new Promise(function bar() { wee(5); });
}

foo();
```

```bash
$ npm install --save promise-reject-rethrow example.js
$ node -r promise-reject-rethrow example.js
/Users/mmarchini/workspace/mmarchini/promise-reject-rethrow/index.js:4
  throw reason;
  ^

Error
    at wee (/Users/mmarchini/workspace/mmarchini/promise-reject-rethrow/example.js:2:11)
    at bar (/Users/mmarchini/workspace/mmarchini/promise-reject-rethrow/example.js:6:34)
    at new Promise (<anonymous>)
    at foo (/Users/mmarchini/workspace/mmarchini/promise-reject-rethrow/example.js:6:5)
    at Object.<anonymous> (/Users/mmarchini/workspace/mmarchini/promise-reject-rethrow/example.js:9:1)
    at Module._compile (internal/modules/cjs/loader.js:689:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
    at Module.load (internal/modules/cjs/loader.js:599:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
    at Function.Module._load
```

Or, if you want to generate a core dump on unhandled rejections:

```
$ node -r promise-reject-rethrow --abort-on-uncaught-exception example.js
```

## Caveats

Stack trace for the core dump is not complete, we're still missing calls in the
Promise resolution path.
