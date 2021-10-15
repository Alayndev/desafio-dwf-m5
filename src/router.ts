import { initHomePage } from "./pages/home/home";
import { initInstructionsPage } from "./pages/instructions/instructions";
import { initCountdownPage } from "./pages/countdown/countdown";
import { initResultPage } from "./pages/result/result";

const routes = [
  {
    route: /\/desafio-dwf-m5\/home/,
    page: initHomePage,
  },
  {
    route: /\/desafio-dwf-m5\/instructions/,
    page: initInstructionsPage,
  },
  {
    route: /\/desafio-dwf-m5\/countdown/,
    page: initCountdownPage,
  },
  {
    route: /\/desafio-dwf-m5\/result/,
    page: initResultPage,
  },
];

export function initRouter(container: Element) {
  function goTo(path: string) {
    history.pushState({}, "", path);
    handleRoute(path);
  }

  function handleRoute(route: string) {
    for (const r of routes) {
      if (r.route.test(route)) {
        const page: Element = r.page({ goTo: goTo });

        container.firstChild?.remove();

        container.appendChild(page);
      }
    }
  }

  if (location.host.includes("github.io")) {
    goTo("/desafio-dwf-m5/home");
  } else {
    handleRoute(location.pathname);
  }

  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}
