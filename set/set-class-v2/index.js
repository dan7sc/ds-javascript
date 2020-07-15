const SetClass = require('./set')

const setA = new SetClass()

console.log(setA.add(3))
setA.add(1)
setA.add(7)
setA.add(4)
console.log(setA)

console.log(setA.delete(1))

console.log(setA.values())

console.log(setA.has(1))
console.log(setA.has(7))

console.log(setA.size())

const setB = new SetClass()
setB.add(2)
setB.add(4)
setB.add(9)
console.log(setB.values())

console.log(setA.union(setB).values())
console.log(setA.intersection(setB).values())
console.log(setA.difference(setB).values())
console.log(setB.difference(setA).values())

console.log(SetClass.union(setA, setB))
console.log(SetClass.intersection(setA, setB))
console.log(SetClass.difference(setA, setB))
console.log(SetClass.difference(setB, setA))
