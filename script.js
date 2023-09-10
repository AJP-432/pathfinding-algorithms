import { boardState } from "/board.js";

function main() {
  boardState.generateBoard();
  console.log(boardState.internalBoard);
}

main();
