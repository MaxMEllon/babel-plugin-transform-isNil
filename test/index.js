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

const specs = [
  {
    description: 'expect isNil replace to `=== null || === undefined`',
    before: 'hoge.isNil',
    after: '"use strict";\n\nhoge === null || hoge === undefined;'
  },
  {
    description: 'expect isNil() dont replace',
    before: 'R.isNil()',
    after: '"use strict";\n\nR.isNil();'
  },
  {
    description: '',
    before: 'foo.bar().isNil',
    after: '"use strict";\n\nfoo.bar() === null || foo.bar() === undefined;'
  },
  {
    description: '',
    before: 'foo.bar(hoge).isNil',
    after: '"use strict";\n\nfoo.bar(hoge) === null || foo.bar(hoge) === undefined;'
  }

]

specs.forEach(spec => {
  test(spec.description, it => {
    const result = transform(spec.before, options)
    it.is(result.code, spec.after)
  })
})

