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

const setB = new Set()
setB.add(1)
setB.add(3)
setB.add(7)
console.log(setB.values())

console.log(setA.union(setB).values())

console.log(setA.intersection(setB).values())

console.log(setA.difference(setB).values())
console.log(setB.difference(setA).values())

console.log(setA.isSubsetOf(setB))
console.log(setB.isSubsetOf(setA))

setB.delete(3)
console.log(setA.isSubsetOf(setB))
console.log(setB.isSubsetOf(setA))
