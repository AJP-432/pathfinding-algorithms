const GRID_COUNT = 20;
var start_selected = false;
var end_selected = false;

const CellStates = {
  NULL: 1,
  START: 2,
  STOP: 3,
  WALL: 4,
  WEIGHT: 5,
  PATH: 6,
  SEARCHED: 7
};

function generateDisplayBoard(size) {
  unit_size = String(700 / size);

  const board = document.querySelector(".board");
  board.style.display = "flex";

  // Clear previous board
  board.innerHTML = "";
  for (let a = 0; a < 2 * size; a++) {
    const col_div = document.createElement("div");
    col_div.dataset.row = `${a}`;
    col_div.style.width = `${unit_size}px`;
    col_div.style.height = "700px";
    col_div.style.boxSizing = "border-box";

    for (let b = 0; b < size; b++) {
      const row_div = document.createElement("div");
      row_div.dataset.col = `${a}`;
      row_div.dataset.row = `${b}`;
      row_div.style.width = `${unit_size}px`;
      row_div.style.height = `${unit_size}px`;
      row_div.style.backgroundColor = "white";
      row_div.style.boxSizing = "border-box";
      row_div.classList.add("cell");

      row_div.dataset.state = CellStates.NULL;

      // Change colour on hover
      row_div.addEventListener("mouseenter", function() { if (this.dataset.state == CellStates.NULL) this.style.backgroundColor = "#000000"; });
      row_div.addEventListener("mouseleave", function() { if (this.dataset.state == CellStates.NULL) this.style.backgroundColor = "#FFFFFF"; });
      
      row_div.addEventListener("mousedown", colourCellOnClick());
      row_div.addEventListener("dragover", colourCellOnClick());
      row_div.addEventListener("dblclick", decolourCellOnClick());

      col_div.appendChild(row_div);
    }
    board.appendChild(col_div);
  }
}

function colourCellOnClick() {
  return function () {
    var node_type = document.getElementById("node-types-select");

    if (this.dataset.state == CellStates.NULL) {
      switch (node_type.value) {
        case "start":
          if (!start_selected) {
            start_selected = true;
            this.dataset.state = CellStates.START;
            this.style.backgroundColor = "#008000";
          }
          break;
        case "end":
          if (!end_selected) {
            end_selected = true;
            this.dataset.state = CellStates.END;
            this.style.backgroundColor = "#FF0000";
          }
          break;
        case "wall":
          this.dataset.state = CellStates.WALL;
          this.style.backgroundColor = "#FFA500";
          break;
        case "weight":
          this.dataset.state = CellStates.WEIGHT;
          this.style.backgroundColor = "#073763";
          break;
      }
    }
  };
}

function decolourCellOnClick() {
  return function () {
    if (this.dataset.state != CellStates.NULL) {
      if (this.dataset.state == CellStates.START) start_selected = false;
      if (this.dataset.state == CellStates.END) end_selected = false;

      this.dataset.state = CellStates.NULL;
      this.style.backgroundColor = "#FFFFFF";
    }
  };
}

function resetBoard() {
  return function () {
    for (let col = 0; col < 2 * GRID_COUNT; col++) {
      for (let row = 0; row < GRID_COUNT; row++) {
        const cell = selectDisplayCell(row, col);
        cell.dataset.state = CellStates.NULL;
        cell.style.backgroundColor = "#FFFFFF";
        start_selected = false;
        end_selected = false;
      }
    };
  }
}

function generateInternalBoard(size) {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => "."));
}

function main() {
  generateDisplayBoard(GRID_COUNT);
  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", resetBoard());
  internalBoard = generateInternalBoard(GRID_COUNT);
}

function selectDisplayCell(row, col) {
  const selectedCell = document.querySelector(`div[data-row='${row}'][data-col='${col}']`);
  return selectedCell;
}

function setCell(row, col) {
  const cell = selectDisplayCell(row, col);
}

main();
