const factorialIterative = (number) => {
  if (number < 0) {
    return undefined
  }

  let total = 1
  for (let i = number; i > 1; i--) {
    total *= i
  }

  return total
}

console.log(factorialIterative(5))
console.log(factorialIterative(0))
console.log(factorialIterative(1))
console.log(factorialIterative(2))
console.log(factorialIterative(-8))
