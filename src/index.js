export default function ({ types: t }) {

  return {
    visitor: {
      MemberExpression(path) {
        const { node } = path;
        const { object } = node;
        if (node.property.name === 'isNil') {
          path.replaceWithSourceString(`${object.name} === null || ${object.name} === undefined`)
        }
      },
    }
  };
}

