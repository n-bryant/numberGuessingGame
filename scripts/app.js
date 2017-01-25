// Your code must include at least two functions. -> collectGuess(), doGuessGame(), gameReset()
console.clear();
"use strict";

const resetHandler = document.querySelector('.play-again');
const guessForm = document.querySelector('.guess-form');
const guessResponse = document.querySelector('.guess-response');
const sillyResponse = document.querySelector('.silly-response');
const dupGuessResponse = document.querySelector('.duplicate-guess');
const closeGuessResponse = document.querySelector('.close-guess');
let gifResponse = document.querySelector('.gif-response');

// Inclusive random integer: Math.floor(Math.random() * (max - min + 1) + min.
let goalNum = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
console.log(goalNum);

// Initializing of guess related variables.
let failedAttempts = 0;
let guesses = [];
let guessCount = 0;
let currentGuess;
let gameOver = false;

let gifSrcs = ["https://media.giphy.com/media/bXQWsZ9qkP5MA/giphy.gif", "http://www.reactiongifs.com/wp-content/uploads/2012/12/14kwrhk.gif", "http://gif-finder.com/wp-content/uploads/2015/12/Joaquin-Phoenix-Thumbs-Down.gif", "http://gif-finder.com/wp-content/uploads/2015/03/Clint-Eastwood-Mad.gif", "http://i.imgur.com/cLumOK9.gif"];
let gifAlts = ["Make My Day", "Kobe Looking Up", "Emperor Thumbs Down", "Angry Clint Eastwood", "Cowboy Laughing"];
gifResponse.src = gifSrcs[0];
gifResponse.alt = gifAlts[0];

// Collect guess and store it in the guesses array.
function collectGuess() {
  const guess = document.querySelector('#user-guess').value;
  guesses.push(guess);
  currentGuess = guesses[guessCount];

  // Calls doGuessGame to evaluate guess.
  doGuessGame();
}

// Evaluate the user's guess against game mechanics.
function doGuessGame() {
  let msg = "Your guess of " + currentGuess;
  const lastGuess = guesses[guessCount - 1];

  // If your guess is lower than the computer's number, it needs to tell you that your guess was too low.
  if (currentGuess < goalNum && failedAttempts < 5) {
    failedAttempts++;
    msg += " was too low.  Guess higher!";
    guessResponse.innerHTML = msg;

    gifResponse.src = gifSrcs[1];
    gifResponse.alt = gifAlts[1];

    if (currentGuess < lastGuess && lastGuess < goalNum) {
      sillyResponse.innerHTML = "Why would you guess lower?";
    } else {
      sillyResponse.innerHTML = "";
    }
  }
  // If your guess is higher than the computer's number, it needs to tell you that your guess was too high.
  else if (currentGuess > goalNum && failedAttempts < 5) {
    failedAttempts++;
    msg += " was too high.  Guess lower!";
    guessResponse.innerHTML = msg;

    gifResponse.src = gifSrcs[2];
    gifResponse.alt = gifAlts[2];

    if (currentGuess > lastGuess && lastGuess > goalNum) {
      sillyResponse.innerHTML = "Why would you guess higher?";
    } else {
      sillyResponse.innerHTML = "";
    }
  }
  // If your guess is correct, the program needs to tell you that you win and the game is over.
  else if (currentGuess === goalNum) {
    gameOver = true;
    msg += " was correct!  You win!!!";
    guessResponse.innerHTML = msg;
    sillyResponse.innerHTML = "";

    gifResponse.src = gifSrcs[3];
    gifResponse.alt = gifAlts[3];
  }
  // After 5 incorrect guesses, the program needs to tell you that you lose and the game is over.
  if (failedAttempts === 5) {
    gameOver = true;
    msg = "You have made too many incorrect guesses.  The number was " + goalNum + ".  You lose!!!";
    guessResponse.innerHTML = msg;

    gifResponse.src = gifSrcs[4];
    gifResponse.alt = gifAlts[4];
  }
  // If you guess the same number twice, the program needs to ask you if you're feeling all right (or something similarly sarcastic).
  if (currentGuess == lastGuess && gameOver == false) {
    dupGuessResponse.innerHTML = "Your current guess is the same as your last guess. Are you feeling ok?";
  } else {
    dupGuessResponse.innerHTML = "";
  }
  // Tell the user if their guess is close
  if ((goalNum - currentGuess == 1 || goalNum + 1 == currentGuess) && gameOver == false) {
    closeGuessResponse.innerHTML = "You were pretty close that time!";
  } else {
    closeGuessResponse.innerHTML = "";
  }

  // Increment guess count.
  guessCount++;

  // Output the number of turns user took.
  if (guessCount === 1) {
    document.querySelector('.guess-count').innerHTML = "You have made " + guessCount + " guess.";
  } else {
    document.querySelector('.guess-count').innerHTML = "You have made " + guessCount + " guesses.";
  }
}

// Resets game parameters
function gameReset() {
  gameOver = false;
  goalNum = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  failedAttempts = 0;
  guesses = [];
  guessCount = 0;
  currentGuess = null;
  console.log(goalNum);

  document.querySelector('.guess-count').innerHTML = "";
  guessResponse.innerHTML = "";
  sillyResponse.innerHTML = "";
  dupGuessResponse.innerHTML = "";
  closeGuessResponse.innerHTML = "";

  gifResponse.src = gifSrcs[0];
  gifResponse.alt = gifAlts[0];
}

/*
Event Handlers
*/
guessForm.addEventListener('submit', () => {
  // Prevents default event of specified listener.
  event.preventDefault();

  if (gameOver == false) {
    // Stores the user guess on form submit.
    collectGuess();
  } else {
    gameReset();
  }

  guessForm.reset();
});

resetHandler.addEventListener('click', () => {
  gameReset();
});
