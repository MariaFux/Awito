'use strict';

const modalAdd = document.querySelector('.modal__add'),
  addAd = document.querySelector('.add__ad'),
  modalBtnSubmit = document.querySelector('.modal__btn-submit'),
  modalSubmit = document.querySelector('.modal__submit'),
  modalBtnWarning = document.querySelector('.modal__btn-warning'),
  catalog = document.querySelector('.catalog'),
  modalItem = document.querySelector('.modal__item'),
  modalCards = document.querySelectorAll('.card');

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

//открытие модального окна добавления объявления
addAd.addEventListener('click', () => {
  modalAdd.classList.remove('hide');
  modalBtnSubmit.disabled = true;
})

//открытие модального окна отдельного товара
catalog.addEventListener('click', (event) => {
  const target = event.target;

  if (target.closest('.card')){
    modalItem.classList.remove('hide');
  } 
});

//закрытие модальных окон по Esc
document.addEventListener('keydown', (event) => {
  if(event.keyCode === 27){
    modalAdd.classList.add('hide');
    modalItem.classList.add('hide');
    modalSubmit.reset();
  }
});
 
modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);