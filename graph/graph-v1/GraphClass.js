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
}

module.exports = GraphClass
