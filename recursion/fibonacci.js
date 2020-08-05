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

  return fibonacci(n - 1) + fibonacci(n - 2)
}

let result = ''
result += ' ' + fibonacci(0)

for (let i = 1; i < 11; i++) {
  result += ' ' + fibonacci(i)
}

console.log(result)
