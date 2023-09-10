class Board {
    constructor() {
        this.unitSize = 700/20;
        this.gridCount = 20;
        this.internalBoard = null; 
        this.displayBoard = document.querySelector(".board");
        this.cellStates = {
            NULL: 1,
            START: 2,
            END: 3,
            WALL: 4,
            WEIGHT: 5,
            PATH: 6,
            SEARCHED: 7,
        };
        this.startNode = null;
        this.endNode = null;
    }

    selectDisplayCell(row, col) {
        const selectedCell = document.querySelector(`div[data-row='${row}'][data-col='${col}']`);
        return selectedCell;
    }

    generateBoard(size = this.gridCount) {
        this.generateDisplayBoard(size);
        this.generateInternalBoard(size);
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
            row_div.dataset.state = this.cellStates.NULL;
      
            row_div.addEventListener("mousedown", this.setCellNode);
            row_div.addEventListener("dragover", this.setCellNode);
            row_div.addEventListener("dblclick", this.unsetCellNode);
      
            col_div.appendChild(row_div);
          }
          
          board.appendChild(col_div);
        }
    }

    generateInternalBoard(size = this.gridCount) {
        this.internalBoard = Array.from({ length: size * 2 }, () => Array.from({ length: size }, () => this.cellStates.NULL));
    }
    
    setCellNode(event) {
        const nodeType = document.getElementById("node-types");
        const row = parseInt(event.target.dataset.row, 10);
        const col = parseInt(event.target.dataset.col, 10);
        const clickedCell = event.target;
      
        if (clickedCell.dataset.state == this.cellStates.NULL) {
          switch (nodeType.value) {
            case "start":
              const oldStart = document.querySelector(".start-node");
              if (oldStart) oldStart.classList.remove("start-node");
              START_NODE = [row, col];
              clickedCell.dataset.state = this.cellStates.START;
              clickedCell.classList.add("start-node");
              internalBoard[row][col] = this.cellStates.START;
              break;
            case "end":
              const oldEnd = document.querySelector(".end-node");
              if (oldEnd) oldEnd.classList.remove("end-node");
              END_NODE = [row, col];
              clickedCell.dataset.state = this.cellStates.END;
              clickedCell.classList.add("end-node");
              internalBoard[row][col] = this.cellStates.END;
              break;
            case "wall":
              clickedCell.dataset.state = this.cellStates.WALL;
              clickedCell.classList.add("wall-node");
              internalBoard[row][col] = this.cellStates.WALL;
              break;
            case "weight":
              clickedCell.dataset.state = this.cellStates.WEIGHT;
              clickedCell.classList.add("weight-node");
              internalBoard[row][col] = this.cellStates.WEIGHT;
              break;
          }
        }
    }

    unsetCellNode(event) {
        const row = parseInt(event.target.dataset.row, 10);
        const col = parseInt(event.target.dataset.col, 10);
        const clickedCell = event.target;
      
        if (clickedCell.dataset.state != this.cellStates.NULL) {
          internalBoard[row][col] = this.cellStates.NULL;
          switch (clickedCell.dataset.state) {
            case this.cellStates.START:
              START_NODE = null;
              clickedCell.classList.remove("start-node");
              break;
            case this.cellStates.END:
              END_NODE = null;
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
      
        clickedCell.dataset.state = this.cellStates.NULL;
    }

    resetBoard() {
        return function () {
          START_NODE = null;
          END_NODE = null;
          internalBoard = null;
      
          generateDisplayBoard(this.gridCount);
          internalBoard = generateInternalBoard(this.gridCount);
        };
    }
}

export const boardState = new Board();