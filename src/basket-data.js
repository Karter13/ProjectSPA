import { CONFIG } from "./config";
import { FormService } from './form-submission';


export class IdGoodsInBasket {
  constructor(router) {
    this.router = router;
    this.formSubmission = new FormService();
    this.singlePage = document.querySelector(CONFIG.selectors.singleCar);
    this.btnSinglePage = document.querySelector(CONFIG.selectors.btnAddBasket);
    this.init();
    this.idGoods = this.initIdGoods();
  }

  init() {
    this.btnSinglePage.addEventListener('click', (event) => {
      event.preventDefault();
      this.addIdToLocalStorage();
    });
  }

  initIdGoods() {
    if (localStorage.getItem(CONFIG.idGoods)) {
      return JSON.parse(localStorage.getItem(CONFIG.idGoods));
    }
    return [];
  }

  seveId(goodsId) {
    this.idGoods = [...goodsId];
    localStorage.setItem(CONFIG.idGoods, JSON.stringify(goodsId));
  }

  getNewIdGoods(id) {
    const googInBasket = document.querySelector(CONFIG.selectors.goodInBasket);
    const filterId = this.idGoods.filter((elem) => elem.id === id);
    console.log(filterId);
    if (filterId.length === 0 && id.length > 0 && id !== '') {
      this.idGoods.push({ id });
      this.seveId(this.idGoods);
      googInBasket.style.display = CONFIG.block;
      this.formSubmission.removeElement(googInBasket);
    }
  }

  addIdToLocalStorage() {
    const index = location.pathname.split('/cars/')[1].trim();
    this.getNewIdGoods(index);
  }

  initBtnDeleteGood() {
    const gods = document.querySelectorAll(CONFIG.selectors.basketCardSingle);
    gods.forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        const clicked = event.target;
        if (clicked.classList.contains(CONFIG.selectors.btnDelete)) {
          const { index } = item.dataset;
          this.removeGoodsFromBasket(index);
          item.style.display = CONFIG.none;
        }
      });
    });
  }

  removeGoodsFromBasket(id) {
    const newIdGoods = this.idGoods.filter((elem) => elem.id !== id);
    if (this.idGoods !== newIdGoods.length) {
      this.seveId(newIdGoods);
    }
  }

  //код до рендеринга до использования localStorage

  // getData() {
  //   fetch(`${CONFIG.api}/cars`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       this.cars = data;
  //       this.getDataForBasket(data)
  //     });
  // }

  // getDataForBasket(cars) {
  //   const index = location.pathname.split('/cars/')[1].trim();
  //   cars.forEach((elem) => {
  //     if (Number(elem.id) === Number(index)) {
  //       const title = elem.model;
  //       console.log(title);
  //       const img = elem.image.large;
  //       console.log(img);
  //       const price = elem.price;
  //       console.log(price);
  //       this.addDataToBasket({ title, img, price })
  //     }
  //   })
  // }

  // addDataToBasket(data) {
  //   fetch(`${CONFIG.api}/basket`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result)
  //     })
  // }

  // getDataForGoodsInBasket() {
  //   fetch(`${CONFIG.api}/basket`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       this.goodsBasket = data;
  //       console.log(this.goodsBasket);
  //     });
  // }

}

// const basket = new IdGoodsInBasket();
// basket.initBtnDeleteGood();
