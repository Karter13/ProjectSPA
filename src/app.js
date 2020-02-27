import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import './styles/styles.scss';
import './styles/style.sass';
import { CONFIG } from './config';
import { RouterHistory } from './router';
import { PageRender } from './page-render';
// import png from '../images/fon.png';

class App {
  constructor() {
    this.cars = [];
    this.router = new RouterHistory();
    this.pageRender = new PageRender(this.router);
    this.init();
  }

  init() {
    fetch(`${CONFIG.api}/cars`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.cars = data;
        this.pageRender.getAllCars(data);

        this.initRouter();
        this.router.render(decodeURI(location.pathname));
      });
  }

  initRouter() {
    this.router.addRouter('', this.pageRender.renderHomePage.bind(this.pageRender, this.cars));
  }

}

// eslint-disable-next-line no-unused-vars
const app = new App();
