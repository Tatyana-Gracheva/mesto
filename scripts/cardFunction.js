import { openPopup } from './popupFunction.js';

//функция удаления карточек
function deleteCard(evt) {
  const cardDeleted = evt.currentTarget.parentNode;
  cardDeleted.remove();
}

//функция открытия большой картинки
function openImageBig(popup, newCard) {
  const popupImage =  popup.querySelector('.popup__box-image');
  popupImage.src = newCard._link;
  popupImage.alt += newCard._name;
  popup.querySelector('.popup__box-title').textContent = newCard.name;
  openPopup(popup);
}

export { deleteCard, openImageBig }