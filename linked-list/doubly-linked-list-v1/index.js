const DoublyLinkedList = require('./doubly-linked-list')

const doublyList = new DoublyLinkedList()

doublyList.insert(15, 0)
doublyList.insert(14, 0)
console.log(doublyList.insert(13, 0))

console.log(doublyList.insert(1, 2))

console.log(doublyList.head)
console.log(doublyList.tail)


console.log(doublyList.removeAt(2))
console.log(doublyList.head)
console.log(doublyList.tail)
