var welcome=document.getElementById('Welcome');
var welcome_html=welcome.innerHTML;
var symbol=document.getElementById('symbol');


var button = [];//for setting button to an array
var currentPlayer = 'X';//setting first player to x
var play1_score = document.getElementById('play1');//player 2 score
var play2_score = document.getElementById('play2');//player 1 score
var winningButtons = [];//winning button array
var totalMoves = 0; // Variable to keep track of total moves

for (var i = 1; i <= 9; i++) {
    button.push(document.getElementById('button' + i));
    button[i - 1].addEventListener('click', handleClick);
    button[i - 1].addEventListener('click', playClickSound);
}

var i1 = 1;
var i2 = 1;

function handleClick(event) {
    playClickSound();
    var button = event.target;
    if (button.textContent === '') {
        button.textContent = currentPlayer;
        totalMoves++; 

        if (currentPlayer === 'X') {
            currentPlayer = 'O';
        } else {
            currentPlayer = 'X';
        }
    }
    button.style.color = 'white';
    button.style.fontSize = '5rem';
    button.style.textAlign = 'center';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';

    if (checkWinCondition('X')) {
        console.log('Player 1 wins!');
        play1_score.textContent = i1;
        colorWinningButtons(winningButtons);
        welcome.textContent='Player 1 wins 🏳️';
        welcome.style.color='red';
        symbol.textContent='Click the Reset Button to play again';
        i1 = i1 + 1;
    } else if (checkWinCondition('O')) {
        console.log('Player 2 wins!');
        play2_score.textContent = i2;
        colorWinningButtons(winningButtons);
        welcome.textContent='Player 2 wins 🏳️';
        welcome.style.color='rgb(5, 250, 5)';
        symbol.textContent='Click the Reset Button to play again';
        i2 = i2 + 1;
    } else if (totalMoves === 9) { 
        welcome.textContent='🏳️It\'s a draw!🏳️';
        welcome.style.color='white';
        symbol.textContent='Click the Reset Button to play again';
    }
}

function colorWinningButtons(winningButtons) {
    for (var i = 0; i < winningButtons.length; i++) {
        winningButtons[i].style.color = 'yellow';
    }
}

function checkWinCondition(mark) {
    //rows
    
    for (var i = 0; i < 3; i++) {
        if (button[i * 3].textContent === mark &&
            button[i * 3].textContent === button[i * 3 + 1].textContent &&
            button[i * 3].textContent === button[i * 3 + 2].textContent) {
            winningButtons.push(button[i * 3], button[i * 3 + 1], button[i * 3 + 2]);
            return true;
        }
    }

    //columns
    for (var i = 0; i < 3; i++) {
        if (button[i].textContent === mark &&
            button[i].textContent === button[i + 3].textContent &&
            button[i].textContent === button[i + 6].textContent) {
            winningButtons.push(button[i], button[i + 3], button[i + 6]);
            return true;
        }
    }

    //diagonals
    if (button[0].textContent === mark &&
        button[0].textContent === button[4].textContent &&
        button[0].textContent === button[8].textContent) {
        winningButtons.push(button[0], button[4], button[8]);
        return true;
    }
    if (button[2].textContent === mark &&
        button[2].textContent === button[4].textContent &&
        button[2].textContent === button[6].textContent) {
        winningButtons.push(button[2], button[4], button[6]);

        return true;
    }

    return false;
}

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', reset);

function reset() {
    playReset();
    // Reseting all buttons text content
    for (var i = 0; i < button.length; i++) {
        button[i].textContent = '';
    }
    
    welcome.innerHTML=welcome_html;
    welcome.style.color='white';
    symbol.textContent='First Player starts as Player X And Second Player as Player O';
    currentPlayer = 'X'; // Reseting current player to X
    totalMoves = 0; // Reseting total moves
    winningButtons = []; // Reseting winning array

    // Reseting text color
    for (var i = 0; i < button.length; i++) {
        button[i].style.color = ''; 
    }

}

function playClickSound() {
    var audio = new Audio('./assets/music.mp3');
    audio.play();
}


function playReset() {
    var audio = new Audio('./assets/reset.mp3');
    audio.play();
}



