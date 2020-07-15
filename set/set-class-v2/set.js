class SetClass extends Set {
  constructor() {
    super()
  }

  add(element) {
    return super.add(element)
  }

  values() {
    const values = []
    super.forEach((key, value) => {
      values.push(value)
    })
    return values
  }

  has(element) {
    return super.has(element)
  }

  size() {
    return super.size
  }

  delete(element) {
    return super.delete(element)
  }

  clear() {
    return super.clear()
  }

  union(otherSet) {
    const unionSet = new SetClass()
    this.forEach(value => unionSet.add(value))
    otherSet.forEach(value => unionSet.add(value))
    return unionSet
  }

  intersection(otherSet) {
    const intersectionSet = new SetClass()
    this.forEach(value => {
      if (otherSet.has(value)) {
        intersectionSet.add(value)
      }
    })
    return intersectionSet
  }

  difference(otherSet) {
    const differenceSet = new SetClass()
    this.forEach(value => {
      if (!otherSet.has(value)) {
        differenceSet.add(value)
      }
    })
    return differenceSet
  }

  static union(setA, setB) {
    return new Set([ ...setA, ...setB ])
  }

  static intersection(setA, setB) {
    return new Set([ ...setA ].filter(value => setB.has(value)))
  }

  static difference(setA, setB) {
    return new Set([ ...setA ].filter(value => !setB.has(value)))
  }
}

module.exports = SetClass
