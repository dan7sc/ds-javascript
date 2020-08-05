const fibonacci = n => {
  const mem = [0, 1]
  const fibonacciHelper = n => {
    // console.log(n, mem)
    if (mem[n] === 0 || mem[n]) {
      return mem[n]
    }
    // console.trace()
    return mem[n] = fibonacciHelper(n - 1) + fibonacciHelper(n - 2)
  }
  return fibonacciHelper(n)
}

// console.log(fibonacci(5))

let result = ''
result += ' ' + fibonacci(0)

for (let i = 1; i < 11; i++) {
  result += ' ' + fibonacci(i)
}

console.log(result)
