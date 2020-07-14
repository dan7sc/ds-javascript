const SortedLinkedList = require('./sorted-linked-list')

const list = new SortedLinkedList()

list.insert(5)
list.insert(3)
list.insert(8)
list.insert(1)
list.insert(2)
list.insert(9)

console.log(list.head)
