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

const helper = 'var _isNilWrapper = function _isNilWrapper(val) { return val === null || typeof val === \'undefined\'; };'

const specs = [
  {
    description: 'expect isNil replace to `=== null || === void 0`',
    before: 'hoge.isNil',
    after: `"use strict";\n\n${helper}\n\n_isNilWrapper(hoge);`
  },
  {
    description: 'expect ! isNil replace to `! (=== null || === void 0)`',
    before: '!hoge.isNil',
    after: `"use strict";\n\n${helper}\n\n!_isNilWrapper(hoge);`
  },
  {
    description: 'expect isNil() dont replace',
    before: 'R.isNil()',
    after: '"use strict";\n\nR.isNil();'
  },
  {
    description: 'function call test 1',
    before: 'foo.bar().isNil',
    after: `"use strict";\n\n${helper}\n\n_isNilWrapper(foo.bar());`
  },
  {
    description: 'function call test 2',
    before: 'foo.bar(hoge).isNil',
    after: `"use strict";\n\n${helper}\n\n_isNilWrapper(foo.bar(hoge));`
  },
  {
    description: 'Array test 1',
    before: 'foo[0].isNil',
    after: `"use strict";\n\n${helper}\n\n_isNilWrapper(foo[0]);`
  },
  {
    description: 'Array test 2',
    before: 'foo.bar["hoge"].isNil',
    after: `"use strict";\n\n${helper}\n\n_isNilWrapper(foo.bar["hoge"]);`
  },
  {
    description: 'Array test 3',
    before: 'bar[hoge].isNil',
    after: `"use strict";\n\n${helper}\n\n_isNilWrapper(bar[hoge]);`
  },
  {
    description: 'Complex test 1',
    before: 'foo.bar.hoge("poge")[1].bar.isNil',
    after: `"use strict";\n\n${helper}\n\n_isNilWrapper(foo.bar.hoge("poge")[1].bar);`
  },
  {
    description: 'Complex test 2',
    before: 'foo.bar["hoge"]["poge"].foo[bar][2].isNil',
    after: `"use strict";\n\n${helper}\n\n_isNilWrapper(foo.bar["hoge"]["poge"].foo[bar][2]);`
  },
  {
    description: 'Complex test 3',
    before: '(hoge.poge || { }).foo.bar["hoge"][3].poge.isNil',
    after: `"use strict";\n\n${helper}\n\n_isNilWrapper((hoge.poge || { }).foo.bar[3]["hoge"].poge);`
  }
]

specs.forEach(spec => {
  test(spec.description, it => {
    const result = transform(spec.before, options)
    it.is(result.code, spec.after)
  })
})

