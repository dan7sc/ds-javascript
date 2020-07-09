const Queue = require('../queue-v1/queue')

const hotPotato = (elementsList, num) => {
  const queue = new Queue()
  const eliminatedList = []

  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i])
  }

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue())
    }
    eliminatedList.push(queue.dequeue())
  }

  return {
    eliminated: eliminatedList,
    winner: queue.dequeue()
  }
}

const names = ['John', 'Jack', 'Pat', 'Carl', 'Mary']
const num = 11
const result = hotPotato(names, num)

result.eliminated.forEach(name => {
  console.log(`${name} was eliminated`)
})

console.log(`The winner is ${result.winner}`)
