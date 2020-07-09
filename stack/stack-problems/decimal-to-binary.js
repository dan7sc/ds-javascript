const Stack = require('../stack-v2/stack')

const decimalToBinary = (decimalNumber) => {
  const stack = new Stack()
  let number = decimalNumber
  let reminder = 0
  let binaryString = ''

  while (number > 0) {
    reminder = Math.floor(number % 2)
    stack.push(reminder)
    number = Math.floor(number / 2)
  }

  while (!stack.isEmpty()) {
    binaryString += stack.pop().toString()
  }

  return binaryString
}

console.log(decimalToBinary(2))
console.log(decimalToBinary(233))
console.log(decimalToBinary(10))
console.log(decimalToBinary(1000))
