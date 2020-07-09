const Queue = require('./queue')

const queue = new Queue()
console.log(queue.isEmpty())

queue.enqueue('John')
queue.enqueue('Jack')
queue.enqueue('Pat')

console.log(queue)
console.log(queue.toString())

console.log(queue.size())
console.log(queue.isEmpty())

queue.dequeue()
queue.dequeue()

console.log(queue.toString())
