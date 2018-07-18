const prompt = require('prompt-sync')();

const player1 = 'X';
const player2 = 'Y';
let currentPlayer = 'X';
let pickRow = '';
let pickCol = '';
let matrix = [[" "," "," "],[" "," "," "],[" "," "," "]];
let steps = 0;

const displayBoard = () => {
    console.log('    1   2   3');
    console.log('----------------');
    console.log(`1 | ${matrix[0][0]} | ${matrix[0][1]}  | ${matrix[0][2]} |`);
    console.log(`2 | ${matrix[1][0]} | ${matrix[1][1]}  | ${matrix[1][2]} |`);
    console.log(`3 | ${matrix[2][0]} | ${matrix[2][1]}  | ${matrix[2][2]} |`);
    console.log('----------------');
};

const pickPosition = () => {
    pickRow = prompt('pick a row ');
    pickCol = prompt('pick a column ');
    if (matrix[pickRow - 1][pickCol - 1] !== " ") {
        console.log('invalid pick, pick again');
        pickPosition();
    }
    matrix[pickRow - 1][pickCol - 1] = currentPlayer;
    steps++;
    displayBoard();
    let win = checkWin();
    if (win) {
        console.log(`${currentPlayer} wins!!!`);
    }
    if (steps === 9) {
        console.log('It is a Tie, please restart the game!');
        let restart = prompt('want to restart ? yes or no');
        if (restart === 'yes') {
            startGame();
        }
    } else {
        currentPlayer = currentPlayer === 'X' ? "Y" : "X";
        pickPosition();
    }
    
};

const checkWin = (player) => {
    //check row
    for (let r = 0; r < 3; r ++) {
        if (matrix[r].reduce((acc, cur) => {
            return acc && (cur === player);
        }, true)) {
            return true;
        }
    }
    //check col
    for (let c = 0; c < 3; c ++) {
        let count = 0;
        for (let r = 0; r < 3; r++) {
            if (matrix[r][c] === player) {
                count++;
            }
        }
        if (count === 3) {
            return true;
        }
    }
    //check diagnol
    if (matrix[0][0] + matrix[1][1] + matrix[2][2] === 3) {
        return true;
    }
    if (matrix[2][0] + matrix[1][1] + matrix[0][2] === 3) {
        return true;
    }
    return false;
};

const startGame = () => {
    matrix = [[" "," "," "],[" "," "," "],[" "," "," "]];
    currentPlayer = 'X';
    displayBoard();
    console.log("currentPlayer ", currentPlayer);
    pickPosition();
};

startGame();
