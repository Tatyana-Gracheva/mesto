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

//константы для редактирования профиля
const profileInfo = document.querySelector('.profile-info');
const formElement = popupEditProfile.querySelector('.popup__content');

//константы для ручного добавления карточки
const popupAddCardSForm = popupAddCard.querySelector('.popup__content');

 // константы для внесения изменений в профиль пользователя
const nameInput = popupEditProfile.querySelector('.popup__input_fist-value');
const jobInput = popupEditProfile.querySelector('.popup__input_second-value');
const profileName = profileInfo.querySelector('.profile-info__name');
const profileJob = profileInfo.querySelector('.profile-info__about');

//константы для создания новой карточки
const titleInput = popupAddCard.querySelector('.popup__input_fist-value');
const urlInput = popupAddCard.querySelector('.popup__input_second-value');

//находим массив всех форм
const popupList = Array.from(document.querySelectorAll('.popup'));

//функция добавления карточек
function addCard(arrCards) {
  const card = cardTemplate.content.cloneNode(true);
  const cardDeleteButton = card.querySelector('.element__delet');
  const cardLikeButton = card.querySelector('.element__like');
  const popupOpenButtonImageBig = card.querySelector('.element__image');
    
  card.querySelector('.element__image').src = arrCards.link;
  card.querySelector('.element__image').alt += arrCards.name;
  card.querySelector('.element__name').textContent = arrCards.name;

  //обработчик события "клик по кнопке удаления"
  cardDeleteButton.addEventListener('click',cardDeleted);
  //обработчик события "лайк на карточке"
  cardLikeButton.addEventListener('click',() => {
    cardLikeButton.classList.toggle('element__like_active')});
  //обработчик события "открыть большую картинку"
  popupOpenButtonImageBig.addEventListener('click', () => {
    popupImageBig.querySelector('.popup__box-image').src = arrCards.link;
    popupImageBig.querySelector('.popup__box-image').alt += arrCards.name;
    popupImageBig.querySelector('.popup__box-title').textContent = arrCards.name;
    popupToggle(popupImageBig);
    popupListenerEsc(popupList)});

  cards.prepend(card);
}

//функция удаления карточек
function cardDeleted(evt) {
  const cardDelete= evt.currentTarget.parentNode;
  cardDelete.remove();
}

//создаем карточки из массива
initialCards.forEach(addCard);

//функция для открытия/закрытия попапов
const popupToggle =  (popup) => {
  popup.classList.toggle('popup_opened');
}

popupOpenButtonEditProfile.addEventListener('click', () => {
  popupToggle(popupEditProfile)
  popupListenerEsc(popupList);
});
popupCloseButtonEditProfile.addEventListener('click', () => {
  popupToggle(popupEditProfile);
  popupRemoveListenerEsc(popupList);
});

popupOpenButtonAddCard.addEventListener('click', () => {
  popupToggle(popupAddCard);
  popupListenerEsc(popupList);
});
popupCloseButtonAddCard.addEventListener('click', () => {
  popupToggle(popupAddCard);
  popupRemoveListenerEsc(popupList);
});

popupCloseButtonImageBig.addEventListener('click', () => {
  popupToggle(popupImageBig);
  popupRemoveListenerEsc(popupList);
}); 

//функция изменения данных профиля
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                      // Так мы можем определить свою логику отправки.
                      // О том, как это делать, расскажем позже.

  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popupToggle(popupEditProfile);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

function cardAddHandle (evt) {
  evt.preventDefault();
  const newCard = {name: titleInput.value, link: urlInput.value};
  addCard(newCard);

  popupToggle(popupAddCard);
  titleInput.value = '';
  urlInput .value = '';
}

popupAddCardSForm.addEventListener('submit', cardAddHandle);

//функция наложения слушателя на все попапы
function popupListenerEsc(popupList) {
  popupList.forEach(() => {
    document.addEventListener('keyup', popupCloseEsc);
  })
}
//функция удаления слушателя со всех попапов
function popupRemoveListenerEsc(popupList) {
  popupList.forEach(() => {
    document.removeEventListener('keyup', popupCloseEsc);
  })
}

//функция закрытия попапа при нажатии на еcs
const popupCloseEsc = (evt) => {
  const popupActive = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    popupToggle(popupActive);
    popupRemoveListenerEsc(popupList);
    } 
}

//функция закрытия попапов через клик по overlay
function popupListenerOverlay(popupList) {
  popupList.forEach((popup) => {
    popup.addEventListener('click', popupCloseOverlay);
  })
}

//функция проверки на клик по overlay и закрытие попапа
const popupCloseOverlay = (evt) => {
  const popupActive = document.querySelector('.popup_opened');
  if (evt.target !== evt.currentTarget) {rerurn}
  popupToggle(popupActive);
  popupRemoveListenerEsc(popupList);
}

popupListenerOverlay(popupList);