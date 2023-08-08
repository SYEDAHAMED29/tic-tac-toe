const newGameCpu = document.getElementById("newGame-cpu");
const newGamePlayer = document.getElementById("newGame-player");
const newGame = document.getElementById("new-game");
const startGame = document.getElementById("start-game");
const icons = document.querySelectorAll("#icons");
const quitBtn = document.getElementById("quit");
const nextRoundBtn = document.getElementById("next-round");
const tiequitBtn = document.getElementById("tie-quit");
const tienextRoundBtn = document.getElementById("tie-next-round");
const modal = document.getElementById("game-result");
const restartModal = document.getElementById("restart-modal");
const winnerIcon = document.getElementById("winner-icon");
const winnerHeading = document.getElementById("winner-heading");
const xPlayer = document.getElementById("x-player");
const oPlayer = document.getElementById("o-player");
const xIcon = document.querySelector(".x-icon");
const oIcon = document.querySelector(".o-icon");
const allSquares = document.querySelectorAll("#square");
const playerTurn = document.getElementById("img-turn");
const xWins = document.getElementById("x-wins");
const oWins = document.getElementById("o-wins");
const tieGames = document.getElementById("tie-game-count");
const restart = document.getElementById("restart");
const cancelBtn = document.getElementById("cancel");
const restartBtn = document.querySelector(".restart-btn");
const tieModal = document.getElementById("tie-modal");
const theWinnerIs = document.querySelector(".winner-content");
const body = document.body;
let cpuPlayer = "X";
let xWinCount = 0;
let oWinCount = 0;
let tieCount = 0;
var currentState = true;
let currentPlayer = "X";

const winningPatterns = [
   [0, 1, 2], // Top row
   [3, 4, 5], // Middle row
   [6, 7, 8], // Bottom row
   [0, 3, 6], // Left column
   [1, 4, 7], // Middle column
   [2, 5, 8], // Right column
   [0, 4, 8], // Diagonal from top-left to bottom-right
   [2, 4, 6], // Diagonal from top-right to bottom-left
];
let squareState = new Array(9).fill("");

quitBtn.addEventListener("click", () => {
   newGame.style.display = "block";
   startGame.style.display = "none";
   modal.style.display = "none";
   reload();
});

nextRoundBtn.addEventListener("click", () => {
   newGame.style.display = "none";
   startGame.style.display = "block";
   modal.style.display = "none";
   reload();
});

tiequitBtn.addEventListener("click", () => {
   newGame.style.display = "block";
   startGame.style.display = "none";
   modal.style.display = "none";
   tieModal.style.display = "none";
   reload();
});

tienextRoundBtn.addEventListener("click", () => {
   newGame.style.display = "none";
   startGame.style.display = "block";
   modal.style.display = "none";
   tieModal.style.display = "none";
   reload();
});

icons.forEach((icon) => {
   icon.addEventListener("click", () => {
      icons.forEach((icn) => icn.classList.toggle("icon-background-color", icn === icon));
   });
});

function winnerBackground(pattern) {
   const [x, y, z] = pattern;
   if (currentPlayer == "X") {
      allSquares[x].style.backgroundColor = "#65e9e4";
      allSquares[y].style.backgroundColor = "#65e9e4";
      allSquares[z].style.backgroundColor = "#65e9e4";
   } else {
      allSquares[x].style.backgroundColor = "#ffc860";
      allSquares[y].style.backgroundColor = "#ffc860";
      allSquares[z].style.backgroundColor = "#ffc860";
   }
}

function checkWin() {
   winningPatterns.forEach((pattern) => {
      let [a, b, c] = pattern;

      if (
         squareState[a] !== "" &&
         squareState[a] == squareState[b] &&
         squareState[b] == squareState[c]
      ) {
         winnerBackground(pattern);
         currentPlayer == "X" ? console.log("x wins") : console.log("o wins");
         if (currentPlayer == "X") {
            winnerIcon.setAttribute("src", "./assets/icon-x.svg");
            winnerHeading.style.color = "#31c3bd";
            xWinCount++;
            xWins.textContent = xWinCount;
            modal.style.display = "block";
         } else {
            winnerIcon.setAttribute("src", "./assets/icon-o.svg");
            winnerHeading.style.color = "#f2b137";
            oWinCount++;
            oWins.textContent = oWinCount;
            modal.style.display = "block";
         }
         console.log(xWinCount, oWinCount);
         disabled();
      } else {
         return false;
      }
   });
}
function checkAllTurnsPlayed() {
   return Array.from(allSquares).every((btn) => btn.innerHTML !== "");
}

function tieGame() {
   console.log(checkAllTurnsPlayed());

   if (checkAllTurnsPlayed()) {
      if (!checkWin() || !checkSoloWin()) {
         tieCount++;
         console.log(tieCount);
         tieGames.textContent = tieCount;
         newGame.style.display = "none";
         startGame.style.display = "block";
         modal.style.display = "none";
         tieModal.style.display = "block";
         body.classList.add("modal-open");
      }
   }
}

function enabled() {
   return allSquares.forEach((btn) => (btn.disabled = false));
}
function disabled() {
   return allSquares.forEach((btn) => (btn.disabled = true));
}

function multiplayerGame() {
   allSquares.forEach((btn, index) => {
      btn.addEventListener("click", () => {
         if (currentState) {
            btn.innerHTML = `<img src="./assets/icon-x.svg" />`;
            playerTurn.setAttribute("src", "./assets/icon-o.svg");
            currentPlayer = "X";
            squareState[index] = "X";
         } else {
            btn.innerHTML = `<img src="./assets/icon-o.svg" />`;
            playerTurn.setAttribute("src", "./assets/icon-x.svg");
            currentPlayer = "O";
            squareState[index] = "O";
         }
         btn.disabled = true;
         btn.style.cursor = "not-allowed";
         currentState = !currentState;
         checkWin();
         tieGame();
      });
   });
}

