import { initRouter } from "./router";

import { initButtonComp } from "./components/button/button";
import { initHandComp } from "./components/hand/hand";

import { state } from "./state";

function main() {
  initRouter(document.querySelector("#root"));
  state.initState();


  initButtonComp();
  initHandComp();
}
main();
