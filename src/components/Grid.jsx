import React, { useState, useEffect } from "react";
import Node from "./Node";
import dijkstra from "../algorithms/dijkstra";
import bfs from "../algorithms/bfs";
import dfs from "../algorithms/dfs";

const numRows = 20; 
const numCols = 20;

const Grid = () => {
  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [running, setRunning] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Dijkstra");

  useEffect(() => {
    resetGrid();
  }, []);

  const resetGrid = () => {
    const newGrid = Array.from({ length: numRows }, (_, row) =>
      Array.from({ length: numCols }, (_, col) => ({
        row, col, isStart: false, isEnd: false, isWall: false, isVisited: false, isPath: false,
      }))
    );
    setGrid(newGrid);
    setStartNode(null);
    setEndNode(null);
  };

  const handleCellClick = (row, col) => {
    if (running) return;
    let newGrid = [...grid];

    if (!startNode) {
      newGrid[row][col].isStart = true;
      setStartNode(newGrid[row][col]);
    } else if (!endNode) {
      newGrid[row][col].isEnd = true;
      setEndNode(newGrid[row][col]);
    } else {
      newGrid[row][col].isWall = !newGrid[row][col].isWall;
    }

    setGrid(newGrid);
  };

  const handleMouseDown = (row, col) => {
    setIsMouseDown(true);
    handleCellClick(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (isMouseDown && startNode && endNode) {
      let newGrid = [...grid];
      newGrid[row][col].isWall = true;
      setGrid(newGrid);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const visualizeAlgorithm = () => {
    if (!startNode || !endNode || running) return;
  
    setRunning(true);
    let result = { visitedNodes: [], shortestPath: [] };
  
    if (selectedAlgorithm === "Dijkstra") {
      result = dijkstra(grid, startNode, endNode);
    } else if (selectedAlgorithm === "BFS") {
      result = bfs(grid, startNode, endNode);
    } else if (selectedAlgorithm === "DFS") {
      result = dfs(grid, startNode, endNode); 
    }
  
    animateSearch(result.visitedNodes, result.shortestPath); 
  };

  const animateSearch = (visitedNodes, shortestPath) => {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        let newGrid = [...grid];
        newGrid[visitedNodes[i].row][visitedNodes[i].col].isVisited = true;
        setGrid(newGrid);
      }, 10 * i);
    }

    setTimeout(() => {
      for (let i = 0; i < shortestPath.length; i++) {
        setTimeout(() => {
          let newGrid = [...grid];
          newGrid[shortestPath[i].row][shortestPath[i].col].isPath = true;
          setGrid(newGrid);
        }, 50 * i);
      }
      setRunning(false);
    }, 10 * visitedNodes.length);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-4xl text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Pathfinding Algorithm Visualizer</h1>
        <div className="mb-6 flex justify-center space-x-4">
          <select
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            className="p-2 border border-blue-500 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Dijkstra">Dijkstra</option>
            <option value="BFS">BFS</option>
            <option value="DFS">DFS</option>
          </select>
          <button
            onClick={visualizeAlgorithm}
            disabled={running}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Start
          </button>
          <button
            onClick={resetGrid}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Clear
          </button>
        </div>
        <div className="grid grid-cols-[repeat(20,_30px)] gap-1 justify-center rounded-lg overflow-hidden" onMouseUp={handleMouseUp}>
          {grid.flat().map((node) => (
            <Node
              key={`${node.row}-${node.col}`}
              {...node}
              onMouseDown={() => handleMouseDown(node.row, node.col)}
              onMouseEnter={() => handleMouseEnter(node.row, node.col)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grid;
