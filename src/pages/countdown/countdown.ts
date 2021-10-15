import { state, Move } from "../../state";

import "./countdown.css";

function randomMove(): Move {
  const possibleMoves: Move[] = ["rock", "paper", "scissors"];

  const selectRandomMove: Move =
    possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

  return selectRandomMove;
}

export function initCountdownPage(params) {
  let countdownLimit: number = 3;

  const div = document.createElement("div");
  div.classList.add("game-countdown");

  div.innerHTML = `
    <div class="circle-container">
      <div class="circle">
        <h3 class="countdown-counter">${countdownLimit}</h3>
      </div>
    </div>

    <div class="hands-container">  
      <hand-comp handType="scissors"></hand-comp>
      <hand-comp handType="rock"></hand-comp>
      <hand-comp handType="paper"></hand-comp>
    </div>
  `;

  const handsComps = div.querySelectorAll("hand-comp");
  handsComps.forEach((hand) => {
    hand.addEventListener("handClick", (e: any) => {
      console.log(e.target);
      console.log(e.detail);

      const selectedMove: Move = e.detail.handMove;

      state.setMove(selectedMove, "userMove");

      handsComps.forEach((auxHand) => {
        const imgEl = auxHand.shadowRoot.querySelector(".hand");

        if (auxHand.getAttribute("handType") !== selectedMove) {
          imgEl.classList.add("inactive-hand");
          imgEl.classList.remove("active-hand");
        } else if (auxHand.getAttribute("handType") === selectedMove) {
          imgEl.classList.add("active-hand");
          imgEl.classList.remove("inactive-hand");
        }
      });
    });
  });

  state.setMove(randomMove(), "computerMove");

  const countdownCounterEl = div.querySelector(".countdown-counter");

  const counterIntervalId = setInterval(() => {
    countdownLimit--;

    if (countdownLimit === 0) {
      clearInterval(counterIntervalId);

      const currentGame = state.getCurrentGame();

      if (currentGame.userMove === "none") {
        state.setMove(randomMove(), "userMove");
      }

      div.classList.add("game-hands-show");

      div.innerHTML = `
        <hand-comp handType=${currentGame.computerMove} class="computer-hand" handHeight="215px" handWidth="90px"></hand-comp>
        <hand-comp handType=${currentGame.userMove} class="user-hand" handHeightt="215px" handWidth="90px"></hand-comp>
       `;

      setTimeout(() => {
        params.goTo("/desafio-dwf-m5/result");
      }, 3000);
    }

    countdownCounterEl.textContent = countdownLimit.toString();

  }, 1000);

  return div;
}
