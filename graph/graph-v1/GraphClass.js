const minDistance = (distance, visited) => {
  let min = Infinity
  let minIndex = -1
  for(let i = 0; i < distance.length; i++) {
    if(visited[i] === false && distance[i] <= min) {
      min = distance[i]
      minIndex = i
    }
  }
  return minIndex
}

const minKey = (graph, key, visited) => {
  let min = Infinity
  let minIndex = 0
  for(let i = 0; i < graph.length; i++) {
    if(visited[i] === false && key[i] < min) {
      min = key[i]
      minIndex = i
    }
  }
  return minIndex
}

class GraphClass {
  static dijkstra(graph, src) {
    const distance = []
    const visited = []
    const { length } = graph

    for(let i = 0; i < length; i++) {
      distance[i] = Infinity
      visited[i] = false
    }
    distance[src] = 0

    for(let i = 0; i < length - 1; i++) {
      const vertice = minDistance(distance, visited)
      visited[vertice] = true
      for(let neighbor = 0; neighbor < length; neighbor++) {
        if(!visited[neighbor] &&
           graph[vertice][neighbor] !== 0 &&
           isFinite(distance[vertice]) &&
           distance[vertice] + graph[vertice][neighbor] < distance[neighbor]) {
          distance[neighbor] = distance[vertice] + graph[vertice][neighbor]
        }
      }
    }
    return distance
  }

  static floydWarshall(graph) {
    const distance = []
    const { length } = graph
    for(let i = 0; i < length; i++) {
      distance[i] = []
      for(let j = 0; j < length; j++) {
        if(i === j) {
          distance[i][j] = 0
        } else if(!graph[i][j]) {
          distance[i][j] = Infinity
        } else {
          distance[i][j] = graph[i][j]
        }
      }
    }

    for(let k = 0; k < length; k++) {
      for(let i = 0; i < length; i++) {
        for(let j = 0; j < length; j++) {
          if(distance[i][k] + distance[k][j] < distance[i][j]) {
            distance[i][j] = distance[i][k] + distance[k][j]
          }
        }
      }
    }
    return distance
  }

  static prim(graph) {
    const parent = []
    const key = []
    const visited = []
    const { length } = graph

    for(let i = 0; i< length; i++) {
      key[i] = Infinity
      visited[i] = false
    }
    key[0] = 0
    parent[0] = -1

    for(let i = 0; i < length; i++) {
      const vertex = minKey(graph, key, visited)
      visited[vertex] = true
      for(let neighbor = 0; neighbor < length; neighbor++) {
        if(graph[vertex][neighbor] &&
           !visited[neighbor] &&
           graph[vertex][neighbor] < key[neighbor] ) {
          parent[neighbor] = vertex
          key[neighbor] = graph[vertex][neighbor]
        }
      }
    }

    return parent
  }
}

module.exports = GraphClass
