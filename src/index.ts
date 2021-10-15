import { initRouter } from "./router";

import { initButtonComp } from "./components/button/button";
import { initHandComp } from "./components/hand/hand";

import { state } from "./state";

function main() {
  state.initState();

  initRouter(document.querySelector("#root"));

  initButtonComp();
  initHandComp();
}
main();
