import "./instructions.css";

export function initInstructionsPage(params) {
  const div = document.createElement("div");
  div.classList.add("main-container");

  div.innerHTML = `
    <p class="instructions__title" > Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos. </p>

    <button-comp> ¡Jugar! </button-comp>

    <div class="hands-container">  
      <hand-comp handType="scissors"></hand-comp>
      <hand-comp handType="rock"></hand-comp>
      <hand-comp handType="paper"></hand-comp>
    </div>  

  `;

  const buttonEl = div.querySelector("button-comp");
  buttonEl.addEventListener("click", () => {
    params.goTo("/desafio-dwf-m5/countdown");
  });

  return div;
}
