import $ from 'jquery';
// eslint-disable-next-line no-unused-vars
import validate from 'jquery-validation';
import { CONFIG } from './config';


export class FormService {
  constructor(router) {
    this.router = router;
    this.form = document.querySelector(CONFIG.selectors.formPageContent);
    this.init();
    this.validatorForm();
  }

  init() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
  }

  sendData() {
    const data = this.getDataFromForm();
    fetch(`${CONFIG.api}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
  }

  validatorForm() {
    const opt = {
      submitHandler: () => {
        this.sendData();
        this.clearForm();
        this.showMessage();
      },
      invalidHandler: () => {
        console.log('invalid');
      },
      rules: {
        name: {
          required: true,
          minlength: 4,
        },
        email: {
          required: true,
          email: true
        },
        phone: {
          required: true,
        },
      },
      messages: {
        name: {
          required: "Вы не ввели имя!!!",
          minlength: $.validator.format("Необходимо не менее {0} символов!")
        },
        email: {
          required: "Вы не ввели email!!!",
          email: "Введите правильный email!!!",
        },
        phone: {
          required: "Вы не ввели телефон!!!",
        },
      },
      errorClass: 'alert alert-danger',
      errorElement: 'div',
    };
    $('#connectionForm').validate(opt);
  }

  getDataFromForm() {
    const name = $(CONFIG.selectors.customersName).val();
    const email = $(CONFIG.selectors.customersEmail).val();
    const phone = $(CONFIG.selectors.customersPhone).val();
    const textarea = $(CONFIG.selectors.customersTextarea).val();
    return { name, email, phone, textarea };
  }

  clearForm() {
    $(CONFIG.selectors.customersName).val('');
    $(CONFIG.selectors.customersEmail).val('');
    $(CONFIG.selectors.customersPhone).val('');
    $(CONFIG.selectors.customersTextarea).val('');
  }

  showMessage() {
    const showMessage = document.querySelector(CONFIG.selectors.sendingMessage);
    showMessage.style.display = CONFIG.block;
    this.removeElement(showMessage);
  }

  removeElement(element) {
    setTimeout(() => {
      element.style.display = CONFIG.none;
    }, 5000);
  }

}