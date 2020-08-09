export const popupImageBig = document.querySelector('.popup_image-big');

export function openPopup(popupOpened) {
  togglePopup(popupOpened);
  addListenerClickEsc();
  addListenerClickOverlay(popupOpened);
}

export function closePopup(popupOpened) {
  togglePopup(popupOpened);
  removeListenerClickEsc();
  removeListenerClickOverlay(popupOpened);
}

//функция для открытия/закрытия попапов
export const togglePopup =  (popup) => {
  popup.classList.toggle('popup_opened');
}

//функция наложения слушателя на все попапы
function addListenerClickEsc() {
  document.addEventListener('keyup', closePopupEsc);
}

//функция удаления слушателя нажатия на Esc со всех попапов
function removeListenerClickEsc() {
  document.removeEventListener('keyup', closePopupEsc);
}

//функция закрытия попапа при нажатии на еcs
const closePopupEsc = (evt) => {
  const popupActive = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupActive);
  } 
};

//функция добавления слушателя для закрытия попапов через клик по overlay
function addListenerClickOverlay(popup) {
  popup.addEventListener('click', closePopupOverlay);
}

//функция удаления слушателя для закрытия попапов через клик по overlay
function removeListenerClickOverlay(popup) {
  popup.removeEventListener('click', closePopupOverlay); 
}

//функция проверки на клик по overlay и закрытие попапа
const closePopupOverlay = (evt) => {
  const popupActive = document.querySelector('.popup_opened');
  if (evt.target !== evt.currentTarget) {return}
  closePopup(popupActive);
};