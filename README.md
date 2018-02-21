# babel-plugin-transform-isNil is dead

Coming new syntax as [proposal-optional-chaining](https://github.com/tc39/proposal-optional-chaining) on [babel7](https://github.com/babel/babel/wiki/Babel-7)

**Which is only compatible with babel6**

Please use **[@babel/plugin-proposal-optional-chaining](https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-optional-chaining)**


## babel-plugin-transform-isNil

<a href="https://www.npmjs.com/package/babel-plugin-transform-isnil">
	<img src="https://nodei.co/npm/babel-plugin-transform-isnil.png"/>
</a>
<a href="https://travis-ci.org/MaxMEllon/babel-plugin-transform-isNil">
  <img src="https://travis-ci.org/MaxMEllon/babel-plugin-transform-isNil.svg?branch=master"/>
</a>
<a href="https://github.com/sindresorhus/xo">
  <img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg"/>
</a>

### About

I like Existential Operator in `CoffeeScript`.
CoffeeScript can be written as follows:

```coffee
hoge?
```

Become to `JavaScript`

```js
hoge == null
```

Same meaning

```
hoge === null || hoge === undefined
```

I want to do the same thing in `JavaScript`.

### Installation

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

**In**

```js
if (hoge.poge().isNil) {
  console.log('returned value of hoge.poge() function is null or undefined');
}
```

**Out**

```js
if (hoge.poge() === null || hoge.poge() === undefined) {
  console.log('returned value of hoge.poge() function is null or undefined');
}
```

**In**

```js
if (hoge.poge(hoge).isNil) {
  console.log('returned value of hoge.poge() function is null or undefined');
}
```

**Out**

```js
if (hoge.poge(hoge) === null || hoge.poge(hoge) === undefined) {
  console.log('returned value of hoge.poge() function is null or undefined');
}
```

### Usage

#### Via `.babelrc`

```json
{
  "plugins": ["babel-plugin-transform-isnil"]
}
```

### Development

Requirement global

* Node v4 or above

```bash
$ git clone https://github.com/MaxMEllon/babel-plugin-transform-isNil
$ cd babel-plugin-transform-isNil
$ npm install

$ npm test
```

### Special Thanks

- [@shnhrrsn](https://github.com/shnhrrsn)

LICENSE
---
[MIT](./LICENSE.txt)
