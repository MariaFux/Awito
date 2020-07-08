'use strict';

const dataBase = [];

const modalAdd = document.querySelector('.modal__add'),
  addAd = document.querySelector('.add__ad'),
  modalBtnSubmit = document.querySelector('.modal__btn-submit'),
  modalSubmit = document.querySelector('.modal__submit'),
  modalBtnWarning = document.querySelector('.modal__btn-warning'),
  catalog = document.querySelector('.catalog'),
  modalItem = document.querySelector('.modal__item'),
  modalCards = document.querySelectorAll('.card');

//все элементы модального окна кроме кнопки "Отправить"
const elementsModalSubmit = [...modalSubmit.elements]
  .filter(elem => elem.tagName !== 'BUTTON');

//функция для закрытия модальных окон по крестику и свободному пространству
const closeModal = function(event) {
  const target = event.target;

  if (target.closest('.modal__close') || target === this) {
    this.classList.add('hide');
    if (this === modalAdd) {
      modalSubmit.reset();
    }
  }
};

//функция для закрытия модальных окон по Esc
const closeModalEsc = (event) => {
  if (event.code === 'Escape') {
    modalAdd.classList.add('hide');
    modalItem.classList.add('hide');
    modalSubmit.reset();
    document.removeEventListener('keydown', closeModalEsc);
  }
};

//активируется кнопка "Отправить", когда все поля модального окна не пустые
modalSubmit.addEventListener('input', () => {
  //становится true, когда все поля модального окна не пустые
  const validForm = elementsModalSubmit.every(elem => elem.value);
  modalBtnSubmit.disabled = !validForm;
  modalBtnWarning.style.display = validForm ? 'none' : '';
});

modalSubmit.addEventListener('submit', event => {
  event.preventDefault(); //чтобы не перезагружалась страница
  const itemObj = {};
  //формируем объект (имя - значение)
  for (const elem of elementsModalSubmit) {
    itemObj[elem.name] = elem.value;
  }
  //добавляем полученные данные в массив
  dataBase.push(itemObj);
  modalSubmit.reset();
})

//открытие модального окна добавления объявления
addAd.addEventListener('click', () => {
  modalAdd.classList.remove('hide');
  modalBtnSubmit.disabled = true;
  document.addEventListener('keydown', closeModalEsc);
});

//открытие модального окна отдельного товара
catalog.addEventListener('click', (event) => {
  const target = event.target;

  if (target.closest('.card')) {
    modalItem.classList.remove('hide');
    document.addEventListener('keydown', closeModalEsc);
  } 
});
 
modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);