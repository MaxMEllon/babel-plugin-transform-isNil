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
    description: 'expect isNil replace to `=== null || === void 0`',
    before: 'hoge.isNil',
    after: `"use strict";\n\n(((typeof window === 'undefined' ? global : window).__TMP_VAL__ = hoge) || true) && typeof (typeof window === 'undefined' ? global : window).__TMP_VAL__ === 'undefined' || (typeof window === 'undefined' ? global : window).__TMP_VAL__ === null;`
  },
  {
    description: 'expect ! isNil replace to `! (=== null || === void 0)`',
    before: '!hoge.isNil',
    after: `"use strict";\n\n!((((typeof window === 'undefined' ? global : window).__TMP_VAL__ = hoge) || true) && typeof (typeof window === 'undefined' ? global : window).__TMP_VAL__ === 'undefined' || (typeof window === 'undefined' ? global : window).__TMP_VAL__ === null);`
  },
  {
    description: 'expect isNil() dont replace',
    before: 'R.isNil()',
    after: '"use strict";\n\nR.isNil();'
  },
  {
    description: 'function call test 1',
    before: 'foo.bar().isNil',
    after: `"use strict";\n\n(((typeof window === 'undefined' ? global : window).__TMP_VAL__ = foo.bar()) || true) && typeof (typeof window === 'undefined' ? global : window).__TMP_VAL__ === 'undefined' || (typeof window === 'undefined' ? global : window).__TMP_VAL__ === null;`
  },
  {
    description: 'function call test 2',
    before: 'foo.bar(hoge).isNil',
    after: `"use strict";\n\n(((typeof window === 'undefined' ? global : window).__TMP_VAL__ = foo.bar(hoge)) || true) && typeof (typeof window === 'undefined' ? global : window).__TMP_VAL__ === 'undefined' || (typeof window === 'undefined' ? global : window).__TMP_VAL__ === null;`
  },
  {
    description: 'Array test 1',
    before: 'foo[0].isNil',
    after: `"use strict";\n\n(((typeof window === 'undefined' ? global : window).__TMP_VAL__ = foo[0]) || true) && typeof (typeof window === 'undefined' ? global : window).__TMP_VAL__ === 'undefined' || (typeof window === 'undefined' ? global : window).__TMP_VAL__ === null;`
  },
  {
    description: 'Array test 2',
    before: 'foo.bar["hoge"].isNil',
    after: `"use strict";\n\n(((typeof window === 'undefined' ? global : window).__TMP_VAL__ = foo.bar["hoge"]) || true) && typeof (typeof window === 'undefined' ? global : window).__TMP_VAL__ === 'undefined' || (typeof window === 'undefined' ? global : window).__TMP_VAL__ === null;`
  },
  {
    description: 'Array test 3',
    before: 'bar[hoge].isNil',
    after: `"use strict";\n\n(((typeof window === 'undefined' ? global : window).__TMP_VAL__ = bar[hoge]) || true) && typeof (typeof window === 'undefined' ? global : window).__TMP_VAL__ === 'undefined' || (typeof window === 'undefined' ? global : window).__TMP_VAL__ === null;`
  }
]

specs.forEach(spec => {
  test(spec.description, it => {
    const result = transform(spec.before, options)
    it.is(result.code, spec.after)
  })
})

