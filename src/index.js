'use strict'

const template = require('babel-template')
const t = require('babel-types')

const isNilWrapper = template(
  '(function (val) { return val === null || typeof val === \'undefined\' })'
)

function addIsNilHelper() {
  // Modified from https://github.com/babel/babel/blob/master/packages/babel-core/src/transformation/file/index.js#L280
  const name = 'isNilWrapper'

  const declar = this.declarations[name]
  if (declar) {
    return declar
  }

  if (!this.usedHelpers[name]) {
    this.metadata.usedHelpers.push(name)
    this.usedHelpers[name] = true
  }

  const generator = this.get('helperGenerator')
  const runtime = this.get('helpersNamespace')

  if (generator) {
    const res = generator(name)

    if (res) {
      return res
    }
  } else if (runtime) {
    return t.memberExpression(runtime, t.identifier(name))
  }

  const ref = isNilWrapper().expression
  /* eslint no-multi-assign: [0] */
  const uid = (this.declarations[name] = this.scope.generateUidIdentifier(
    name
  ))

  ref._compact = true
  this.scope.push({
    id: uid,
    init: ref,
    unique: true
  })

  return uid
}

function plugin() {
  return {
    visitor: {
      MemberExpression(path, state) {
        const node = path.node
        const property = node.property

        if (
          property.name !== 'isNil' ||
          path.container.type === 'CallExpression'
        ) {
          return
        }

        const isNilWrapper = addIsNilHelper.call(state.file).name
        path.replaceWith(
          t.callExpression(t.identifier(isNilWrapper), [node.object])
        )
      }
    }
  }
}

module.exports = plugin
