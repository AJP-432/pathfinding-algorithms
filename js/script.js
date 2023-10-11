import { boardState } from "/js/board.js";
import { bfs, dfs, dijkstra, astar } from "/js/algos.js";

function navigate() {
  const selectedAlgorithm = document.getElementById("algorithms").value;

  switch (selectedAlgorithm) {
    case "bfs":
      bfs();
      break;
    case "dfs":
      dfs();
      break;
    case "dijkstra":
      dijkstra();
      console.log(boardState.internalBoard);
      break;
    case "astar":
      astar();
      break;
    default:
      console.error("Unknown algorithm selected");
  }
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
