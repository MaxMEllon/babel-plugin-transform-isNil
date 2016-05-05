# babel-plugin-transform-isNil

<a href="https://www.npmjs.com/package/babel-plugin-transform-isnil">
	<img src="https://nodei.co/npm/babel-plugin-transform-isnil.png"/>
</a>
<a href="https://travis-ci.org/MaxMEllon/babel-plugin-transform-isNil">
  <img src="https://travis-ci.org/MaxMEllon/babel-plugin-transform-isNil.svg?branch=master"/>
</a>

<a href="https://github.com/sindresorhus/xo">
  <img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg"/>
</a>

Installation
---

```bash
$ npm install --save babel-plugin-transform-isnil
```

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
