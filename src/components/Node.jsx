import React from "react";

const Node = ({ row, col, isStart, isEnd, isWall, isVisited, isPath, onMouseDown, onMouseEnter }) => {
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      className={`w-7 h-7 border border-gray-700 transition-all duration-300 rounded-lg
        ${isStart ? "bg-green-500 neon-green" : 
          isEnd ? "bg-red-500 neon-red" : 
          isPath ? "bg-yellow-500 neon-yellow animate-path" : 
          isWall ? "bg-black" : 
          isVisited ? "bg-blue-500 neon-blue animate-visited" : 
          "bg-gray-800 hover:bg-gray-700"}`}
    ></div>
  );
};

export default Node;