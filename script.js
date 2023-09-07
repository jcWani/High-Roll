"use strict";

// ELEMENTS
const score1El = document.querySelector(".score--1");
const score2El = document.querySelector(".score--2");
const currentScore1El = document.querySelector(".current--1");
const currentScore2El = document.querySelector(".current--2");
const player1El = document.querySelector(".player--1");
const player2El = document.querySelector(".player--2");

const headerPrimaryEl = document.querySelector(".header-primary");
const imgDiceEl = document.querySelector(".dice-img");
const upperBoxEl = document.querySelector(".upper-box");

// BUTTONS
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

// VARIABLES
let scores, currentScore, activePlayer, isPlaying;

// FUNCTION FOR STARTING CONDITIONS
const initialize = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 1;
  isPlaying = true;
  score1El.textContent = 0;
  score2El.textContent = 0;
  currentScore1El.textContent = 0;
  currentScore2El.textContent = 0;
  headerPrimaryEl.textContent = "Roll the dice";
  imgDiceEl.classList.add("hidden");
  player1El.classList.add("player--active");
  player2El.classList.remove("player--active");
  player1El.classList.remove("player--winner");
  player2El.classList.remove("player--winner");
  player1El.classList.remove("player--lose");
  player2El.classList.remove("player--lose");
  player1El.classList.remove("game--finish");
  player2El.classList.remove("game--finish");
};

// INVOKE THE FUNCTION FOR STARTING CONDITIONS
initialize();

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`.current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1El.classList.toggle("player--active");
  player2El.classList.toggle("player--active");
  headerPrimaryEl.textContent = `Player ${activePlayer} is rolling...`;
};

btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    // Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    imgDiceEl.classList.remove("hidden");
    imgDiceEl.src = `img/dice-${dice}.png`;

    // When the rolled dice is not equal to one
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`.current--${activePlayer}`).textContent = currentScore;
      headerPrimaryEl.textContent = `Player ${activePlayer} is rolling...`;
    } else {
      // Switch Player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (isPlaying) {
    // Add active player current score to total score
    scores[activePlayer - 1] += currentScore;
    document.querySelector(`.score--${activePlayer}`).textContent = scores[activePlayer - 1];

    // If active Player score is greater than or equal to 100
    if (scores[activePlayer - 1] >= 100) {
      headerPrimaryEl.textContent = `Player ${activePlayer} wins!`;
      document.querySelector(`.current--${activePlayer}`).textContent = 0;
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      document
        .querySelector(`.player--${(activePlayer = activePlayer === 1 ? 2 : 1)}`)
        .classList.add("player--lose");
      player1El.classList.add("game--finish");
      player2El.classList.add("game--finish");
      imgDiceEl.classList.add("hidden");
      upperBoxEl.style.gap = "0rem";
      upperBoxEl.style.marginBottom = "0rem";
      isPlaying = false;
    } else {
      // Switch Player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  initialize();
  upperBoxEl.style.gap = "13rem";
  upperBoxEl.style.marginBottom = "2.4rem";
});
