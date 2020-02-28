import { CONFIG } from "./config";

export class PageRender {
  constructor(router) {
    this.router = router;
  }

  renderHomePage(cars) {
    const page = document.querySelector(CONFIG.selectors.homePage);
    const allCars = document.querySelectorAll(CONFIG.selectors.allCars);

    [...allCars].forEach((item) => {
      item.style.display = CONFIG.none;
    });

    [...allCars].forEach((item) => {
      cars.forEach((elem) => {
        if (Number(item.dataset.index) === Number(elem.id)) {
          item.style.display = CONFIG.block;
        }
      });
    });
    page.style.display = CONFIG.block;
  }

  getAllCars(data) {
    const allCars = document.querySelector(CONFIG.selectors.cars);
    data.forEach((elem) => {
      const div = document.createElement('div');
      const template = `<div class="col mb-3 shadow-lg p-3 single-card" " data-index="${elem.id}">
        <div class="card text-center h-100 bg-secondary">
          <img src="${elem.image.small}" class="card-img-top" alt="car">
          <div class="card-body one-card">
            <h5 class="card-title">${elem.model}</h5>
            <button class="btn btn-outline-dark " type="submit">
            стоимость от ${elem.price} $
            </button>
          </div>
        </div>
      </div>`;
      div.innerHTML = template;
      allCars.append(div);
    });
    this.initCarsLocation();
  }

  initCarsLocation() {
    const cars = document.querySelectorAll(CONFIG.selectors.allCars);
    cars.forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        const clicked = event.target;
        if (clicked.classList.contains(CONFIG.selectors.btnDark)) {
          const { index } = item.dataset;
          window.history.pushState(null, null, `/cars/${index}`);
          this.router.render(decodeURI(location.pathname));
        }
      });
    });
  }

  render404() {
    window.history.pushState(null, null, '/404');
    this.router.render(decodeURI(location.pathname));
  }

  renderSinglCarPage(cars) {
    const page = document.querySelector(CONFIG.selectors.singleCar);
    const index = location.pathname.split('/cars/')[1].trim();
    let isFind = false;
    if (cars.length) {
      cars.forEach((elem) => {
        if (Number(elem.id) === Number(index)) {
          isFind = true;
          document.querySelector(CONFIG.selectors.cardTitleMain).innerText = elem.model;
          document.querySelector(CONFIG.selectors.cardImg).setAttribute('src', '/' + elem.image.large);
          document.querySelector(CONFIG.selectors.year).innerText = `Год выпуска ${elem.specifications.year}`;
          document.querySelector(CONFIG.selectors.speed).innerHTML = `Максимальная скорость ${elem.specifications.speed} км/ч`;
          document.querySelector(CONFIG.selectors.engine).innerHTML = `Двигатель ${elem.specifications.engine}`;
          document.querySelector(CONFIG.selectors.start).innerText = `Разгон до 100км/ч ${elem.specifications.start} c.`;
          document.querySelector(CONFIG.selectors.drive).innerText = `Привод ${elem.specifications.drive}`;
          document.querySelector(CONFIG.selectors.price).innerText = `Цена от ${elem.price} $`;
          document.querySelector(CONFIG.selectors.warranty).innerText = `Гарантия ${elem.specifications.warranty} года`;
          document.querySelector(CONFIG.selectors.cardTitleDescription).innerText = elem.titleDescription;
          document.querySelector(CONFIG.selectors.cardTextDescription).innerText = elem.description;
        }
      });
    }
    if (isFind) {
      page.style.display = CONFIG.block;
    } else {
      this.render404();
    }
  }

  initSingleCarPage() {
    this.singleCarPage = document.querySelector(CONFIG.selectors.singleCar);
    this.block = this.singleCarPage.style.display = CONFIG.block;
    this.singleCarPage.addEventListener('click', (event) => {
      event.preventDefault();
      if (this.block) {
        const clicked = event.target;
        if (clicked.classList.contains(CONFIG.selectors.btnMain)) {
          history.pushState(null, null, '/');
          this.router.render(decodeURI(location.pathname));
        }
      }
    });
  }

  renderErrorPage() {
    const errorPage = document.querySelector(CONFIG.selectors.errorPage);
    errorPage.style.display = CONFIG.block;
  }

  initAboutPage() {
    const buttonActivAboutPage = document.querySelector(CONFIG.selectors.btnActivAboutPage);
    buttonActivAboutPage.addEventListener('click', (event) => {
      event.preventDefault();
      window.history.pushState(null, null, '/about/');
      this.router.render(decodeURI(location.pathname));
    });
  }

  renderAboutPage() {
    const aboutPage = document.querySelector(CONFIG.selectors.aboutPage);
    aboutPage.style.display = CONFIG.block;
    this.initButtonAbout();
  }
  initButtonAbout() {
    const btnAbout = document.querySelector(CONFIG.selectors.btnAboutPage);
    console.log(btnAbout);
    btnAbout.addEventListener('click', (event) => {
      event.preventDefault();
      window.history.pushState(null, null, '/');
      this.router.render(decodeURI(location.pathname));
    });
  }



  renderAllElements(data) {
    this.getAllCars(data);
    this.initSingleCarPage();
    this.initAboutPage();
  }

}

const pageRender = new PageRender();
// pageRender.renderHomePage();
// pageRender.getAllCars();
pageRender.initButtonAbout();