const MaxHeap = require('./bheap')

const maxheap = new MaxHeap()

const getRandomNumber = () => Math.floor(1 + Math.random() * 15)

let i = 0
while(i < 11) {
  const number = getRandomNumber()
  if(!maxheap.heap.includes(number)) {
    i++
    maxheap.insert(number)
  }
}

console.log(maxheap.heap)

console.log(maxheap.size())
console.log(maxheap.isEmpty())
console.log(maxheap.findMaximum())

console.log(maxheap.extract())
console.log(maxheap.heap)
console.log(maxheap.findMaximum())
