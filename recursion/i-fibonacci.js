const fibonacci = n => {
  if (n < 0) {
    return undefined
  }

  if (n < 1) {
    return 0
  }

  if (n <= 2) {
    return 1
  }

  let fibPrevMinus2 = 0
  let fibPrevMinus1 = 1
  let fib
  for(let i = 2; i <= n; i++) {
    fib = fibPrevMinus2 + fibPrevMinus1
    fibPrevMinus2 = fibPrevMinus1
    fibPrevMinus1 = fib
  }

  return fib
}

console.log(fibonacci(0))
console.log(fibonacci(1))
console.log(fibonacci(2))
console.log(fibonacci(3))
console.log(fibonacci(4))
console.log(fibonacci(5))
console.log(fibonacci(6))
