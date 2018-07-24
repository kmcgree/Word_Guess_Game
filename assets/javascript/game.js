
//Define Variables. Create an array of words. Pick a random word from the array to be guessed
var wordChoices = ["spider-man", "iron man", "thor", "captain america", "hulk", "black widow", "black panther", "ant-man", "wasp", "nick fury"];
var word;
var allowedGuesses;
var correctGuesses;
var wrongGuesses;
var Wins = 0;

var winDisplay = document.getElementById("wins")
var wordElement = document.getElementById("word");
var letterCountElement = document.getElementById("guessesremaining");
var lettersGuessed = document.getElementById("lettersguessed");
console.log(wordChoices)
function initializeGame() {
    //Randomly choose word from choices
    word = wordChoices[Math.floor(Math.random() * wordChoices.length)];
    console.log(word)
    allowedGuesses = 10;
    wrongGuesses = [];
    correctGuesses = [];

    //for correct guesses.  
    for (i = 0; i < word.length; i++) {
        if (word[i] === "-") {
            correctGuesses.push("-");
        }if (word[i] === " ") {
            correctGuesses.push(" ");
        }else {
            correctGuesses.push("_");
        }
    }
    winDisplay.innerHTML = "Wins: " + Wins;
    wordElement.innerHTML = correctGuesses.join(" ");
    letterCountElement.innerHTML = "Guesses Left: " + allowedGuesses;
}

function updateGuesses(letter) {
    letterCountElement.innerHTML = "Guesses Left: " + allowedGuesses;

    if (word.indexOf(letter) === -1) {
        wrongGuesses.push(letter);
        allowedGuesses--;
        lettersGuessed.innerHTML ="Letters Guessed: " + wrongGuesses.join(", ");
    }else {
        for (i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                correctGuesses[i] = letter;
            }
        }

        wordElement.innerHTML = correctGuesses.join(" ");
        console.log(correctGuesses)
    }
}
//Check for win or loss
function checkWin() {
    if (correctGuesses.indexOf('_') === -1) {
        alert("You Won!");
        Wins += 1;
        initializeGame();
    } else if (allowedGuesses === 0) {
        alert("You Lost!");
        initializeGame();
    }
}

//Use key events to listen for letters typed by player
document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    updateGuesses(letterGuessed);
    checkWin();
};

//Start the game
initializeGame()