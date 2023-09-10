import { boardState } from "/board.js";

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", boardState.resetBoard());

function main() {
  boardState.generateBoard();
}

main();
