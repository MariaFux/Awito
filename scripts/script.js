'use strict';

const modalAdd = document.querySelector('.modal__add'),
  addAd = document.querySelector('.add__ad'),
  modalBtnSubmit = document.querySelector('.modal__btn-submit');

addAd.addEventListener('click', () => {
  modalAdd.classList.remove('hide');
  modalBtnSubmit.disabled = true;
})

modalAdd.addEventListener('click', (event) => {
  const target = event.target;

  if(target.classList.contains('modal__close') || target === modalAdd){
    modalAdd.classList.add('hide');
    modalSubmit.reset();
  }
})

document.addEventListener('keydown', (event) => {
  if(event.keyCode === 27){
    modalAdd.classList.add('hide');
    modalSubmit.reset();
  }
});