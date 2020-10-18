const {
  defaultCompare,
  Compare,
  swap,
  createNonSortedArray
} = require('../../util')

const selectionSort = (array, compareFn = defaultCompare) => {
  const { length } = array
  let indexMin
  for(let i = 0; i < length - 1; i++) {
    indexMin = i
    for(let j = i + 1; j < length; j++) {
      if(compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
        indexMin = j
      }
    }
    swap(array, i, indexMin)
  }
  return array
}

let array = createNonSortedArray(10)
console.log(array.join(', '))
array = selectionSort(array)
console.log(array.join(', '))
