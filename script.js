import { boardState } from "/board.js";
import { bfs } from "/algos.js";

function navigate() {
  bfs();
}

function main() {
  boardState.generateBoard();
  console.log(boardState.internalBoard);

  const navigateButton = document.getElementById("navigate");
  navigateButton.addEventListener("click", (event) => {
    navigate();
  });
}

main();
