import { state } from "../../state";

import "./result.css";

const resultsImages = {
  userWins: require("url:../../images/userWin.svg"),
  computerWins: require("url:../../images/computerWin.svg"),
  tiedGame: require("url:../../images/tiedGame.svg"),
};

export function initResultPage(params) {
  const div = document.createElement("div");
  div.classList.add("main-container");

  const currentGame = state.getCurrentGame();
  const gameResult = state.whoWins(
    currentGame.userMove,
    currentGame.computerMove
  );
  console.log(gameResult);

  if (gameResult === "userWins") {
    div.classList.add("user-wins");
  } else if (gameResult === "computerWins") {
    div.classList.add("computer-wins");
  } else if (gameResult === "tiedGame") {
    div.classList.add("tied-game");
  }

  state.changeHistory(gameResult);

  const currentHistory = state.getCurrentHistory();

  state.restartGame();

  div.innerHTML = `
    <div class="subcontainer">
      <img src=${resultsImages[gameResult]} class="result__img" />

      <div class="result__record">
        <h3 class="result__score"> Score: </h3>
        <p class="result__score-points"> Vos: ${currentHistory.userWins} </p>
        <p class="result__score-points"> Máquina: ${currentHistory.computerWins} </p>
      </div>

      <div class="button-section">
        <button-comp class="start-button"> Volver a jugar </button-comp>
      </div>
    </div>
  `;

  const buttonEl = div.querySelector("button-comp");
  buttonEl.addEventListener("click", () => {
    params.goTo("/desafio-dwf-m5/instructions");
  });

  return div;
}
