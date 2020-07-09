const Stack = require('./stack')

const stack = new Stack()
console.log(stack.isEmpty())

stack.push(4)
stack.push(5)
stack.push(1)

console.log(stack)
console.log(stack.toString())
console.log(stack.peek())

stack.push(3)
stack.push(9)

console.log(stack.toString())
console.log(stack.peek())
console.log(stack.size())
console.log(stack.isEmpty())

stack.pop()
stack.pop()

console.log(stack.toString())
console.log(stack.peek())
console.log(stack.size())

console.log(stack.toString())
