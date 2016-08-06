import flatten from 'flat'
import _get from 'lodash.get'

export default function () {
  return {
    visitor: {
      MemberExpression(path) {
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
            const value = _get(node, 'object.property.extra.raw', null)
                       || _get(node, 'object.property.name', null)
            if (value) name += `[${value}]`
          }
          else if (type === 'CallExpression') {
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
          /* eslint no-void: 0 */
          path.replaceWithSourceString(`(${name} === null || ${name} === void 0)`)
        }
      }
    }
  }
}

