const Dictionary = require('./dictionary')

const dictionary = new Dictionary()

console.log(dictionary.isEmpty())

console.log(dictionary.set('John', 'john@email.com'))
dictionary.set('Mary', 'mary@email.com')
dictionary.set('Chavo', 'ocho@email.com')
dictionary.set('Dan', 'dan@email.com')
console.log(dictionary.table)

console.log(dictionary.remove('John'))
console.log(dictionary.table)

console.log(dictionary.get('John'))
console.log(dictionary.get('Chavo'))

console.log(dictionary.keyValues())
console.log(dictionary.legacyKeyValues())

console.log(dictionary.keys())
console.log(dictionary.values())

dictionary.forEach(console.log)

console.log(dictionary.size())
console.log(dictionary.isEmpty())
console.log(dictionary.toString())
