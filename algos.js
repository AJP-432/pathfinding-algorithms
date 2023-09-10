import { boardState } from "/board.js";

let foundPath = null;
const offsets = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function isValid(row, col) {
  return (
    0 <= row &&
    row < 20 &&
    0 <= col &&
    col < 40 &&
    boardState.internalBoard[row][col] != boardState.cellStates.VISITED &&
    boardState.internalBoard[row][col] != boardState.cellStates.START
  );
}

export function bfs() {
  const start = [boardState.startNode, []];
  let queue = [start];

  while (!foundPath && queue.length != 0) {
    let [currNodePos, currAcc] = queue.shift();

    for (let i = 0; i < 4; i++) {
      let newNodePos = [
        currNodePos[0] + offsets[i][0],
        currNodePos[1] + offsets[i][1],
      ];

      console.log(newNodePos);

      if (isValid(newNodePos[0], newNodePos[1])) {
        const displayCell = boardState.selectDisplayCell(
          newNodePos[0],
          newNodePos[1]
        );
        displayCell.classList.add("looking-node");

        let newAcc = currAcc + offsets[i];
        const newNodeState = parseInt(
          boardState.internalBoard[newNodePos[0]][newNodePos[1]],
          10
        );

        switch (newNodeState) {
          case boardState.cellStates.END:
            foundPath = newAcc;
            return foundPath;
          case boardState.cellStates.EMPTY:
            queue.push([newNodePos, newAcc]);
            break;
        }
        displayCell.classList.remove("looking-node");
        addToVisited(newNodePos[0], newNodePos[1]);
      } else {
        continue;
      }
    }
  }

  function addToVisited(row, col) {
    const visitedCell = boardState.selectDisplayCell(row, col);
    visitedCell.classList.add("visited-node");
    boardState.internalBoard[row][col] = boardState.cellStates.visitedCell;
  }
}

// function getAdjacentNodes(row, col) {
//   function isValid(row, col) {
//     return 0 <= row < 20 && 0 <= col < 40;
//   }

//   let adjacentNodes = [];

//   for (const offset in offsets) {
//     const neighbour = [row + offset[0], col + offset[1]];
//     if (isValid(neighbour[0], neighbour[1])) {
//       adjacentNodes.push();
//     }
//   }

//   return adjacentNodes;
// }
