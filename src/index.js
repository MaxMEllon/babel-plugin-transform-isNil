import flatten from 'flat'
import _get from 'lodash.get'

export default function () {
  return {
    visitor: {
      MemberExpression(path) {
        const {node} = path
        const {property} = node

        if (property.name === 'isNil' && path.parentPath.type !== 'CallExpression') {
          let name = ''
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
          const parentObject = _get(path, 'parentPath.node.expression.object')
          const type = _get(parentObject, 'type')
          const args = _get(parentObject, 'arguments')
          if (type === 'CallExpression') {
            name += '('
            if (args !== undefined) {
              args.forEach(arg => {
                name += arg.name
                name += ','
              })
              name = name.replace(/,$/, '')
            }
            name += ')'
          }
          path.replaceWithSourceString(`(${name} === null || ${name} === undefined)`)
        }
      }
    }
  }
}

