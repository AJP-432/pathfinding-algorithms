import { boardState } from "/board.js";

const offsets = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function isValid(row, col) {
  return (
    0 <= row &&
    row < boardState.gridCount &&
    0 <= col &&
    col < boardState.gridCount * 2 &&
    boardState.internalBoard[row][col] != boardState.cellStates.VISITED &&
    boardState.internalBoard[row][col] != boardState.cellStates.START &&
    boardState.internalBoard[row][col] != boardState.cellStates.WALL
  );
}

function drawPath(posAcc) {
  console.log("This is the DRAWER");
  console.log(posAcc);
  for (let i = 1; i < posAcc.length; i++) {
    const currPos = posAcc[i];
    const pathCell = boardState.selectDisplayCell(currPos[0], currPos[1]);
    if (pathCell.classList.contains("visited-node")) {
      pathCell.classList.remove("visited-node");
    }
    pathCell.classList.add("path-node");
  }
}

function addToVisited(row, col) {
  const visitedCell = boardState.selectDisplayCell(row, col);
  visitedCell.classList.add("visited-node");
  visitedCell.dataset.state = boardState.cellStates.VISITED;
  boardState.internalBoard[row][col] = boardState.cellStates.VISITED;
}

export async function bfs() {
  let foundPath = null;
  const start = [boardState.startNode, []];
  let queue = [start];

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  while (!foundPath && queue.length != 0) {
    let [currNodePos, currAcc] = queue.shift();

    for (let i = 0; i < 4; i++) {
      let newNodePos = [
        currNodePos[0] + offsets[i][0],
        currNodePos[1] + offsets[i][1],
      ];

      if (isValid(newNodePos[0], newNodePos[1])) {
        const displayCell = boardState.selectDisplayCell(
          newNodePos[0],
          newNodePos[1]
        );

        displayCell.classList.add("looking-node");

        let newAcc = currAcc.concat([currNodePos]);
        const newNodeState = parseInt(
          boardState.internalBoard[newNodePos[0]][newNodePos[1]],
          10
        );

        await sleep(0.5);

        switch (newNodeState) {
          case boardState.cellStates.END:
            foundPath = newAcc;
            console.log("This is the path");
            console.log(foundPath);
            drawPath(foundPath);
            displayCell.classList.remove("looking-node");
            return foundPath;
          case boardState.cellStates.EMPTY:
            queue.push([newNodePos, newAcc]);
            break;
        }

        displayCell.classList.remove("looking-node");
        addToVisited(newNodePos[0], newNodePos[1]);
      }
    }
  }
}

export async function dfs() {
  let foundPath = null;
  const start = [boardState.startNode, []];
  let stack = [start];
  let backtrackStack = [];

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  while (!foundPath && (stack.length != 0 || backtrackStack.length != 0)) {
    let currNodePos;
    let currAcc;
    let isBackTrack = false;
    if (stack.length != 0) {
      [currNodePos, currAcc] = stack.pop();
    } else {
      [currNodePos, currAcc] = backtrackStack.pop();
      isBackTrack = true;
    }
    let firstTime = true;

    for (let i = 0; i < 4; i++) {
      let newNodePos;
      let newAcc;
      if (!isBackTrack) {
        newNodePos = [
          currNodePos[0] + offsets[i][0],
          currNodePos[1] + offsets[i][1],
        ];
        newAcc = currAcc.concat([currNodePos]);
      } else {
        newNodePos = currNodePos;
        newAcc = currAcc;
      }

      if (isValid(newNodePos[0], newNodePos[1])) {
        if (firstTime) {
          console.log("FIRSTIME");
          const displayCell = boardState.selectDisplayCell(
            newNodePos[0],
            newNodePos[1]
          );

          displayCell.classList.add("looking-node");

          const newNodeState = parseInt(
            boardState.internalBoard[newNodePos[0]][newNodePos[1]],
            10
          );

          await sleep(0.5);

          switch (newNodeState) {
            case boardState.cellStates.END:
              foundPath = newAcc;
              console.log("This is the path");
              console.log(foundPath);
              drawPath(foundPath);
              displayCell.classList.remove("looking-node");
              return foundPath;
            case boardState.cellStates.EMPTY:
              stack.push([newNodePos, newAcc]);
              break;
          }

          displayCell.classList.remove("looking-node");
          addToVisited(newNodePos[0], newNodePos[1]);
          firstTime = false;
          if (isBackTrack) {
            break;
          }
        } else {
          console.log("LASTIME");
          backtrackStack.push([newNodePos, newAcc]);
        }
      }
    }
  }
}

