/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//
let scores, currentScore, activePlayer, gamePlaying, finalScore;
newGame();
gamePlaying = true;

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    finalScore = document.querySelector(".final-score").value;
    if (finalScore) {
      let dice1 = Math.floor(Math.random() * 6) + 1;
      let dice2 = Math.floor(Math.random() * 6) + 1;
      document.getElementById("dice-1").style.display = "block";
      document.getElementById("dice-2").style.display = "block";
      document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
      document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

      if (dice1 === 1 || dice2 === 1 || (dice1 === 6 && dice2 === 6)) {
        nextPlayer();
      } else {
        currentScore += dice1 + dice2;
        document.getElementById(
          "current-" + activePlayer
        ).innerHTML = currentScore;
      }
    } else {
      alert("Set the 'Final Score' first!");
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById("score-" + activePlayer).innerHTML =
      scores[activePlayer];

    if (scores[activePlayer] >= finalScore) {
      document.getElementById("name-" + activePlayer).textContent = "WINNER";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  currentScore = 0;
  document.getElementById("current-" + activePlayer).innerHTML = currentScore;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

document.querySelector(".btn-new").addEventListener("click", newGame);

function newGame() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  document.getElementById("score-0").innerHTML = scores[0];
  document.getElementById("score-1").innerHTML = scores[1];
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.add("active");
  gamePlaying = true;
}
