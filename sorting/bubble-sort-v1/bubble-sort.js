const {
  defaultCompare,
  Compare,
  swap,
  createNonSortedArray
} = require('../../util')

const bubbleSort = (array, compareFn = defaultCompare) => {
  const { length } = array
  for(let i = 0; i < length - 1; i++) {
    for(let j = 0; j < length - 1 - i; j++) {
      if(compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1)
      }
    }
  }
  return array
}

let array = createNonSortedArray(10)
console.log(array.join(', '))
array = bubbleSort(array)
console.log(array.join(', '))
