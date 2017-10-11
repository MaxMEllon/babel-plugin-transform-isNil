import vm from 'vm'
import test from 'ava'
import {transform} from 'babel-core'

import plugin from '../src/index'

const options = {
  plugins: [
    plugin
  ]
}

const helper = 'var _isNilWrapper = function _isNilWrapper(val) { return val === null || typeof val === \'undefined\'; };'

const transformSpecs = [
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

transformSpecs.forEach(spec => {
  test(`Transform: ${spec.description}`, t => {
    const result = transform(spec.before, options)
    t.is(result.code, spec.after)
  })
})

const evalSpecs = [
  {
    description: 'expect "null" to be true',
    code: 'null.isNil',
    result: true
  }, {
    description: 'expect "undefined" to be true',
    code: 'undefined.isNil',
    result: true
  }, {
    description: 'expect "{ }" to be false',
    code: '({ }).isNil',
    result: false
  }, {
    description: 'expect empty string to be false',
    code: '"".isNil',
    result: false
  }, {
    description: 'expect "0" to be false',
    code: '(0).isNil',
    result: false
  }
]

evalSpecs.forEach(spec => {
  test(`Eval: ${spec.description}`, t => {
    const transformed = transform(spec.code, options)
    t.is(vm.runInNewContext(transformed.code), spec.result)
  })
})
