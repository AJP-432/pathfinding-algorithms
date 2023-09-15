class Board {
  constructor() {
    this.gridCount = 50;
    this.unitSize = 700 / this.gridCount;
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
    this.offsets = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];
  }

  selectDisplayCell(row, col) {
    const selectedCell = document.querySelector(
      `div[data-row='${row}'][data-col='${col}']`
    );
    return selectedCell;
  }

  generateBoard(size = this.gridCount) {
    this.internalBoard = null;
    this.generateDisplayBoard(size);
    this.generateInternalBoard(size);

    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", () => {
      this.resetBoard();
      this.resetSelects();
    });

    const terrainsSelect = document.getElementById("terrains");
    terrainsSelect.addEventListener("change", () => {
      const selectedTerrain = terrainsSelect.value;

      switch (selectedTerrain) {
        case "plain":
          boardState.resetBoard();
          break;
        case "random":
          boardState.generateRandomBoard();
          break;
        case "random-weighted":
          boardState.generateRandomWeightedBoard();
          break;
        case "maze-dfs":
          boardState.generateMazeDFSBoard();
          break;
      }
    });
  }

  generateDisplayBoard(size = this.gridCount) {
    const board = document.querySelector(".board");

    // Clear previous board
    board.innerHTML = "";

    for (let a = 0; a < 2 * size + 1; a++) {
      const col_div = document.createElement("div");
      col_div.dataset.col = `${a}`;
      col_div.style.width = "100%";
      col_div.style.height = `${this.unitSize}px`;

      for (let b = 0; b < size + 1; b++) {
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

  async generateRandomBoard() {
    this.resetBoard();
    const probability = 0.2;

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let row = 0; row < this.gridCount; row++) {
      for (let col = 0; col < this.gridCount * 2; col++) {
        if (Math.random() < probability) {
          this.setCellNode(row, col, "wall");
          await sleep(0.001);
        }
      }
    }
  }

  async generateRandomWeightedBoard() {
    this.resetBoard();
    const probability = 0.2;

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let row = 0; row < this.gridCount; row++) {
      for (let col = 0; col < this.gridCount * 2; col++) {
        let nodeType;

        if (Math.random() < 0.5) {
          nodeType = "wall";
        } else {
          nodeType = "weight";
        }

        if (Math.random() < probability) {
          this.setCellNode(row, col, nodeType);
          await sleep(0.001);
        }
      }
    }
  }

  isValid(row, col) {
    return (
      row >= 0 && row < this.gridCount && col >= 0 && col < this.gridCount * 2
    );
  }

  async generateMazeDFSBoard() {
    this.resetBoard();

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Start with all walls
    for (let row = 0; row < this.gridCount; row++) {
      for (let col = 0; col < this.gridCount * 2; col++) {
        this.setCellNode(row, col, "wall");
      }
    }

    const startRow = 20; // Math.floor(Math.random() * this.gridCount);
    const startCol = 20; //Math.floor(Math.random() * this.gridCount * 2);
    let stack = [[startRow, startCol]];
    let backtrackStack = [];
    while (stack.length != 0 || backtrackStack.length != 0) {
      await sleep(0.2);
      let currRow;
      let currCol;
      if (stack.length !== 0) [currRow, currCol] = stack.pop();
      else [currRow, currCol] = backtrackStack.pop();
      let randomIndex = 0;

      // while (randomIndex === null) {
      //   let temp = Math.floor(Math.random() * 4);
      //   let newRow = currRow + this.offsets[temp][0];
      //   let newCol = currCol + this.offsets[temp][1];
      //   if (this.isValid(newRow, newCol)) {
      //     if (this.internalBoard[newRow][newCol] === this.cellStates.WALL) {
      //       randomIndex = temp;
      //     }
      //   }
      // }
      for (let i = 0; i < 4; i++) {
        let newRow = currRow + this.offsets[i][0];
        let newCol = currCol + this.offsets[i][1];

        if (this.isValid(newRow, newCol)) {
          if (this.internalBoard[newRow][newCol] !== this.cellStates.EMPTY) {
            if (randomIndex === i) {
              this.setCellNode(newRow, newCol, "empty");
              stack.push([newRow, newCol]);
            }
          }
        } else {
          stack.push([currRow, currCol]);
          randomIndex = randomIndex + 1;
          if (randomIndex == 4) {
            randomIndex = 0;
          }
        }
      }
    }
  }

  setCellNode(row, col, nodeOption = null) {
    if (
      row < 0 ||
      row >= this.gridCount ||
      col < 0 ||
      col >= this.gridCount * 2
    )
      return;

    const nodeType = document.getElementById("node-types");
    const clickedCell = this.selectDisplayCell(row, col);
    let type = nodeType.value;
    if (nodeOption != null) {
      type = nodeOption;
    }

    this.unsetCellNode(row, col);

    switch (type) {
      case "empty":
        clickedCell.dataset.state = this.cellStates.EMPTY;
        clickedCell.className = "cell";
        this.internalBoard[row][col] = this.cellStates.EMPTY;
        break;
      case "start":
        const oldStart = document.querySelector(".start-node");
        if (oldStart) {
          oldStart.classList.remove("start-node");
          oldStart.dataset.state = this.cellStates.EMPTY;
        }
        this.startNode = [row, col];
        clickedCell.dataset.state = this.cellStates.START;
        clickedCell.classList.add("start-node");
        this.internalBoard[row][col] = this.cellStates.START;
        break;
      case "end":
        const oldEnd = document.querySelector(".end-node");
        if (oldEnd) {
          oldEnd.classList.remove("end-node");
          oldEnd.dataset.state = this.cellStates.EMPTY;
        }
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

  unsetCellNode(row, col) {
    if (
      row < 0 ||
      row >= this.gridCount ||
      col < 0 ||
      col >= this.gridCount * 2
    )
      return;

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
    this.resetting = true;

    try {
      this.internalBoard = Array.from({ length: this.gridCount }, () =>
        Array.from({ length: this.gridCount * 2 }, () => this.cellStates.EMPTY)
      );

      this.startNode = null;
      this.endNode = null;

      const cells = document.querySelectorAll(".cell");
      cells.forEach((cell) => {
        cell.dataset.state = this.cellStates.EMPTY;
        cell.classList.remove(
          "start-node",
          "end-node",
          "wall-node",
          "weight-node"
        );
      });
    } finally {
      this.resetting = false;
    }
  }

  resetSelects() {
    const algorithmsSelect = document.getElementById("algorithms");
    algorithmsSelect.selectedIndex = 0;

    const terrainsSelect = document.getElementById("terrains");
    terrainsSelect.selectedIndex = 0;

    const nodeTypesSelect = document.getElementById("node-types");
    nodeTypesSelect.selectedIndex = 0;
  }
}

export const boardState = new Board();
