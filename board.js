class Board {
  constructor() {
    this.unitSize = 700 / 20;
    this.gridCount = 20;
    this.internalBoard;
    this.displayBoard = document.querySelector(".board");
    this.cellStates = {
      EMPTY: 1,
      START: 2,
      END: 3,
      WALL: 4,
      WEIGHT: 5,
      PATH: 6,
      VISITED: 7,
    };
    this.startNode = null;
    this.endNode = null;
  }

  selectDisplayCell(row, col) {
    const selectedCell = document.querySelector(
      `div[data-row='${row}'][data-col='${col}']`
    );
    return selectedCell;
  }

  generateBoard(size = this.gridCount) {
    this.generateDisplayBoard(size);
    this.generateInternalBoard(size);

    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", (event) => {
      this.resetBoard();
    });
  }

  generateDisplayBoard(size = this.gridCount) {
    const board = document.querySelector(".board");

    // Clear previous board
    board.innerHTML = "";

    for (let a = 0; a < 2 * size; a++) {
      const col_div = document.createElement("div");
      col_div.dataset.col = `${a}`;
      col_div.style.width = "100%";
      col_div.style.height = `${this.unitSize}px`;

      for (let b = 0; b < size; b++) {
        const row_div = document.createElement("div");
        row_div.dataset.row = `${b}`;
        row_div.dataset.col = `${a}`;
        row_div.style.width = `${this.unitSize}px`;
        row_div.style.height = `${this.unitSize}px`;

        row_div.classList.add("cell");
        row_div.dataset.state = this.cellStates.EMPTY;

        row_div.addEventListener("mousedown", (event) => {
          const row = parseInt(event.target.dataset.row, 10);
          const col = parseInt(event.target.dataset.col, 10);
          this.setCellNode(row, col);
        });

        row_div.addEventListener("dragover", (event) => {
          const row = parseInt(event.target.dataset.row, 10);
          const col = parseInt(event.target.dataset.col, 10);
          this.setCellNode(row, col);
        });

        row_div.addEventListener("dblclick", (event) => {
          const row = parseInt(event.target.dataset.row, 10);
          const col = parseInt(event.target.dataset.col, 10);
          this.unsetCellNode(row, col);
        });

        col_div.appendChild(row_div);
      }

      board.appendChild(col_div);
    }
  }

  generateInternalBoard(size = this.gridCount) {
    this.internalBoard = Array.from({ length: size }, () =>
      Array.from({ length: size * 2 }, () => this.cellStates.EMPTY)
    );
  }

  setCellNode(row, col) {
    const nodeType = document.getElementById("node-types");
    const clickedCell = this.selectDisplayCell(row, col);

    if (clickedCell.dataset.state == this.cellStates.EMPTY) {
      switch (nodeType.value) {
        case "start":
          const oldStart = document.querySelector(".start-node");
          if (oldStart) oldStart.classList.remove("start-node");
          this.startNode = [row, col];
          clickedCell.dataset.state = this.cellStates.START;
          clickedCell.classList.add("start-node");
          this.internalBoard[row][col] = this.cellStates.START;
          break;
        case "end":
          const oldEnd = document.querySelector(".end-node");
          if (oldEnd) oldEnd.classList.remove("end-node");
          this.endNode = [row, col];
          clickedCell.dataset.state = this.cellStates.END;
          clickedCell.classList.add("end-node");
          this.internalBoard[row][col] = this.cellStates.END;
          break;
        case "wall":
          clickedCell.dataset.state = this.cellStates.WALL;
          clickedCell.classList.add("wall-node");
          this.internalBoard[row][col] = this.cellStates.WALL;
          break;
        case "weight":
          clickedCell.dataset.state = this.cellStates.WEIGHT;
          clickedCell.classList.add("weight-node");
          this.internalBoard[row][col] = this.cellStates.WEIGHT;
          break;
      }
    }
  }

  unsetCellNode(row, col) {
    const clickedCell = this.selectDisplayCell(row, col);

    if (clickedCell.dataset.state != this.cellStates.EMPTY) {
      this.internalBoard[row][col] = this.cellStates.EMPTY;

      switch (parseInt(clickedCell.dataset.state, 10)) {
        case this.cellStates.START:
          this.startNode = null;
          clickedCell.classList.remove("start-node");
          break;
        case this.cellStates.END:
          this.endNode = null;
          clickedCell.classList.remove("end-node");
          break;
        case this.cellStates.WALL:
          clickedCell.classList.remove("wall-node");
          break;
        case this.cellStates.WEIGHT:
          clickedCell.classList.remove("weight-node");
          break;
      }
    }

    clickedCell.dataset.state = this.cellStates.EMPTY;
  }

  resetBoard() {
    this.startNode = null;
    this.endNode = null;

    this.generateBoard(this.gridCount);

    console.log(this.internalBoard);
  }
}

export const boardState = new Board();
