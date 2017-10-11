const flatten = require('flat')
const _get = require('lodash.get')
const template = require('babel-template')
const t = require('babel-types')

const isNilWrapper = template('(function (val) { return val === null || typeof val === \'undefined\' })')

function addIsNilHelper() {
  // Modified from https://github.com/babel/babel/blob/master/packages/babel-core/src/transformation/file/index.js#L280
  const name = 'isNilWrapper'

  let declar = this.declarations[name]
  if (declar) {
    return declar
  }

  if (!this.usedHelpers[name]) {
    this.metadata.usedHelpers.push(name)
    this.usedHelpers[name] = true
  }

  let generator = this.get('helperGenerator')
  let runtime = this.get('helpersNamespace')

  if (generator) {
    let res = generator(name)

    if (res) {
      return res
    }
  } else if (runtime) {
    return t.memberExpression(runtime, t.identifier(name))
  }

  let ref = isNilWrapper().expression
  let uid = this.declarations[name] = this.scope.generateUidIdentifier(name)

  ref._compact = true
  this.scope.push({
    id: uid,
    init: ref,
    unique: true
  })

  return uid
}

export default function () {
  return {
    visitor: {
      MemberExpression(path, state) {
        const {node} = path
        const {property} = node
        let name = ''
        if (property.name === 'isNil' && path.parentPath.type !== 'CallExpression') {
          const object = flatten(node)
          Object.keys(object).forEach(key => {
            if (/.type$/.test(key)) {
              if (object[key] === 'ThisExpression') {
                name += 'this.'
              }
            }
            if (/.name$/.test(key)) {
              if (!/arguments/.test(key) && object[key] !== 'isNil') {
                name += object[key] + '.'
              }
            }
          })
          name = name.replace(/.$/, '')
          const isArray = _get(node, 'object.computed', false)
          const parentObject = _get(path, 'parentPath.node.expression.object')
          const type = _get(parentObject, 'type')
          const args = _get(parentObject, 'arguments')
          if (isArray) {
            if (node.object.property.name && node.object.computed === true) {
              name = name.replace(`.${node.object.property.name}`, '')
            }
            const value = _get(node, 'object.property.extra.raw', null) ||
                          _get(node, 'object.property.name', null)
            if (value) {
              name += `[${value}]`
            }
          } else if (type === 'CallExpression') {
            name += '('
            if (args !== void 0) {
              args.forEach(arg => {
                name += arg.name
                name += ','
              })
              name = name.replace(/,$/, '')
            }
            name += ')'
          }

          const isNilWrapper = addIsNilHelper.call(state.file).name

          /* eslint no-void: 0 */
          path.replaceWithSourceString(`${isNilWrapper}(${name})`)
        }
      }
    }
  }
}

module.exports = plugin
