const GRID_COUNT = 20;

function generateBoard(size) {
  unit_size = String(700 / size);

  const board = document.querySelector(".board");
  board.style.display = "flex";

  // Clear previous board
  board.innerHTML = "";
  for (let a = 0; a < 2 * size; a++) {
    const row_div = document.createElement("div");
    row_div.dataset.row = `${a}`;
    row_div.style.width = "1400px";
    row_div.style.height = `${unit_size}px`;
    row_div.style.boxSizing = "border-box";

    for (let b = 0; b < size; b++) {
      const col_div = document.createElement("div");
      col_div.dataset.col = `${b}`;
      col_div.dataset.row = `${a}`;
      col_div.style.width = `${unit_size}px`;
      col_div.style.height = `${unit_size}px`;
      col_div.style.backgroundColor = "white";
      col_div.style.boxSizing = "border-box";
      col_div.classList.add("cell");

      row_div.appendChild(col_div);
    }
    board.appendChild(row_div);
  }
}

function main() {
  generateBoard(GRID_COUNT);
}

function selectCell(row, col) {
  const cell = document.querySelector(`div[row='${row}'][col='${col}']`);
  return selectedCell;
}

function setCell(row, col) {
  const cell = selectCell(row, col);
  cell.classList.add("start-node");
}

main();
