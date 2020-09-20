const Graph = require('./graph')

const printVertex = (value) => console.log('Visited vertex:', value)

const graph = new Graph()

const localVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

for(let i = 0; i < localVertices.length; i++) {
  graph.addVertex(localVertices[i])
}

//          A ---
//        /  \   \
//       /    \   \
//      B      C   D
//    /   \     \ / \
//   E     F     G   H
//   |
//   I

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

// console.log(graph.vertices)
// console.log(graph.adjacentList.table)

// console.log(graph.toString())

// graph.breadthFirstSearch(localVertices[0], printVertex)

const shortestPathA = graph.breadthFirstSearch(localVertices[0])
console.log(shortestPathA)

graph.showPathsfromVertex(localVertices, 0)
