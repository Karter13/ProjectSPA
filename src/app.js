import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import './styles/styles.scss';
import './styles/style.sass';
import { CONFIG } from './config';
import { RouterHistory } from './router';
import { PageRender } from './page-render';
import { FormService } from './form-submission';
import { IdGoodsInBasket } from './basket-data';


class App {
  constructor() {
    this.cars = [];
    this.formServise = new FormService(this.router);
    this.router = new RouterHistory();
    this.pageRender = new PageRender(this.router);
    this.init();
    this.basketData = new IdGoodsInBasket(this.router);
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
        this.pageRender.renderAllElements(data);
        this.initRouter();
        this.router.render(decodeURI(location.pathname));
      });
  }

  initRouter() {
    this.router.addRouter('', this.pageRender.renderHomePage.bind(this.pageRender, this.cars));
    this.router.addRouter('cars', this.pageRender.renderSinglCarPage.bind(this.pageRender, this.cars));
    this.router.addRouter('404', this.pageRender.renderErrorPage);
    this.router.addRouter('about', this.pageRender.renderAboutPage.bind(this.pageRender));
    this.router.addRouter('search', this.pageRender.renderSearchPage.bind(this.pageRender, this.cars));
    this.router.addRouter('form', this.pageRender.renderFormPage);
    this.router.addRouter('basket', this.pageRender.renderBasketPage.bind(this.pageRender, this.cars));
    this.router.addRouter('empty', this.pageRender.renderBasketPageEmpty);
  }

}

// eslint-disable-next-line no-unused-vars
const app = new App();
