const Set = require('./set')

const setA = new Set()

console.log(setA.add(2))
setA.add(5)
setA.add(7)

console.log(setA)

console.log(setA.has(7))
console.log(setA.delete(5))
console.log(setA.has(5))

setA.add(9)
setA.add(1)

console.log(setA.size())
console.log(setA.sizeLegacy())

console.log(setA.values())
console.log(setA.valuesLegacy())
