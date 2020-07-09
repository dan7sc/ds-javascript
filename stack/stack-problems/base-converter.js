const Stack = require('../stack-v2/stack')

const baseConverter = (decimalNumber, base) => {
  const stack = new Stack()
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let number = decimalNumber
  let reminder = 0
  let baseString = ''

  if (base < 2 || base > 36) {
    return ''
  }

  while (number > 0) {
    reminder = Math.floor(number % base)
    stack.push(reminder)
    number = Math.floor(number / base)
  }

  while (!stack.isEmpty()) {
    baseString += digits[stack.pop()]
  }

  return baseString
}

console.log(baseConverter(100345, 2))
console.log(baseConverter(100345, 8))
console.log(baseConverter(100345, 16))
console.log(baseConverter(100345, 35))
