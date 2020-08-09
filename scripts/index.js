import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { popupImageBig, openPopup, togglePopup, closePopup } from './popupFunction.js';


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

const formObject = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

//константы для отрисовки карточек
const cards = document.querySelector('.elements');

//константы для открытия/закрытия попапов
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-element');
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
const nameInput = popupEditProfile.querySelector('.popup__input_type_fist-value');
const jobInput = popupEditProfile.querySelector('.popup__input_type_second-value');
const profileName = profileInfo.querySelector('.profile-info__name');
const profileJob = profileInfo.querySelector('.profile-info__about');

//константы для создания новой карточки
const titleInput = popupAddCard.querySelector('.popup__input_type_fist-value');
const urlInput = popupAddCard.querySelector('.popup__input_type_second-value');

const popupEditProfileValidation = new FormValidator(formObject,popupEditProfile);
const popupAddCardValidation = new FormValidator(formObject,popupAddCard);

//функция добавления новой карточки
function addCard(data, cardPlace) {
  const card = data.createCard();
  cardPlace.prepend(card);
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
  const newCardData = {name: titleInput.value, link: urlInput.value};
  const newCard = new Card(newCardData, '.element-template');
  addCard(newCard, cards);
  togglePopup(popupAddCard);
  titleInput.value = '';
  urlInput .value = '';
  popupAddCardValidation.disabledButton();
}

//создаем карточки из массива
initialCards.forEach((data) => {
  const newCard = new Card(data,'.element-template');
  addCard(newCard, cards);
})

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

popupAddCardSForm.addEventListener('submit', handleAddCard);

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

popupEditProfileValidation.enableValidation();
popupAddCardValidation.enableValidation();