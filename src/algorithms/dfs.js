import { path } from "framer-motion/client";

const dfs = (grid, current, endNode) => {
  const visitedNodes = [];
  const shortestPath = [];
  let pathFound = false;
  
  const result=dfsHelper(grid,current,endNode,visitedNodes,shortestPath,pathFound);
  if(result){
    return {visitedNodes,shortestPath};
  }
  return {visitedNodes,shortestPath:[]};

};

const dfsHelper =(grid,current,endNode,visitedNodes,shortestPath,pathFound)=>{
  if(!current.isWall){
    visitedNodes.push(current);
    shortestPath.push(current);
    current.isVisited = true;
  }
  if(current === endNode){
    pathFound = true;
    return true;
  }
  const directions = [[0,1],[1,0],[0,-1],[-1,0]];
  for (let [dr,dc] of directions){
    let newRow = current.row + dr;
    let newCol = current.col + dc;
    if(grid[newRow] && grid[newRow][newCol]){
      let neighbor = grid[newRow][newCol];
      if(!neighbor.isVisited &&!neighbor.isWall){
        if(dfsHelper(grid,neighbor,endNode,visitedNodes,shortestPath,pathFound)){
          return true;
        }
      }
    }
  }
  shortestPath.pop();
  return false;

}

export default dfs;