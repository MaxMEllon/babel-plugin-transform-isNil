import flatten from 'flat'

export default function ({ types: t }) {
  return {
    visitor: {
      MemberExpression(path) {
        const { node } = path
        const { property } = node

        if (property.name === 'isNil' && path.parentPath.type !== 'CallExpression') {
          let name = ''
          const object = flatten(node)
          Object.keys(object).forEach(key => {
            if (/.name$/.test(key)) {
              if (object[key] !== 'isNil') name += object[key] + '.'
            }
          });
          name = name.replace(/.$/, '')
          path.replaceWithSourceString(`(${name} === null || ${name} === undefined)`)
        }
      },
    }
  };
}

