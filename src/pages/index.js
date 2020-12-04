import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'
import { initialCards, formObject, cards, popupEditProfile, popupAddCard, popupOpenButtonEditProfile, popupOpenButtonAddCard, profileDataSelector } from '../utils/constants.js'; 

import '../pages/index.css';

const popupEditProfileValidation = new FormValidator(formObject,popupEditProfile);
const popupAddCardValidation = new FormValidator(formObject,popupAddCard);

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

const newUserInfo = new UserInfo(profileDataSelector);
const popupEditProfileFromClass = new PopupWithForm({popupSelector: '.popup_edit-profile',
  callbackSubmitForm: (userNameJob) => {
    newUserInfo.setUserInfo(userNameJob); 
  }
});
popupEditProfileFromClass.setEventListeners();

const popupImageBigFromClass = new PopupWithImage('.popup_image-big');
popupImageBigFromClass.setEventListeners();

popupOpenButtonEditProfile.addEventListener('click', () => {
  popupEditProfileFromClass.open();
  popupEditProfileFromClass.setInputValues(newUserInfo.getUserInfo());
  popupEditProfileValidation.enableButton();
});

popupOpenButtonAddCard.addEventListener('click', () => {
  popupAddCardFromClass.open();
});

popupEditProfileValidation.enableValidation();
popupAddCardValidation.enableValidation();