export async function dijkstra() {
  let foundPath = null;
  const start = [boardState.startNode, [], 0];
  let queue = [start];

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  while (!foundPath && queue.length != 0) {
    let [currNodePos, currAcc, currWeight] = queue.shift();

    for (let i = 0; i < 4; i++) {
      let newNodePos = [
        currNodePos[0] + offsets[i][0],
        currNodePos[1] + offsets[i][1],
      ];

      if (isValid(newNodePos[0], newNodePos[1])) {
        const displayCell = boardState.selectDisplayCell(
          newNodePos[0],
          newNodePos[1]
        );

        displayCell.classList.add("looking-node");

        const newNodeState = parseInt(
          boardState.internalBoard[newNodePos[0]][newNodePos[1]],
          10
        );

        let newAcc = currAcc.concat([currNodePos]);
        let newWeight =
          newNodeState == boardState.cellStates.WEIGHT
            ? currWeight + 10
            : currWeight + 1;

        await sleep(0.5);

        switch (newNodeState) {
          case boardState.cellStates.END:
            foundPath = newAcc;
            console.log("This is the path");
            console.log(foundPath);
            drawPath(foundPath);
            displayCell.classList.remove("looking-node");
            return foundPath;
          case boardState.cellStates.EMPTY:
            binarySearchInsert(queue, [newNodePos, newAcc, newWeight]);
            break;
          case boardState.cellStates.WEIGHT:
            binarySearchInsert(queue, [newNodePos, newAcc, newWeight]);
            break;
        }

        displayCell.classList.remove("looking-node");
        addToVisited(newNodePos[0], newNodePos[1]);

        console.log(queue);
      }
    }
  }
}

export async function astar() {
  let foundPath = null;
  const start = [boardState.startNode, [], 0];
  let pQueue = [start];
  let backtrackQueue = [];

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  while (!foundPath && (pQueue.length != 0 || backtrackQueue.length != 0)) {
    let currNodePos, newNodePos;
    let currAcc, newAcc;
    let currWeight, newWeight;

    if (pQueue.length != 0) {
      [currNodePos, currAcc, currWeight] = pQueue.shift();
      const neighbours = offsets.map((offset) => [
        currNodePos[0] + offset[0],
        currNodePos[1] + offset[1],
      ]);

      let orderedNeighbours = [];

      for (let neighbour of neighbours) {
        if (isValid(neighbour[0], neighbour[1])) {
          const neighbourState = parseInt(
            boardState.internalBoard[neighbour[0]][neighbour[1]],
            10
          );
          let neighbourAcc = currAcc.concat([currNodePos]);
          let neighbourWeight =
            neighbourState == boardState.cellStates.WEIGHT
              ? currWeight + 10 + heuristic(neighbour, boardState.endNode)
              : currWeight + 1 + heuristic(neighbour, boardState.endNode);

          binarySearchInsert(orderedNeighbours, [
            neighbour,
            neighbourAcc,
            neighbourWeight,
          ]);
        }
      }

      [newNodePos, newAcc, newWeight] = orderedNeighbours.shift();

      for (let remainingNeighbour of orderedNeighbours) {
        binarySearchInsert(backtrackQueue, remainingNeighbour);
      }
    } else {
      [newNodePos, newAcc, newWeight] = backtrackQueue.shift();
    }

    const displayCell = boardState.selectDisplayCell(
      newNodePos[0],
      newNodePos[1]
    );

    displayCell.classList.add("looking-node");

    const newNodeState = parseInt(
      boardState.internalBoard[newNodePos[0]][newNodePos[1]],
      10
    );

    await sleep(0.5);

    switch (newNodeState) {
      case boardState.cellStates.END:
        foundPath = newAcc;
        drawPath(foundPath);
        displayCell.classList.remove("looking-node");
        return foundPath;
      default:
        binarySearchInsert(pQueue, [newNodePos, newAcc, newWeight]);
    }

    displayCell.classList.remove("looking-node");
    addToVisited(newNodePos[0], newNodePos[1]);
  }

  function heuristic(node, goal) {
    return Math.abs(node[0] - goal[0]) + Math.abs(node[1] - goal[1]);
  }
}

function binarySearchInsert(queue, newItem) {
  let l = 0;
  let r = queue.length - 1;
  let mid;

  while (l <= r) {
    mid = Math.floor((l + r) / 2);

    if (queue[mid][2] == newItem[2]) {
      queue.splice(mid, 0, newItem);
      return;
    }
    if (queue[mid][2] < newItem[2]) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  queue.splice(l, 0, newItem);
}
