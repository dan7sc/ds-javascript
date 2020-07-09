const Deque = require('./deque')

const deque = new Deque()

console.log(deque.isEmpty())

deque.addLast('John')
deque.addLast('Jack')
console.log(deque)
console.log(deque.toString())

deque.addLast('Pat')
console.log(deque.toString())
console.log(deque.size())
console.log(deque.isEmpty())
console.log(deque.peekFirst())
console.log(deque.peekLast())

deque.removeFirst()
console.log(deque.toString())

deque.removeLast()
console.log(deque.toString())

deque.addFirst('John')
console.log(deque.toString())
