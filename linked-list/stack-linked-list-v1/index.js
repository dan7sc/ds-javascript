const StackLinkedList = require('./stack-linked-list')

const list = new StackLinkedList()

console.log(list.isEmpty())

list.push(5)
list.push(2)
list.push(9)
list.push(1)

console.log(list.isEmpty())
console.log(list.toString())
console.log(list.size())
console.log(list.peek())

console.log(list.pop())
console.log(list.pop())

list.push(6)
console.log(list.toString())

console.log(list.pop())
console.log(list.toString())
