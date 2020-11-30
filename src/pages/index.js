import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js'
import { initialCards, formObject, cards, popupEditProfile, popupAddCard, popupOpenButtonEditProfile, popupOpenButtonAddCard, profileDataSelector } from '../utils/constants.js'; 

import '../pages/index.css';

const popupEditProfileValidation = new FormValidator(formObject,popupEditProfile);
const popupAddCardValidation = new FormValidator(formObject,popupAddCard);



const popupEditProfileFromClass = new PopupWithForm({popupSelector: '.popup_edit-profile',
  callbackSubmitForm: (userNameJob) => {
    const newUserInfo = new UserInfo(profileDataSelector);
    newUserInfo.setUserInfo(userNameJob);
    popupEditProfileFromClass.setInputValues(newUserInfo.getUserInfo());
  }
});
popupEditProfileFromClass.setEventListeners();

const cardList = new Section({
  items: initialCards,
  renderer: (data) => {
    const newCard = new Card({
      data, 
      handleCardClick: () => {
        popupImageBigFromClass.open(data);
      }
    },'.element-template');
    const card = newCard.createCard();
    cardList.addItem(card);
  }}, cards
);
cardList.renderItems();

const popupAddCardFromClass = new PopupWithForm({
  popupSelector: '.popup_add-element', 
  callbackSubmitForm: (newCardData) => { 
    const newCard = new Card({
      data: newCardData, 
      handleCardClick: () => {
        popupImageBigFromClass.open(newCardData);
      }
    }, '.element-template');
    const card = newCard.createCard();
    cardList.addItem(card);
    popupAddCardValidation.disabledButton();
  }
});
popupAddCardFromClass.setEventListeners();

const popupImageBigFromClass = new PopupWithImage('.popup_image-big');
popupImageBigFromClass.setEventListeners();

popupOpenButtonEditProfile.addEventListener('click', () => {
  popupEditProfileFromClass.open();
});

popupOpenButtonAddCard.addEventListener('click', () => {
  popupAddCardFromClass.open();
});

popupEditProfileValidation.enableValidation();
popupAddCardValidation.enableValidation();