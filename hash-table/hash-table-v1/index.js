const HashTable = require('./hash-table')

const hashmap = new HashTable()
console.log(hashmap.put('Ygritte', 'ygritte@email.com'))
hashmap.put('Jonathan', 'jonathan@email.com')
hashmap.put('Jamie', 'jamie@email.com')
hashmap.put('Jack', 'jack@email.com')
hashmap.put('Jasmine', 'jasmine@email.com')
hashmap.put('Jake', 'jake@email.com')
hashmap.put('Nathan', 'nathan@email.com')
hashmap.put('Athelstan', 'athelstan@email.com')
hashmap.put('Sue', 'sue@email.com')
hashmap.put('Aethelwulf', 'aethelwulf@email.com')
hashmap.put('Sargeras', 'sargeras@email.com')

console.log(hashmap.toString())

console.log(hashmap.remove('Jonathan'))

console.log(hashmap.toString())
