const dfs = (grid, startNode, endNode) => {
  if (!startNode || !endNode) return { visitedNodes: [], shortestPath: [] };

  for (let row of grid) {
    for (let node of row) {
      node.isVisited = false;
      node.previousNode = null;
    }
  }

  let visitedNodes = [];
  let stack = [startNode];
  let pathFound = false;

  while (stack.length) {
    let node = stack.pop();
    if (node.isWall || node.isVisited) continue;

    node.isVisited = true;
    visitedNodes.push(node);

    if (node === endNode) {
      pathFound = true;
      break;
    }

    const neighbors = getNeighbors(grid, node);
    for (let neighbor of neighbors) {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.previousNode = node;
        stack.push(neighbor);
      }
    }
  }

  const shortestPath = pathFound ? reconstructPath(endNode) : [];
  return { visitedNodes, shortestPath };
};

const getNeighbors = (grid, node) => {
  const neighbors = [];
  const { row, col } = node;
  const directions = [
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Left
    [-1, 0], // Up
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

const reconstructPath = (endNode) => {
  let path = [];
  let currentNode = endNode;
  while (currentNode) {
    path.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return path;
};

export default dfs;
