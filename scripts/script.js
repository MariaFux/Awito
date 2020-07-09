'use strict';

const dataBase = JSON.parse(localStorage.getItem('awito')) || [];

const modalAdd = document.querySelector('.modal__add'),
  addAd = document.querySelector('.add__ad'),
  modalBtnSubmit = document.querySelector('.modal__btn-submit'),
  modalSubmit = document.querySelector('.modal__submit'),
  modalBtnWarning = document.querySelector('.modal__btn-warning'),
  catalog = document.querySelector('.catalog'),
  modalItem = document.querySelector('.modal__item'),
  modalFileInput = document.querySelector('.modal__file-input'),
  modalFileBtn = document.querySelector('.modal__file-btn'),
  modalImageAdd = document.querySelector('.modal__image-add');

const textFileBtn = modalFileBtn.textContent;
const srcModalImage = modalImageAdd.src;

//все элементы модального окна кроме кнопки "Отправить"
const elementsModalSubmit = [...modalSubmit.elements]
  .filter(elem => elem.tagName !== 'BUTTON');

  const infoPhoto = {};

  //сохранение данных в локальное хранилище
const saveDb = () => localStorage.setItem('awito', JSON.stringify(dataBase));

//перебор и проверка полей на пустоту
const checkForm = () => {
  //становится true, когда все поля модального окна не пустые
  const validForm = elementsModalSubmit.every(elem => elem.value);
  modalBtnSubmit.disabled = !validForm;
  modalBtnWarning.style.display = validForm ? 'none' : '';
};

//функция для закрытия модальных окон 
//по крестику, свободному пространству, Esc и кнопке "Отправить"
const closeModal = function(event) {
  const target = event.target;

  if (target.closest('.modal__close') || target.classList.contains('modal') || event.code === 'Escape') {
    modalAdd.classList.add('hide');
    modalItem.classList.add('hide');
    document.removeEventListener('keydown', closeModal);
    modalSubmit.reset();
    modalImageAdd.src = srcModalImage;
    modalFileBtn.textContent = textFileBtn;
    checkForm();
  }
};

//изменение фотографии в модальном окне modalAdd
modalFileInput.addEventListener('change', (event) => {
  const target = event.target;

  const reader = new FileReader();

  const file = target.files[0];

  infoPhoto.filename = file.name;
  infoPhoto.size = file.size;

  reader.readAsBinaryString(file);

  reader.addEventListener('load', (event) => {
    if (infoPhoto.size < 200000){
      modalFileBtn.textContent = infoPhoto.filename;
      infoPhoto.base64 = btoa(event.target.result);
      modalImageAdd.src = `data:imge/jpeg;base64,${infoPhoto.base64}`;
    } else {
      modalFileBtn.textContent = 'Файл больше 200кб!';
      modalFileInput.value = '';
      checkForm();
    }    
  });
});

//активируется кнопка "Отправить", когда все поля модального окна не пустые
modalSubmit.addEventListener('input', checkForm);

modalSubmit.addEventListener('submit', (event) => {
  event.preventDefault(); //чтобы не перезагружалась страница
  const itemObj = {};

  //формируем объект (имя - значение)
  for (const elem of elementsModalSubmit) {
    itemObj[elem.name] = elem.value;
  }

  //добавляем полученные данные в массив
  dataBase.push(itemObj);
  closeModal({target: modalAdd});
  saveDb();
});

//открытие модального окна добавления объявления
addAd.addEventListener('click', () => {
  modalAdd.classList.remove('hide');
  modalBtnSubmit.disabled = true;
  document.addEventListener('keydown', closeModal);
});

//открытие модального окна отдельного товара
catalog.addEventListener('click', (event) => {
  const target = event.target;

  if (target.closest('.card')) {
    modalItem.classList.remove('hide');
    document.addEventListener('keydown', closeModal);
  } 
});
 
modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);