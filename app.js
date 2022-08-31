"use strict";
const optionsContainer = document.querySelector(".rps_options");
const optionsContainerActive = document.querySelector(".rps_options--active");
const scoreNumber = document.querySelector(".rps_scoreboard_score_number");
const results = document.querySelector(".results");
const resultBtn = document.querySelector(".results_btn");
const resultsText = document.querySelector(".results_text");
const rulesBtn = document.querySelector(".rps_rules_btn");
const rulesModal = document.querySelector(".rps_rules_modal");
const options = document.querySelector(".rps_options");
const triangle = document.querySelector(".rps_options_triangle");
const optionPaper = document.querySelector(".rps_options_option--paper");
const optionScissors = document.querySelector(".rps_options_option--scissors");
const optionRock = document.querySelector(".rps_options_option--rock");
const active1 = document.getElementById("active-1");
const active2 = document.getElementById("active-2");
const activeImg = document.querySelector(
  ".rps_options_img_container--active-1"
);
const activeImg2 = document.querySelector(
  ".rps_options_img_container--active-2"
);

let gameChoices = ["paper", "scissors", "rock"];
let playerChoice = null;
let computerChoice = null;
let score = 0;

////////////////////////////////////////////////////
// Remove start state and update to active state //
//////////////////////////////////////////////////
const handleUpdateToActive = () => {
  optionsContainer.classList.add("hide");
  optionsContainerActive.classList.remove("hide");
  results.classList.remove("hide");
};
////////////////////////////////////////////////////
// Remove active state and update to start state //
//////////////////////////////////////////////////
const handleUpdateToStart = () => {
  optionsContainer.classList.remove("hide");
  optionsContainerActive.classList.add("hide");
  results.classList.add("hide");
};

/////////////////////////
// Update User Choice //
////////////////////////
const handlePlayerChoice = (choice) => {
  switch (choice) {
    case "paper":
      active1.classList.add("rps_options_option--paper-active");
      activeImg.classList.add("rps_options_img_container--paper");
      break;
    case "scissors":
      active1.classList.add("rps_options_option--scissors-active");
      activeImg.classList.add("rps_options_img_container--scissors");
      break;
    case "rock":
      active1.classList.add("rps_options_option--rock-active");
      activeImg.classList.add("rps_options_img_container--rock");
      break;
    default:
      break;
  }
};

/////////////////////////////////////
// Let Computer Choose their pick //
////////////////////////////////////
const handleComputerPick = () => {
  let randomChoice = Math.floor(Math.random() * gameChoices.length);
  computerChoice = gameChoices[randomChoice];
  console.log(computerChoice);
  handleComputerChoice(computerChoice);
};

/////////////////////////////
// Update Computer Choice //
///////////////////////////
const handleComputerChoice = (computerChoice) => {
  switch (computerChoice) {
    case "paper":
      active2.classList.add("rps_options_option--paper-active");
      activeImg2.classList.add("rps_options_img_container--paper");
      handleWinner("paper");
      break;
    case "scissors":
      active2.classList.add("rps_options_option--scissors-active");
      activeImg2.classList.add("rps_options_img_container--scissors");
      handleWinner("scissors");
      break;
    case "rock":
      active2.classList.add("rps_options_option--rock-active");
      activeImg2.classList.add("rps_options_img_container--rock");
      handleWinner("rock");
      break;
    default:
      break;
  }
};

////////////////////////////////////////
// Compare Choices and update results //
///////////////////////////////////////
const handleComparisons = (computerChoice, playerPick) => {
  if (computerChoice === "paper" && playerPick === "scissors") {
    resultsText.textContent = "YOU WIN";
    score++;
    scoreNumber.textContent = score;
  }
  if (computerChoice === "paper" && playerPick === "rock") {
    resultsText.textContent = "YOU LOSE";
  }
  if (computerChoice === "scissors" && playerPick === "paper") {
    resultsText.textContent = "YOU LOSE";
  }
  if (computerChoice === "scissors" && playerPick === "rock") {
    resultsText.textContent = "YOU WIN";
    score++;
    scoreNumber.textContent = score;
  }
  if (computerChoice === "rock" && playerPick === "paper") {
    resultsText.textContent = "YOU WIN";
    score++;
    scoreNumber.textContent = score;
  }
  if (computerChoice === "rock" && playerPick === "scissors") {
    resultsText.textContent = "YOU LOSE";
  }
};

////////////////////
// Decide Winner //
//////////////////
const handleWinner = (computerChoice) => {
  if (computerChoice === playerChoice) {
    resultsText.textContent = "DRAW";
  }

  if (computerChoice !== playerChoice) {
    handleComparisons(computerChoice, playerChoice);
  }
};

///////////////////
// Restart Game //
/////////////////
const handlePlayAgain = () => {
  handleUpdateToStart();
  active1.removeAttribute("class");
  active1.setAttribute(
    "class",
    "rps_options_option rps_options_option--active"
  );
  activeImg.removeAttribute("class");
  activeImg.setAttribute(
    "class",
    "rps_options_img_container rps_options_img_container--active-1"
  );
  active2.removeAttribute("class");
  active2.setAttribute(
    "class",
    "rps_options_option rps_options_option--active"
  );
  activeImg2.removeAttribute("class");
  activeImg2.setAttribute(
    "class",
    "rps_options_img_container rps_options_img_container--active-2"
  );
};

//////////////////////
// Event Listeners //
////////////////////
rulesBtn.addEventListener("click", () => {
  rulesModal.classList.add("active");
});

rulesModal.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("rps_rules_modal_close")) {
    rulesModal.classList.remove("active");
  }
});

options.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("rps_options_option")) {
    playerChoice = target.getAttribute("id");
    handlePlayerChoice(playerChoice);
    handleUpdateToActive();
    handleComputerPick();
  } else if (target.parentNode.classList.contains("rps_options_option")) {
    playerChoice = target.parentNode.getAttribute("id");
    handlePlayerChoice(playerChoice);
    handleUpdateToActive();
    handleComputerPick();
  }
});

resultBtn.addEventListener("click", handlePlayAgain);
