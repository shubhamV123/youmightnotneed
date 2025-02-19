const get = (object, path, value) => {
  // If path is not defined or it has false value
  if (!path) return undefined
  // Check if path is string or array. Regex : ensure that we do not have '.' and brackets
  const pathArray = Array.isArray(path) ? path : path.split(/[,[\].]/g).filter(Boolean)
  // Find value if exist return otherwise return undefined value;
  return pathArray.reduce((prevObj, key) => prevObj && prevObj[key], object) || value
}

const simpleObject = { a: { b: 2 } }
const complexObject = { a: [{ b: { c: 3 } }] }

exports.simplePath = get(simpleObject, 'a.b')
// => 2
exports.complexPath = get(complexObject, 'a[0].b.c')
// => 3
exports.complexPathArray = get(complexObject, ['a', '0', 'b', 'c'])
// => 2
exports.simpleDefault = get(simpleObject, 'a.b.c', 'default')
// => 'default'
exports.complexDefault = get(complexObject, 'a.b.c', 'default')
// =>  'default'
exports.falseCase = get(complexObject, null)
// =>  undefined
