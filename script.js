const GRID_COUNT = 20;
let START_NODE = null;
let END_NODE = null;
let internalBoard = null;
let unit_size = 700 / GRID_COUNT;

const CellStates = {
  NULL: 1,
  START: 2,
  END: 3,
  WALL: 4,
  WEIGHT: 5,
  PATH: 6,
  SEARCHED: 7,
};

function selectDisplayCell(row, col) {
  const selectedCell = document.querySelector(`div[data-row='${row}'][data-col='${col}']`);
  return selectedCell;
}

function generateDisplayBoard(size = GRID_COUNT) {
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
      row_div.dataset.state = CellStates.NULL;

      row_div.addEventListener("mousedown", setCellNode);
      row_div.addEventListener("dragover", setCellNode);
      row_div.addEventListener("dblclick", unsetCellNode);

      col_div.appendChild(row_div);
    }
    board.appendChild(col_div);
  }
}

function setCellNode(event) {
  const nodeType = document.getElementById("node-types");
  const row = parseInt(event.target.dataset.row, 10);
  const col = parseInt(event.target.dataset.col, 10);
  const clickedCell = event.target;

  if (clickedCell.dataset.state == CellStates.NULL) {
    switch (nodeType.value) {
      case "start":
        const oldStart = document.querySelector(".start-node");
        if (oldStart) oldStart.classList.remove("start-node");
        START_NODE = [row, col];
        clickedCell.dataset.state = CellStates.START;
        clickedCell.classList.add("start-node");
        internalBoard[row][col] = CellStates.START;
        break;
      case "end":
        const oldEnd = document.querySelector(".end-node");
        if (oldEnd) oldEnd.classList.remove("end-node");
        END_NODE = [row, col];
        clickedCell.dataset.state = CellStates.END;
        clickedCell.classList.add("end-node");
        internalBoard[row][col] = CellStates.END;
        break;
      case "wall":
        clickedCell.dataset.state = CellStates.WALL;
        clickedCell.classList.add("wall-node");
        internalBoard[row][col] = CellStates.WALL;
        break;
      case "weight":
        clickedCell.dataset.state = CellStates.WEIGHT;
        clickedCell.classList.add("weight-node");
        internalBoard[row][col] = CellStates.WEIGHT;
        break;
    }
  }
}

function unsetCellNode(event) {
  const row = parseInt(event.target.dataset.row, 10);
  const col = parseInt(event.target.dataset.col, 10);
  const clickedCell = event.target;

  if (clickedCell.dataset.state != CellStates.NULL) {
    internalBoard[row][col] = CellStates.NULL;
    switch (clickedCell.dataset.state) {
      case CellStates.START:
        START_NODE = null;
        clickedCell.classList.remove("start-node");
        break;
      case CellStates.END:
        END_NODE = null;
        clickedCell.classList.remove("end-node");
        break;
      case CellStates.WALL:
        clickedCell.classList.remove("wall-node");
        break;
      case CellStates.WEIGHT:
        clickedCell.classList.remove("weight-node");
        break;
    }
  }

  clickedCell.dataset.state = CellStates.NULL;
}

function generateInternalBoard(size = GRID_COUNT) {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => CellStates.NULL));
}

function main() {
  generateDisplayBoard(GRID_COUNT);
  internalBoard = generateInternalBoard(GRID_COUNT);
}

main();
