import "./home.css";

export function initHomePage(params) {
  const div = document.createElement("div");
  div.classList.add("main-container");

  div.innerHTML = `
    <h1 class="home__title" > Piedra Papel ó Tijera </h1>
    
    <button-comp> Empezar </button-comp>

    <div class="hands-container">  
      <hand-comp handType="scissors"></hand-comp>
      <hand-comp handType="rock"></hand-comp>
      <hand-comp handType="paper"></hand-comp>
    </div>
  `;

  const buttonEl = div.querySelector("button-comp");
  buttonEl.addEventListener("click", () => {
    params.goTo("/desafio-dwf-m5/instructions");
  });

  return div;
}
