const dijkstra = (grid, startNode, endNode) => {
  if (!startNode || !endNode) return { visitedNodes: [], shortestPath: [] };

  for (let row of grid) {
    for (let node of row) {
      node.distance = Infinity; 
      node.previousNode = null; 
      node.isVisited = false; 
    }
  }

  startNode.distance = 0; 
  let unvisitedNodes = [startNode]; 
  let visitedNodes = []; 
  while (unvisitedNodes.length) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
    let node = unvisitedNodes.shift(); 

   
    if (node.isWall) continue;

    if (node.distance === Infinity) break;

    node.isVisited = true; 
    visitedNodes.push(node); 

    if (node === endNode) break;

    // Check all neighbors
    const neighbors = getNeighbors(grid, node);
    for (let neighbor of neighbors) {
      if (!neighbor.isVisited && !neighbor.isWall) {
        let newDistance = node.distance + 1; 
        if (newDistance < neighbor.distance) {
          neighbor.distance = newDistance; 
          neighbor.previousNode = node; 
          unvisitedNodes.push(neighbor); 
        }
      }
    }
  }

  const shortestPath = getShortestPath(endNode);

  return { visitedNodes, shortestPath };
};

const getNeighbors = (grid, node) => {
  const neighbors = [];
  const { row, col } = node;
  const directions = [
    [0, 1],
    [1, 0], 
    [0, -1], 
    [-1, 0], 
  ];

  for (let [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
      neighbors.push(grid[newRow][newCol]);
    }
  }

  return neighbors;
};

const getShortestPath = (endNode) => {
  let path = [];
  let current = endNode;
  while (current) {
    path.unshift(current); 
    current = current.previousNode; 
  }
  return path;
};

export default dijkstra;