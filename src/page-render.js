import { CONFIG } from "./config";

export class PageRender {
  constructor(router) {
    this.router = router;
  }

  renderHomePage(cars) {
    const page = document.querySelector(CONFIG.selectors.homePage);
    const allCars = document.querySelectorAll(CONFIG.selectors.allCars);
    console.log(allCars);

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

  initCarsLocation() {
    const cars = document.querySelectorAll(CONFIG.selectors.allCars);
    cars.forEach((item) => {
      item.addEventListener('click', (event) => {
        const clicked = event.target;
        if (clicked.classList.contains('btn-outline-dark')) {
          const { index } = item.dataset;
          window.history.pushState(null, null, `/cars/${index}`);
          this.router.render(decodeURI(location.pathname));
        }
      });
    });
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

}

// const pageRender = new PageRender();
// pageRender.renderHomePage();
// pageRender.getAllCars();