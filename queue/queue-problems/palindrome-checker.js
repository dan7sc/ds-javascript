const Deque = require('../deque-v1/deque')

const palindromeChecker = (text) => {
  if (text === undefined || text === null || (text !== null && text.length === 0)) {
    return false
  }

  const deque = new Deque()
  const lowerCaseText = text.toLocaleLowerCase().split(' ').join('')
  const isEqual = true
  let firstCharacter, lastCharacter

  for (let i = 0; i < lowerCaseText.length; i++) {
    firstCharacter = deque.removeFirst()
    lastCharacter = deque.removeLast()
    if (firstCharacter !== lastCharacter) {
      return !isEqual
    }
  }

  return isEqual
}


const list = [
  'a',
  'aa',
  'kayak',
  'level',
  'Was it a car or a cat I saw',
  'Step on no pets'
]

console.log(list[0], palindromeChecker(list[0]))
console.log(list[1], palindromeChecker(list[1]))
console.log(list[2], palindromeChecker(list[2]))
console.log(list[3], palindromeChecker(list[3]))
console.log(list[4], palindromeChecker(list[4]))
console.log(list[5], palindromeChecker(list[5]))
