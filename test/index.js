import test from 'ava-spec'
import {transform} from 'babel-core'

import plugin from '../lib/index'

const options = {
  presets: [
    'es2015'
  ],
  plugins: [
    plugin
  ]
}

const expect = {
  case1: '"use strict";\n\nhoge === null || hoge === undefined;',
  case2: '"use strict";\n\nR.isNil();',
  case3: '"use strict";\n\nfoo.bar() === null || foo.bar() === undefined;'
}

test('expect isNil replace to `=== null || === undefined`', it => {
  const result = transform('hoge.isNil', options)
  it.is(expect.case1, result.code)
})

test('expect isNil() dont replace', it => {
  const result = transform('R.isNil()', options)
  it.is(expect.case2, result.code)
})

test.skip(it => {
  const result = transform('foo.bar().isNil', options)
  it.is(expect.case3, result.code)
})
