const {
  defaultCompare,
  Compare,
  createNonSortedArray
} = require('../../util')

const mergeSort = (array, compareFn = defaultCompare) => {
  if(array.length > 1) {
    const { length } = array
    const middle = Math.floor(length / 2)
    const left = mergeSort(array.slice(0, middle), compareFn)
    const right = mergeSort(array.slice(middle, length), compareFn)
    array = merge(left, right, compareFn)
  }
  return array
}

const merge = (left, right, compareFn) => {
  let i = 0
  let j = 0
  let result = []
  while(i < left.length && j < right.length) {
    if(compareFn(left[i], right[j]) === Compare.LESS_THAN) {
      result = result.concat(left[i])
      i++
    } else {
      result = result.concat(right[j])
      j++
    }
  }
  if(i < left.length) {
    result = result.concat(left.slice(i))
  } else {
    result = result.concat(right.slice(j))
  }
  return result
}

let array = createNonSortedArray(10)
console.log(array.join(', '))
array = mergeSort(array)
console.log(array.join(', '))
