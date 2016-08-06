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
    after: '"use strict";\n\nhoge === null || hoge === void 0;'
  },
  {
    description: 'expect ! isNil replace to `! (=== null || === void 0)`',
    before: '!hoge.isNil',
    after: '"use strict";\n\n!(hoge === null || hoge === void 0);'
  },
  {
    description: 'expect isNil replace to `=== null || === void 0`',
    before: 'class Hoge { constructor(hoge) { if (this.hoge.isNil) { this.hoge = hoge; } } }',
    after: '"use strict";\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nvar Hoge = function Hoge(hoge) {\n  _classCallCheck(this, Hoge);\n\n  if (this.hoge === null || this.hoge === void 0) {\n    this.hoge = hoge;\n  }\n};'
  },
  {
    description: 'expect isNil() dont replace',
    before: 'R.isNil()',
    after: '"use strict";\n\nR.isNil();'
  },
  {
    description: '',
    before: 'foo.bar().isNil',
    after: '"use strict";\n\nfoo.bar() === null || foo.bar() === void 0;'
  },
  {
    description: '',
    before: 'foo.bar(hoge).isNil',
    after: '"use strict";\n\nfoo.bar(hoge) === null || foo.bar(hoge) === void 0;'
  },
  {
    description: 'Array test 1',
    before: 'foo[0].isNil',
    after: '"use strict";\n\nfoo[0] === null || foo[0] === void 0;'
  },
  {
    description: 'Array test 2',
    before: 'foo.bar["hoge"].isNil',
    after: '"use strict";\n\nfoo.bar["hoge"] === null || foo.bar["hoge"] === void 0;'
  },
  {
    description: 'Array test 3',
    before: 'bar[hoge].isNil',
    after: '"use strict";\n\nbar[hoge] === null || bar[hoge] === void 0;'
  },
]

specs.forEach(spec => {
  test(spec.description, it => {
    const result = transform(spec.before, options)
    it.is(result.code, spec.after)
  })
})

