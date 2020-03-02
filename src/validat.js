import $ from 'jquery';
// eslint-disable-next-line no-unused-vars
import validate from 'jquery-validation';

const options = {
  debug: true,
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
      // name: "Слишком мало символов!!!"
    },
    phone: {
      required: "Вы не ввели телефон!!!",
    },
    email: {
      required: "Вы не ввели email!!!",
      email: "Введите правильный email!!!",
    }
  },
  errorClass: 'alert alert-danger',
  errorElement: 'div',
};

$('#connectionForm').validate(options);