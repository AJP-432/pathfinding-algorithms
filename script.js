const GRID_COUNT = 20;
let START_NODE = null;
let END_NODE = null;
let unit_size = null;
let internalBoard = null;

const board = document.querySelector(".board");
unit_size = board.clientWidth / GRID_COUNT;

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
      row_div.style.backgroundColor = "white";

      row_div.classList.add("cell");
      row_div.dataset.state = CellStates.NULL;

      row_div.addEventListener("mouseenter", () => {
        if (this.dataset.state == CellStates.NULL) this.style.backgroundColor = "#000000";
      });

      row_div.addEventListener("mouseleave", () => {
        if (this.dataset.state == CellStates.NULL) this.style.backgroundColor = "#FFFFFF";
      });

      row_div.addEventListener("mousedown", setCellNode());
      row_div.addEventListener("dragover", setCellNode());
      row_div.addEventListener("dblclick", removeCellNode());

      col_div.appendChild(row_div);
    }
    board.appendChild(col_div);
  }
}

function setCellNode() {
  const nodeType = document.getElementById("node-types");
  const row = parseInt(this.dataset.row, 10);
  const col = parseInt(this.dataset.col, 10);

  if (this.dataset.state == CellStates.NULL) {
    const nodeTypeClass = nodeType.value + "-node";
    this.classList.add(nodeTypeClass);

    switch (nodeType.value) {
      case "start":
        const oldStart = document.querySelector(".start-node");
        oldStart.classList.remove("start-node");
        START_NODE = (row, col);
        this.dataset.state = CellStates.START;
        internalBoard[row][col] = CellStates.START;
        break;
      case "end":
        const oldEnd = document.querySelector(".end-node");
        oldEnd.classList.remove("end-node");
        end_selected = (row, col);
        this.dataset.state = CellStates.END;
        internalBoard[row][col] = CellStates.END;
        break;
      case "wall":
        this.dataset.state = CellStates.WALL;
        internalBoard[row][col] = CellStates.WALL;
      case "weight":
        this.dataset.state = CellStates.WEIGHT;
        internalBoard[row][col] = CellStates.WEIGHT;
    }
  }
}

function unsetCellNode() {
  const row = parseInt(this.dataset.row, 10);
  const col = parseInt(this.dataset.col, 10);
  if (this.dataset.state != CellStates.NULL) {
    internalBoard[row][col] = CellStates.NULL;
    switch (this.dataset.state) {
      case CellStates.START:
        START_NODE = null;
        this.classList.remove("start-node");
      case CellStates.END:
        END_NODE = null;
        this.classList.remove("end-node");
      case CellStates.WALL:
        this.classList.remove("wall-node");
      case CellStates.WEIGHT:
        this.classList.remove("weight-node");
    }
  }

  this.dataset.state = CellStates.NULL;
}

function generateInternalBoard(size = GRID_COUNT) {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => "."));
}

function main() {
  generateDisplayBoard(GRID_COUNT);
  internalBoard = generateInternalBoard(GRID_COUNT);
}

main();