restart.addEventListener("click", () => {
   newGame.style.display = "none";
   startGame.style.display = "block";
   modal.style.display = "none";

   restartModal.style.display = "block";
   allSquares.forEach((btn) => (btn.style.backgroundColor = "#1f3641"));
   body.classList.add("modal-open");
});

restartBtn.addEventListener("click", () => {
   reload();
   newGame.style.display = "none";
   startGame.style.display = "block";
   modal.style.display = "none";
   restartModal.style.display = "none";
   allSquares.forEach((btn) => (btn.style.backgroundColor = "#1f3641"));
});

cancelBtn.addEventListener("click", () => {
   newGame.style.display = "none";
   startGame.style.display = "block";
   modal.style.display = "none";
   restartModal.style.display = "none";
});

function reload() {
   squareState = new Array(9).fill("");
   allSquares.forEach((btn) => {
      btn.innerHTML = "";
      btn.style.cursor = "pointer";
   });
   enabled();
   currentState = true;
   playerTurn.setAttribute("src", "./assets/icon-x.svg");
   allSquares.forEach((btn) => (btn.style.backgroundColor = "#1f3641"));
   body.classList.add("modal-open");
}

let gameCurrentPlayerOne = "";

function gameCurrentPlayer(player) {
   gameCurrentPlayerOne = player;
   if (gameCurrentPlayerOne == "X") {
      xPlayer.textContent = "X (P1)";
      oPlayer.textContent = "O (P2)";
   } else {
      xPlayer.textContent = "X (P2)";
      oPlayer.textContent = "O (P1)";
   }
}

xIcon.addEventListener("click", () => gameCurrentPlayer("X"));
oIcon.addEventListener("click", () => gameCurrentPlayer("O"));
newGamePlayer.addEventListener("click", () => {
   if (gameCurrentPlayerOne == "") {
      return;
   }

   newGame.style.display = "none";
   startGame.style.display = "block";

   multiplayerGame();
});

let cpuCurrentPlayerOne = "";
let gameOver = false;

function checkSoloWin(player) {
   console.log(player);
   console.log(squareState);

   return winningPatterns.some((pattern) => {
      const [a, b, c] = pattern;

      return squareState[a] == player && squareState[b] == player && squareState[c] == player;
   });
}

function cpuMove() {
   let availableSquares = [];

   for (let i = 1; i < squareState.length; i++) {
      if (squareState[i] === "") {
         availableSquares.push(i);
      }
   }
   let randomIndex = Math.floor(Math.random() * availableSquares.length);
   let selectedSquare = availableSquares[randomIndex];

   squareState[selectedSquare] = "O";
   if (checkAllTurnsPlayed()) {
      return;
   } else {
      if (allSquares[selectedSquare].innerHTML !== "") {
         cpuMove();
      } else {
         allSquares[selectedSquare].innerHTML = `<img src="./assets/icon-o.svg" />`;
         playerTurn.setAttribute("src", "./assets/icon-x.svg");
         allSquares[selectedSquare].disabled = true;
         allSquares[selectedSquare].style.cursor = "not-allowed";
         if (checkSoloWin("O")) {
            // alert("Cpu wins");
            console.log("Cpu wins");

            theWinnerIs.textContent = "OH NO, YOU LOST...";
            winnerIcon.setAttribute("src", "./assets/icon-o.svg");
            winnerHeading.style.color = "#f2b137";
            oWinCount++;
            oWins.textContent = oWinCount;
            setTimeout(() => {
               modal.style.display = "block";
            }, 500);
         } else if (checkAllTurnsPlayed()) {
            console.log("tieGame");
            tieGame();
         } else {
            cpuPlayer = "X";
         }
      }
   }
}

function soloGame() {
   allSquares.forEach((btn, index) => {
      btn.addEventListener("click", () => {
         playerTurn.setAttribute("src", "./assets/icon-o.svg");
         btn.innerHTML = `<img src="./assets/icon-x.svg" />`;
         squareState[index] = "X";

         setTimeout(() => cpuMove(), 500);
         btn.disabled = true;
         btn.style.cursor = "not-allowed";
         console.log(checkSoloWin(cpuPlayer));
         if (checkSoloWin(cpuPlayer)) {
            console.log(`${cpuPlayer === "X" ? "Player" : "CPU"} wins!`);

            theWinnerIs.textContent = "YOU WON!";
            winnerIcon.setAttribute("src", "./assets/icon-x.svg");
            winnerHeading.style.color = "#31c3bd";
            xWinCount++;
            xWins.textContent = xWinCount;
            setTimeout(() => {
               modal.style.display = "block";
            }, 500);
            gameOver = true;
         } else if (checkAllTurnsPlayed()) {
            console.log("tieGame");
            gameOver = true;
            tieGame();
         } else {
            cpuPlayer = "X";

            // cpuMove();
         }
      });
   });
}

xIcon.addEventListener("click", () => (cpuCurrentPlayerOne = "X"));
oIcon.addEventListener("click", () => (cpuCurrentPlayerOne = "O"));
newGameCpu.addEventListener("click", () => {
   if (cpuCurrentPlayerOne == "") {
      return;
   }
   xPlayer.textContent = "X (YOU)";
   oPlayer.textContent = "O (CPU)";
   newGame.style.display = "none";
   startGame.style.display = "block";
   console.log(cpuCurrentPlayerOne);
   soloGame();
});
