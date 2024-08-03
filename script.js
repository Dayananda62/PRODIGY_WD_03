const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const turnIndicator = document.getElementById('turnIndicator');
const resetButton = document.getElementById('resetButton');
const modeSelection = document.querySelector('.mode-selection');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let gameMode = 'human'; // Default to play with human

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        message.textContent = `Player ${currentPlayer} wins!`;
        message.classList.remove('hidden');
        isGameActive = false;
        resetButton.classList.remove('hidden');
        turnIndicator.classList.add('hidden');
        return;
    }

    if (board.every(cell => cell !== '')) {
        message.textContent = `It's a tie!`;
        message.classList.remove('hidden');
        resetButton.classList.remove('hidden');
        turnIndicator.classList.add('hidden');
        return;
    }

    if (gameMode === 'human') {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch turns between players
        turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
    } else {
        setTimeout(makeAIMove, 500); // Delay AI move slightly for better user experience
    }
}

function makeAIMove() {
    let emptyCells = [...cells].filter(cell => cell.textContent === '');
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let cell = emptyCells[randomIndex];
    let index = cell.getAttribute('data-index');

    board[index] = 'O'; // AI always places 'O'
    cell.textContent = 'O';

    if (checkWin('O')) {
        message.textContent = `Player O wins!`;
        message.classList.remove('hidden');
        isGameActive = false;
        resetButton.classList.remove('hidden');
        turnIndicator.classList.add('hidden');
        return;
    }

    if (board.every(cell => cell !== '')) {
        message.textContent = `It's a tie!`;
        message.classList.remove('hidden');
        resetButton.classList.remove('hidden');
        turnIndicator.classList.add('hidden');
        return;
    }

    currentPlayer = 'X'; // Switch back to player X after AI move
    turnIndicator.textContent = `Player X's turn`;
}

function checkWin(player) {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === player);
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    message.classList.add('hidden');
    message.textContent = '';
    resetButton.classList.add('hidden');
    turnIndicator.textContent = `Player X's turn`;
    turnIndicator.classList.remove('hidden');
}

function setupGameMode() {
    modeSelection.addEventListener('change', () => {
        gameMode = document.querySelector('input[name="gameMode"]:checked').value;
        resetGame();
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
setupGameMode(); // Setup game mode selection
