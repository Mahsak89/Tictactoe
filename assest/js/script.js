const tiles = document.querySelectorAll(".tile");
const PLAYER_X = "X";
const PLAYER_O = "O";
let turn = PLAYER_X;

const boardState = Array(tiles.length);
boardState.fill(null);

//Elements
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");

//sounds

const gameOverSound = new Audio ("sounds/game_over.wav.mp3");
const clickSound = new Audio ("sounds/click.wav.mp3");


tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function setHoverText() {
    //remove all hover text
    tiles.forEach((tile) => {
      tile.classList.remove("x-hover");
      tile.classList.remove("o-hover");
    });
  
    const hoverClass = `${turn.toLowerCase()}-hover`;
  
    tiles.forEach((tile) => {
      if (tile.innerText == "") {
        tile.classList.add(hoverClass);
      }
    });
  }
  
  setHoverText();



function tileClick(event) {
    if (gameOverArea.classList.contains("visible")) {
      return;
    }
    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if (tile.innerText != "") {
      return;
    }

    if (turn === PLAYER_X) {
        tile.innerText = PLAYER_X;
        boardState[tileNumber] = PLAYER_X;
        turn = PLAYER_O;
      } else {
        tile.innerText = PLAYER_O;
        boardState[tileNumber] = PLAYER_O;
        turn = PLAYER_X;
      }

      //  clickSound.play();
      setHoverText();
      checkWinner();
      
}

function checkWinner() {
  //check for a winner
  for (const winningCombination of winningCombinations) {
  //Object Destructuring
  const { combo, strikeClass } = winningCombination;
  const tileValue0 = boardState[combo[0]];
  const tileValue1 = boardState[combo[1]];
  const tileValue2 = boardState[combo[2]];
  }
}

const winningCombinations = [

  //rows
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },

  //columns
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },

  //diagonals
  {combo: [0, 4, 8], strikeClass:"strike-diagonal-1"},
  {combo: [2, 4, 6], strikeClass:"strike-diagonal-1"},
];