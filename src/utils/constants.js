export const initialCards = [
  {
    firstValue: 'Архыз',
    secondValue: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    firstValue: 'Челябинская область',
    secondValue: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    firstValue: 'Иваново',
    secondValue: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    firstValue: 'Камчатка',
    secondValue: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    firstValue: 'Холмогорский район',
    secondValue: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    firstValue: 'Байкал',
    secondValue: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const formObject = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

//константы для отрисовки карточек
export const cards = document.querySelector('.elements');

//константы для открытия/закрытия попапов
export const popupEditProfile = document.querySelector('.popup_edit-profile');
export const popupEditProfileSubmitButton = popupEditProfile.querySelector('.popup__submit-button');

export const popupEditAvatar = document.querySelector('.popup_edit-avatar');
export const popupEditAvatarSubmitButton = popupEditAvatar.querySelector('.popup__submit-button');

export const popupAddCard = document.querySelector('.popup_add-element');
export const popupAddCardSubmitButton = popupAddCard.querySelector('.popup__submit-button');
export const popupOpenButtonEditProfile = document.querySelector('.profile-info__edit-button');

export const popupOpenButtonAddCard = document.querySelector('.profile-info__add-button');
export const popupOpenButtonEditAvatar = document.querySelector('.profile-info__edit-avatar');

export const popupDeleteCardSubmitButton= document.querySelector('.popup_delet-card').querySelector('.popup__submit-button');
//константы для редактирования профиля
export const profileInfo = document.querySelector('.profile-info');

export const profileDataSelector = {name:'.profile-info__name', job: '.profile-info__about', avatar: '.profile-info__avatar'}