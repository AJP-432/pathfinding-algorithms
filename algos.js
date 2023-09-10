let foundPath = null;
let allExplored = false;

function bfs(startNode, endNode, internalBoard) {
    const displayBoard = document.querySelector(".board");
    let visited = new Array(20*40);

    while (!foundPath && !allExplored) {
        
    }

    function addToVisited(row, col) {
        const visitedCell = selectDisplayCell(row, col);
        visitedCell.classList.add("visited-node");
        visitedCell.
        visited.push([row, col]);
    }
}
