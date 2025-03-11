const bfs = (grid, startNode, endNode) => {
  if (!startNode || !endNode) return [];

  let queue = [startNode];
  let visitedNodes = [];

  while (queue.length) {
    let node = queue.shift();//queure.shift removes the first element from an array and returns that removed element

    if (node.isVisited || node.isWall) continue;

    node.isVisited = true;
    visitedNodes.push(node);

    if (node === endNode) break;

    [[0,1],[1,0],[0,-1],[-1,0]].forEach(([dr, dc]) => {
      let newRow = node.row + dr, newCol = node.col + dc;
      if (grid[newRow] && grid[newRow][newCol]) {
        let neighbor = grid[newRow][newCol];
        if (!neighbor.isVisited && !neighbor.isWall) {
          neighbor.previousNode = node; // Track previous node
          queue.push(neighbor);
        }
      }
    });
  }

  return { visitedNodes, shortestPath: getShortestPath(endNode) };
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

export default bfs;
