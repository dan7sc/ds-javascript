const defaultEquals = (a, b) => {
  return a === b
}

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
}

const defaultCompare = (a, b) => {
  if (a === b) {
    return 0
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

const defaultToString = (item) => {
  if (item === null) {
    return 'NULL'
  } else if (item === undefined) {
    return 'UNDEFINED'
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`
  }
  return item.toString()
}

const swap = (array, a, b) => {
  [array[a], array[b]] = [array[b], array[a]]
}

const createNonSortedArray = (size) => {
  const array = []
  for(let i = size; i > 0; i--) {
    array.push(i)
  }
  return array
}

module.exports = {
  defaultEquals,
  Compare,
  defaultCompare,
  defaultToString,
  swap,
  createNonSortedArray
}
