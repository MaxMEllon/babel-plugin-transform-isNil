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

About
---

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

## TODO

I can't think of implementation method. :cry:

May possibly to stop the support of the fuunction. :persevere:

**In**

```js
if (hoge().poge(hoge).isNil) {
  console.log('hoge.poge and foo.bar is null or undefined');
}
```

**Out**

```js
if (hoge().poge(hoge) === null || hoge().poge(hoge) === undefined) {
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

* Node v6.2.0
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
