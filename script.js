let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

function makeMove(index) {
    if (board[index] === '') {
        // Find and remove the oldest X or O if there are already 3 Xs or Os
        let countX = board.filter(cell => cell === 'X').length;
        let countO = board.filter(cell => cell === 'O').length;
        if ((currentPlayer === 'X' && countX >= 3) || (currentPlayer === 'O' && countO >= 3)) {
            removeOldest(currentPlayer);
        }

        board[index] = currentPlayer;
        let cellElement = document.getElementById('board').children[index];
        cellElement.innerText = currentPlayer;
        cellElement.style.fontSize = `${Math.max(countX, countO) + 1}em`; // Set font size based on the number of Xs or Os
        if (checkWinner(currentPlayer)) {
            document.getElementById('status').innerText = currentPlayer + ' wins!';
            return;
        }
        if (board.every(cell => cell !== '')) {
            document.getElementById('status').innerText = 'Draw!';
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').innerText = "Player " + currentPlayer + "'s turn";
    }
}

function removeOldest(player) {
    // Find the index of the oldest X or O and remove it
    for (let i = 0; i < board.length; i++) {
        if (board[i] === player) {
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
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    document.getElementById('status').innerText = "Player " + currentPlayer + "'s turn";
}
