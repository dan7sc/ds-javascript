const factorial = n => {
  // console.trace()

  if (n < 0) {
    return undefined
  }

  if (n === 0 || n === 1) {
    return 1
  }

  return n * factorial(n - 1)
}

console.log(factorial(5))
console.log(factorial(0))
console.log(factorial(1))
console.log(factorial(2))
console.log(factorial(-8))
