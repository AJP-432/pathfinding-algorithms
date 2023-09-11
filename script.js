import { boardState } from "/board.js";
import { bfs, dfs, dijkstra, test } from "/algos.js";

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
      break;
    // case "astar":
    //   astar();
    //   break;
    default:
      console.error("Unknown algorithm selected");
  }
}

function main() {
  test();
  boardState.generateBoard();
  console.log(boardState.internalBoard);

  const navigateButton = document.getElementById("navigate");
  navigateButton.addEventListener("click", (event) => {
    navigate();
  });
}

main();
