let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let olderXOs = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let gameEnd = false;
document.getElementById('status').innerText = "Start the game with player " + currentPlayer + "'s turn";

function makeMove(index) {
    if (!gameEnd && board[index] === '') {
        board[index] = currentPlayer; // set currentPlayer in the index cell
        makeOlder(currentPlayer);
        // Find and remove the oldest X or O if there are already 3 Xs or Os
        let countX = board.filter(cell => cell === 'X').length;
        let countO = board.filter(cell => cell === 'O').length;
        if ((currentPlayer === 'X' && countX > 3) || (currentPlayer === 'O' && countO > 3)) {
            removeOldest(currentPlayer);
        }

        // resize X/Os
        for (let i = 0; i < board.length; i++) {
            let cellElement = document.getElementById('board').children[i];
            cellElement.innerText = board[i];
            cellElement.style.fontSize = `${5 - olderXOs[i] * 0.8}em`;
            if (board[i] === 'X') { // change color denpending on X/O
                if (olderXOs[i] === 3) {
                    cellElement.style.color = `#a4c7da`; // light color
                } else {
                    cellElement.style.color = `#5eaad3`;
                }
            } else if (board[i] === 'O') {
                if (olderXOs[i] === 3) {
                    cellElement.style.color = `#d5a9e6`; // light color
                } else {
                    cellElement.style.color = `#cc7eeb`;
                }
            }
        }

        // judge winner
        if (checkWinner(currentPlayer)) {
            document.getElementById('status').innerText = currentPlayer + ' wins!' + `\n click "Restart" to restart the game`;
            gameEnd = true;
            return;
        }
        if (board.every(cell => cell !== '')) {
            document.getElementById('status').innerText = 'Draw!' + `\n click "Restart" to restart the game`;
            gameEnd = true;
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').innerText = "Player " + currentPlayer + "'s turn";
    }
}

function makeOlder(player) {
    // make X or O older
    for (let i = 0; i < olderXOs.length; i++) {
        if (board[i] === player) {
            olderXOs[i] = olderXOs[i] + 1;
        }
    }
}

function removeOldest(player) {
    // Find the index of the oldest X or O and remove it
    for (let i = 0; i < olderXOs.length; i++) {
        if ((board[i] === player) && (olderXOs[i] > 3)) {
            olderXOs[i] = 0;
            board[i] = '';
            let cellElement = document.getElementById('board').children[i];
            cellElement.innerText = '';
            cellElement.style.fontSize = ''; // Reset font size
            break;
        }
    }
}

function checkWinner(player) {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winConditions.some(condition => {
        return condition.every(index => board[index] === player);
    });
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    olderXOs = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    gameEnd = false;
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    document.getElementById('status').innerText = "Start the game with player " + currentPlayer + "'s turn";
}
