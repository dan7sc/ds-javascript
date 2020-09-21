const Dictionary = require('../../dictionary/dictionary-v1/dictionary')
const Queue = require('../../queue/queue-v1/queue')
const Stack = require('../../stack/stack-v2/stack')

const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2
}

const initializeColor = vertices => {
  const color = {}
  for(let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE
  }
  return color
}

class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected
    this.vertices = []
    this.adjacentList = new Dictionary()
  }

  addVertex(v) {
    if(!this.vertices.includes(v)) {
      this.vertices.push(v)
      this.adjacentList.set(v, [])
    }
  }

  addEdge(v, w) {
    if(!this.adjacentList.get(v)) {
      this.addVertex(v)
    }
    if(!this.adjacentList.get(w)) {
      this.addVertex(w)
    }
    this.adjacentList.get(v).push(w)
    if(!this.isDirected) {
      this.adjacentList.get(w).push(v)
    }
  }

  getVertices() {
    return this.vertices
  }

  getAdjacentList() {
    return this.adjacentList
  }

  toString() {
    let str = ''
    for(let i = 0; i < this.vertices.length; i++) {
      str += `${this.vertices[i]} -> `
      const neighbors = this.adjacentList.get(this.vertices[i])
      for(let j = 0; j < neighbors.length; j++) {
        str += `${neighbors[j]} `
      }
      str += '\n'
    }
    return str
  }

  breadthFirstSearch(startVertex, callback = null) {
    const vertices = this.getVertices()
    const adjacentList = this.getAdjacentList()
    const color = initializeColor(vertices)
    const queue = new Queue()
    const distances = {}
    const predecessors = {}

    queue.enqueue(startVertex)

    for(let i = 0; i < vertices.length; i++) {
      distances[vertices[i]] = 0
      predecessors[vertices[i]] = null
    }

    while(!queue.isEmpty()) {
      const currentVertice = queue.dequeue()
      const neighbors = adjacentList.get(currentVertice)
      color[currentVertice] = Colors.GREY
      for(let i = 0; i < neighbors.length; i++) {
        const currentNeighbor = neighbors[i]
        if(color[currentNeighbor] === Colors.WHITE) {
          color[currentNeighbor] = Colors.GREY
          distances[currentNeighbor] = distances[currentVertice] + 1
          predecessors[currentNeighbor] = currentVertice
          queue.enqueue(currentNeighbor)
        }
      }
      color[currentVertice] = Colors.BLACK
      if(callback) {
        callback(currentVertice)
      }
    }
    return {
      distances,
      predecessors
    }
  }

  showPathsfromVertex(vertices, startVertex) {
    const fromVertex = vertices[startVertex]
    const shortestPath = this.breadthFirstSearch(fromVertex)

    for(let i = startVertex + 1; i < vertices.length; i++) {
      const toVertex = vertices[i]
      const stack = new Stack()

      let currentVertex = toVertex
      while(currentVertex !== fromVertex) {
        stack.push(currentVertex)
        currentVertex = shortestPath.predecessors[currentVertex]
      }
      stack.push(fromVertex)
      let paths = stack.pop()
      while(!stack.isEmpty()) {
        paths += ` - ${stack.pop()}`
      }
      console.log(paths)
    }
  }

  depthFirstSearch(callback = null)  {
    const vertices = this.getVertices()
    const adjacentList = this.getAdjacentList()
    const color = initializeColor(vertices)

    const discoveryTime = {}
    const finishTime = {}
    const predecessors = {}
    const time = {
      count: 0
    }

    for(let i = 0; i < vertices.length; i++) {
      discoveryTime[vertices[i]] = 0
      finishTime[vertices[i]] = 0
      predecessors[vertices[i]] = null
    }

    for(let i = 0; i < vertices.length; i++) {
      const currentVertice = vertices[i]
      if(color[currentVertice] === Colors.WHITE) {
        this.depthFirstSearchHelper(
          currentVertice, color, discoveryTime, finishTime,
          predecessors, time, adjacentList, callback
        )
      }
    }

    return {
      discovery: discoveryTime,
      finished: finishTime,
      predecessors
    }
  }

  depthFirstSearchHelper(
    vertice, color, discovery, finished,
    predecessors, time, adjacentList, callback
  ) {
    color[vertice] = Colors.GREY
    discovery[vertice] = ++time.count

    if(callback) {
      callback(vertice)
    }
    const neighbors = adjacentList.get(vertice)
    for(let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i]
      if(color[neighbor] === Colors.WHITE) {
        predecessors[neighbor] = vertice
        this.depthFirstSearchHelper(
          neighbor, color, discovery, finished, predecessors,
          time, adjacentList, callback
        )
      }
    }
    color[vertice] = Colors.BLACK
    finished[vertice] = ++time.count
  }

  topsort(vertices) {
    const { finished } = this.depthFirstSearch()
    let str = ''
    for(let i = 0; i < vertices.length; i++) {
      let max = 0
      let maxName = null
      for(let j = 0; j < vertices.length; j++) {
        if(finished[vertices[j]] > max) {
          max = finished[vertices[j]]
          maxName = vertices[j]
        }
      }
      i !== vertices.length - 1 ? str += `${maxName} - ` : str += `${maxName}`
      delete finished[maxName]
    }
    console.log(str)
  }
}

module.exports = Graph
