const MinHeap = require('./bheap')

const minheap = new MinHeap()

const getRandomNumber = () => Math.floor(1 + Math.random() * 15)

let i = 0
while(i < 11) {
  const number = getRandomNumber()
  if(!minheap.heap.includes(number)) {
    i++
    minheap.insert(number)
  }
}

console.log(minheap.heap)

console.log(minheap.size())
console.log(minheap.isEmpty())
console.log(minheap.findMinimum())


console.log(minheap.extract())
console.log(minheap.heap)
console.log(minheap.findMinimum())
