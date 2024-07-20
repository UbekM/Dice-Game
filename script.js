/** @format */

"use strict";

// Getting Elements
// Get players, current and score elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

// Get dice and button elements
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Declare other Variables for use later
let score = 0,
  currentScore = 0,
  activePlayer = current0El,
  playing = true,
  dice = 0;

let scores = [0, 0];

// When Roll Dice is Clicked
btnRoll.addEventListener("click", function () {
  if (playing) {
    // Get a random dice from 1-6
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `./image/dice-${dice}.png`;

    // Check if 1 is rolled
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      const currentElement = activePlayer;
      currentElement.textContent = currentScore;
    } else {
      // reset score to 1
      currentScore = 0;
      activePlayer.textContent = currentScore;

      // switch to next player
      switchPlayer();
    }
  }
});

let currentPlayer = 0;

const switchPlayer = function () {
  currentPlayer = (currentPlayer + 1) % 2;
  currentScore = 0;
  activePlayer = currentPlayer === 0 ? current0El : current1El;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// When button hold is clicked
btnHold.addEventListener("click", function () {
  if (playing) {
    let addScore = (scores[currentPlayer] += currentScore);
    if (currentPlayer === 0) {
      score0El.textContent = addScore;
      currentScore = 0;
      current0El.textContent = currentScore;
    } else {
      score1El.textContent = addScore;
      currentScore = 0;
      current1El.textContent = currentScore;
    }

    switchPlayer();
    if (addScore >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      const winner = document.querySelector(
        `.player--${(currentPlayer + 1) % 2}`
      );
      winner.classList.add("player--winner");
      winner.classList.remove("player--active");
    }
  }
});

// Define function to be used for game reset
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = current0El;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

// Action when reset button is clicked
btnNew.addEventListener("click", init);
