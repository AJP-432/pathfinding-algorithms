export const GRID_COUNT = 20;
export let START_NODE = null;
export let END_NODE = null;
export let internalBoard = generateDisplayBoard();
export let unit_size = 700 / GRID_COUNT;

export const cellStates = {
  NULL: 1,
  START: 2,
  END: 3,
  WALL: 4,
  WEIGHT: 5,
  PATH: 6,
  SEARCHED: 7,
};

export function selectDisplayCell(row, col) {
  const selectedCell = document.querySelector(`div[data-row='${row}'][data-col='${col}']`);
  return selectedCell;
}

export function generateDisplayBoard(size = GRID_COUNT) {
  const board = document.querySelector(".board");

  // Clear previous board
  board.innerHTML = "";

  for (let a = 0; a < 2 * size; a++) {
    const col_div = document.createElement("div");
    col_div.dataset.col = `${a}`;
    col_div.style.width = "100%";
    col_div.style.height = `${unit_size}px`;

    for (let b = 0; b < size; b++) {
      const row_div = document.createElement("div");
      row_div.dataset.row = `${b}`;
      row_div.dataset.col = `${a}`;
      row_div.style.width = `${unit_size}px`;
      row_div.style.height = `${unit_size}px`;

      row_div.classList.add("cell");
      row_div.dataset.state = cellStates.NULL;

      row_div.addEventListener("mousedown", setCellNode);
      row_div.addEventListener("dragover", setCellNode);
      row_div.addEventListener("dblclick", unsetCellNode);

      col_div.appendChild(row_div);
    }
    board.appendChild(col_div);
  }
}

export function setCellNode(event) {
  const nodeType = document.getElementById("node-types");
  const row = parseInt(event.target.dataset.row, 10);
  const col = parseInt(event.target.dataset.col, 10);
  const clickedCell = event.target;

  if (clickedCell.dataset.state == cellStates.NULL) {
    switch (nodeType.value) {
      case "start":
        const oldStart = document.querySelector(".start-node");
        if (oldStart) oldStart.classList.remove("start-node");
        START_NODE = [row, col];
        clickedCell.dataset.state = cellStates.START;
        clickedCell.classList.add("start-node");
        internalBoard[row][col] = cellStates.START;
        break;
      case "end":
        const oldEnd = document.querySelector(".end-node");
        if (oldEnd) oldEnd.classList.remove("end-node");
        END_NODE = [row, col];
        clickedCell.dataset.state = cellStates.END;
        clickedCell.classList.add("end-node");
        internalBoard[row][col] = cellStates.END;
        break;
      case "wall":
        clickedCell.dataset.state = cellStates.WALL;
        clickedCell.classList.add("wall-node");
        internalBoard[row][col] = cellStates.WALL;
        break;
      case "weight":
        clickedCell.dataset.state = cellStates.WEIGHT;
        clickedCell.classList.add("weight-node");
        internalBoard[row][col] = cellStates.WEIGHT;
        break;
    }
  }
}

export function unsetCellNode(event) {
  const row = parseInt(event.target.dataset.row, 10);
  const col = parseInt(event.target.dataset.col, 10);
  const clickedCell = event.target;

  if (clickedCell.dataset.state != cellStates.NULL) {
    internalBoard[row][col] = cellStates.NULL;
    switch (clickedCell.dataset.state) {
      case cellStates.START:
        START_NODE = null;
        clickedCell.classList.remove("start-node");
        break;
      case cellStates.END:
        END_NODE = null;
        clickedCell.classList.remove("end-node");
        break;
      case cellStates.WALL:
        clickedCell.classList.remove("wall-node");
        break;
      case cellStates.WEIGHT:
        clickedCell.classList.remove("weight-node");
        break;
    }
  }

  clickedCell.dataset.state = cellStates.NULL;
}

export function generateInternalBoard(size = GRID_COUNT) {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => cellStates.NULL));
}

export function resetBoard() {
  return function () {
    START_NODE = null;
    END_NODE = null;
    internalBoard = null;

    generateDisplayBoard(GRID_COUNT);
    internalBoard = generateInternalBoard(GRID_COUNT);
  };
}
