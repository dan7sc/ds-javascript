const Graph = require('./graph')
const GraphClass = require('./GraphClass')

const printVertex = (value) => console.log('Visited vertex:', value)

const graph = new Graph()

const localVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

for(let i = 0; i < localVertices.length; i++) {
  graph.addVertex(localVertices[i])
}

//          A ---
//        /  \   \
//       /    \   \
//      B      C - D
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


const graphv2 = new Graph(true)

graphv2.addEdge('A', 'C')
graphv2.addEdge('A', 'D')
graphv2.addEdge('B', 'D')
graphv2.addEdge('B', 'E')
graphv2.addEdge('C', 'F')
graphv2.addEdge('F', 'E')

const localVerticesv2 = ['A', 'B', 'C', 'D', 'E', 'F']

for(let i = 0; i < localVerticesv2.length; i++) {
  graphv2.addVertex(localVerticesv2[i])
}

// console.log(graph.vertices)
// console.log(graph.adjacentList.table)

// console.log(graph.toString())

// graph.breadthFirstSearch(localVertices[0], printVertex)

// const shortestPathA = graph.breadthFirstSearch(localVertices[0])
// console.log(shortestPathA)

// graph.showPathsfromVertex(localVertices, 0)

// graph.depthFirstSearch(printVertex)

// const result = graph.depthFirstSearch()
// console.log(result)

// graphv2.topsort(localVerticesv2)

const graphv3 = [
  [0, 2, 4, 0, 0, 0],
  [0, 0, 2, 4, 2, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 2],
  [0, 0, 0, 3, 0, 2],
  [0, 0, 0, 0, 0, 0]
]

const dist = GraphClass.dijkstra(graphv3, 0)
console.log(dist)
