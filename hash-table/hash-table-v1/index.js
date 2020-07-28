const HashTable = require('./hash-table')

const hashmap = new HashTable()

console.log(hashmap.put('John', 'john@email.com'))
hashmap.put('Kate', 'kate@email.com')
hashmap.put('Ann', 'ann@email.com')
hashmap.put('Mary', 'mary@email.com')
hashmap.put('Jamie', 'jamie@email.com')
hashmap.put('Annabelle', 'annabelle@email.com')
hashmap.put('Mark', 'mark@email.com')
hashmap.put('Jake', 'jake@email.com')
hashmap.put('Antony', 'antony@email.com')
hashmap.put('Jonathan', 'jonathan@email.com') // [collision] substitute jamie

console.log(hashmap.table)

console.log(hashmap.hashCode('John') + ' - John')
console.log(hashmap.hashCode('Mary') + ' - Mary')

console.log(hashmap.remove('Mark'))

console.log(hashmap.get('John'))
console.log(hashmap.get('Kate'))
console.log(hashmap.get('Mark'))

console.log(hashmap.toString())
