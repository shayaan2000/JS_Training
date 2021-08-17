"use strict";

// Selecting html elements
//selecting buttons
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//selectin dice
const diceEl = document.querySelector(".dice");

//selecting scores
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1"); //getElementById
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

//selecting players
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//state variables
let scores, currentScore, activePlayer, playing;

//initializations
const initializeNewGame = function () {
  //state variables
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];

  //on UI
  diceEl.classList.add("hidden");
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};

initializeNewGame();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//rolling a dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //add dice to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }

    //switch player
    else {
      switchPlayer();
    }
  }
});

//holding a score
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

//new game reset
btnNew.addEventListener("click", initializeNewGame);
