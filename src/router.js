import { CONFIG } from './config';

export class RouterHistory {
  constructor() {
    this.routes = {
      '404': () => {
        console.log('Not found')
      },
    };

    this.mainContentPages = document.querySelectorAll(CONFIG.selectors.mainContentPages);
    console.log(this.mainContentPages);
    window.addEventListener('popstate', () => {
      this.render(decodeURI(window.location.pathname));
    });
  }

  addRouter(route, action) {
    this.routes[route] = action;
  }

  render(url) {
    const temp = url.split('/')[1];

    [...this.mainContentPages].forEach((page) => {
      page.style.display = CONFIG.none;
    });

    this.routes[temp] ? this.routes[temp]() : this.routes['404']();
  }
}