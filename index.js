const gameBoard = (() => {
    let p1Turn = true;
    let totalTurns = 0;
    let gameContainer = document.getElementById("gameBoard");

    const movesTable = [[0,1,2],
                      [3,4,5],
                      [6,7,8],
                      [0,3,6],
                      [1,4,7],
                      [2,5,8],
                      [0,4,8],
                      [2,4,6]];

    const buildGameBoard = () => {
        for(let i = 0; i<9; i++) {
            let tile = gameTile();
            gameContainer.appendChild(tile);
        }
    }

    // Called in gameTile()'s event listener
    const checkWinCondition = () => {
        // loop through moves table
        let nodes = gameContainer.childNodes;
        console.log(nodes);
        for(let i = 1; i < movesTable.length; i++) {
            if(nodes[movesTable[i][0] + 1].textContent === "X" && nodes[movesTable[i][1] + 1].textContent === "X" && nodes[movesTable[i][2] + 1].textContent === "X") {
                // X Wins!
                alert("X wins!");
                prompt("Do you want to play again?");
            } else if(nodes[movesTable[i][0] + 1].textContent === "O" && nodes[movesTable[i][1] + 1].textContent === "O" && nodes[movesTable[i][2] + 1].textContent === "O") {
                // O Wins!
                alert("O wins!");
                prompt("Do you want to play again?");
            }
        }
    }

    const getTurn = () => {
        return p1Turn;
    } 
    
    const setTurn = (bool) => {
        p1Turn = bool;
    }

    const getTotalTurns = () => {
        return totalTurns;
    }

    const setTotalTurns = (turns) => {
        totalTurns = turns;
    }
    
    return { buildGameBoard,
             checkWinCondition,
             getTurn,
             setTurn,
             getTotalTurns,
             setTotalTurns }
})();

const gameTile = () => {
    let tile = document.createElement("div");
    tile.className = "game-tile";

    tile.addEventListener("click", (e) => {
        if(e.target.textContent !== "") {
            gameBoard.checkWinCondition();
            return;
        } 
        if(gameBoard.getTotalTurns() === 9) {
            gameBoard.checkWinCondition();
            console.log("Game over");
        }
        if(gameBoard.getTurn() === true) {
            e.target.textContent = "O";
            gameBoard.checkWinCondition();
            gameBoard.setTurn(false);
        } else {
            e.target.textContent = "X";
            gameBoard.checkWinCondition();
            gameBoard.setTurn(true)
        }
    })

    return tile;
}



window.onload = () => {
    console.log("Shits started");
    gameBoard.buildGameBoard();
}



