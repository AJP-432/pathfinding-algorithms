import { boardState } from "/board";

let foundPath = null;
let NODES_TO_EXPLORE = [[START_NODE, []]];
const offsets = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function bfs() {
  const displayBoard = document.querySelector(".board");
  let visited = new Array(20 * 40);

  while (!foundPath && NODES_TO_EXPLORE.length != 0) {
    let [currNode, currAcc] = NODES_TO_EXPLORE.shift();
    for (let i = 0; i < 4; i++) {
      newNode = [currNode[0] + offsets[i][0], currNode[1] + offsets[i][1]];
      newAcc = currAcc + offsets[i];
      if (internalBoard[newNode[0]][newNode[1]] == cellStates.NULL) {
      }
    }
  }

  function isValidPos(row, col) {
    return 0 <= row < 20 && 0 <= col < 40;
  }

  function addToVisited(row, col) {
    const visitedCell = selectDisplayCell(row, col);
    visitedCell.classList.add("visited-node");
    visitedCell.visited.push([row, col]);
  }
}
