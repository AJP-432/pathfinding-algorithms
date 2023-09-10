import { generateDisplayBoard, generateInternalBoard, resetBoard } from "./utils";

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetBoard());

function main() {
  generateDisplayBoard();
  internalBoard = generateInternalBoard();
}

main();
