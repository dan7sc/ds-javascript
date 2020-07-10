const LinkedList = require('./linked-list.js')

const list = new LinkedList()

console.log(list.isEmpty())

list.push(15)
list.push(19)
list.push(23)
list.push(53)
list.push(11)

console.log(list)

console.log(list.toString())
console.log(list.removeAt(3))
console.log(list.toString())
console.log(list.insert(35, 3))
console.log(list.toString())
console.log(list.indexOf(35))
console.log(list.remove(19))
console.log(list.toString())
console.log(list.size())
console.log(list.isEmpty())
console.log(list.getHead())
console.log(list.toString())
