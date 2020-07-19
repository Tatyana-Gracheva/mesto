const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//константы для отрисовки карточек
const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template');

//константы для открытия/закрытия попапов
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-element');
const popupImageBig = document.querySelector('.popup_image-big');
const popupOpenButtonEditProfile = document.querySelector('.profile-info__edit-button');
const popupOpenButtonAddCard = document.querySelector('.profile-info__add-button');
const popupCloseButtonEditProfile = popupEditProfile.querySelector('.popup__close');
const popupCloseButtonAddCard = popupAddCard.querySelector('.popup__close');
const popupCloseButtonImageBig = popupImageBig.querySelector('.popup__close');

const submitButtonAddCard = popupAddCard.querySelector(formObject.submitButtonSelector);

//константы для редактирования профиля
const profileInfo = document.querySelector('.profile-info');
const formElement = popupEditProfile.querySelector('.popup__content');

//константы для ручного добавления карточки
const popupAddCardSForm = popupAddCard.querySelector('.popup__content');

 // константы для внесения изменений в профиль пользователя
const nameInput = popupEditProfile.querySelector('.popup__input_type_fist-value');
const jobInput = popupEditProfile.querySelector('.popup__input_type_second-value');
const profileName = profileInfo.querySelector('.profile-info__name');
const profileJob = profileInfo.querySelector('.profile-info__about');

//константы для создания новой карточки
const titleInput = popupAddCard.querySelector('.popup__input_type_fist-value');
const urlInput = popupAddCard.querySelector('.popup__input_type_second-value');

//находим массив всех форм
const popupList = Array.from(document.querySelectorAll('.popup'));

//функция создания разметки для новой карточки
function createCard(newCardToCreate) {
  const card = cardTemplate.content.cloneNode(true);
  const cardDeleteButton = card.querySelector('.element__delet');
  const cardLikeButton = card.querySelector('.element__like');
  const popupOpenButtonImageBig = card.querySelector('.element__image');
    
  popupOpenButtonImageBig.src = newCardToCreate.link;
  popupOpenButtonImageBig.alt += newCardToCreate.name;
  card.querySelector('.element__name').textContent = newCardToCreate.name;

  //обработчик события "клик по кнопке удаления"
  cardDeleteButton.addEventListener('click',deleteCard);
  //обработчик события "лайк на карточке"
  cardLikeButton.addEventListener('click',() => {
    cardLikeButton.classList.toggle('element__like_active')
  });
  //обработчик события "открыть большую картинку"
  popupOpenButtonImageBig.addEventListener('click', () => {
    openImageBig(popupImageBig, newCardToCreate);
  });

  return card;
}

//функция открытия большой картинки
function openImageBig(popup, newCard) {
  const popupImage =  popup.querySelector('.popup__box-image');
  popupImage.src = newCard.link;
  popupImage.alt += newCard.name;
  popup.querySelector('.popup__box-title').textContent = newCard.name;
  openPopup(popup);
}

//функция добавления новой карточки
function addCard(data, cardPlace) {
  const card = createCard(data);
  cardPlace.prepend(card);
}

//функция удаления карточек
function deleteCard(evt) {
  const cardDeleted = evt.currentTarget.parentNode;
  cardDeleted.remove();
}

//функция для открытия/закрытия попапов
const togglePopup =  (popup) => {
  popup.classList.toggle('popup_opened');
}

//функция изменения данных профиля
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                      // Так мы можем определить свою логику отправки.
                      // О том, как это делать, расскажем позже.

  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  togglePopup(popupEditProfile);
}

//функция добавления карточки через модальное окно
function handleAddCard(evt) {
  
  evt.preventDefault();
  const newCard = {name: titleInput.value, link: urlInput.value};
  addCard(newCard, cards);

  togglePopup(popupAddCard);
  titleInput.value = '';
  urlInput .value = '';
  disabledButton(submitButtonAddCard, formObject.inactiveButtonClass);
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

//создаем карточки из массива
initialCards.forEach((data) => addCard(data, cards));

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

popupAddCardSForm.addEventListener('submit', handleAddCard);

function openPopup(popupOpened) {
  togglePopup(popupOpened);
  addListenerClickEsc();
  addListenerClickOverlay(popupOpened);
}

function closePopup(popupOpened) {
  togglePopup(popupOpened);
  removeListenerClickEsc();
  removeListenerClickOverlay(popupOpened);
}

popupOpenButtonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
});

popupCloseButtonEditProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

popupOpenButtonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});
popupCloseButtonAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
});

popupCloseButtonImageBig.addEventListener('click', () => {
  closePopup(popupImageBig);
}); 
