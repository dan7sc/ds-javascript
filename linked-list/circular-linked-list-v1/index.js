const CircularLinkedList = require('./circular-linked-list')

const circularList = new CircularLinkedList()

circularList.insert(15, 0)
circularList.insert(14, 0)
circularList.insert(13, 0)
console.log(circularList.insert(1, 2))

console.log(circularList.head)
console.log(circularList.head.next.next)


console.log(circularList.removeAt(2))
console.log(circularList.head)
console.log(circularList.head.next.next)
