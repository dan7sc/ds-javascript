const Dictionary = require('../../dictionary/dictionary-v1/dictionary')

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
}

module.exports = Graph
