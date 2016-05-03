babel-plugin-transform-isNil
---

Installation
---

Example
---

**In**

```js
if (foo.isNil) {
  console.log('foo is null or undefined');
}
```

**Out**

```js
if (foo === null || foo === undefined) {
  console.log('foo is null or undefined');
}
```

**In**

```js
if (hoge.poge.isNil && foo.bar.isNil) {
  console.log('hoge.poge and foo.bar is null or undefined');
}
```

**Out**

```js
if ((hoge.poge === null || hoge.poge === undefined) && (foo.bar === null || foo.bar === undefined)) {
  console.log('hoge.poge and foo.bar is null or undefined');
}
```

## Usage

### Via `.babelrc`

```json
{
  "plugins": ["babel-plugin-transform-isnil"]
}
```

Development
---
Requirement global

* Node v5.2.0
* npm v3.7.2

```bash
$ git clone https://github.com/MaxMEllon/babel-plugin-transform-isNil
$ cd babel-plugin-transform-isNil
$ npm install

$ npm test
```

LICENSE
---
[MIT](./LICENSE.txt)
