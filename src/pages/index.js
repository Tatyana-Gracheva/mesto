import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'
import { formObject, cards, popupEditProfile, popupEditAvatar, popupAddCard, popupOpenButtonEditProfile, popupOpenButtonAddCard, profileDataSelector, popupOpenButtonEditAvatar, profileInfo, popupEditProfileSubmitButton, popupEditAvatarSubmitButton, popupAddCardSubmitButton, popupDeleteCardSubmitButton} from '../utils/constants.js'; 
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';

import '../pages/index.css';



const popupEditProfileValidation = new FormValidator(formObject,popupEditProfile);
const popupEditAvatarValidation = new FormValidator(formObject,popupEditAvatar);
const popupAddCardValidation = new FormValidator(formObject,popupAddCard);

function  toggleLikeElement(cardLikeButton,cardLikeNumber, length) {
  cardLikeButton.classList.toggle('element__like_active');
  cardLikeNumber.textContent = length;
}

function clickOnLike(cardLikeButton, cardLikeNumber, cardID) {
  if (cardLikeButton.classList.contains('element__like_active')) 
    {
      const cardLikeClick = api.deleteLikeCard(cardID);
      cardLikeClick
      .then((data) => {
        toggleLikeElement(cardLikeButton,cardLikeNumber, data.likes.length);
      })
      .catch((err) => console.log(err));
    } else
    {
      const cardLikeClick = api.addLikeCard(cardID);
      cardLikeClick
      .then((data) => {
        toggleLikeElement(cardLikeButton,cardLikeNumber, data.likes.length);
      })
      .catch((err) => console.log(err));
    }
}

function createNewCardFromClass(data, userID, popupImageBigFromClass) {
  const newCard = new Card({
    data, 
    handleCardClick: () => {
      popupImageBigFromClass.open(data);
    },
    handleLikeClick: (cardLikeButton, cardLikeNumber, id) => {
      clickOnLike(cardLikeButton, cardLikeNumber, id);
    },
    handleDeleteClick: (cardId) => {
      popupDeleteCardFromClass.setSubmitAction(() => {
        const cardDeletFromServer = api.removeCard(cardId);
        popupDeleteCardSubmitButton.textContent = 'Удаление...';
        cardDeletFromServer
        .then(() => {
          newCard.deleteCard(newCard.cardDeleted);
          popupDeleteCardFromClass.close();
          popupDeleteCardSubmitButton.textContent = 'Да'
        })
        .catch((err) => console.log(err))
      })
      popupDeleteCardFromClass.open();
    }
  },'.element-template',userID);
  return newCard;
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
  headers: {
    authorization: '5457ecbb-4a90-45eb-b193-22d44c85f716',
    'Content-Type': 'application/json'
  }
}); 

const newUserInfo = new UserInfo(profileDataSelector);
//запрашиваем данные пользователя с сервера, получаем промис
const userInfoFromServer = api.getUserInfo();
//обрабатываем промис - устанавливаем данные пользователя при загрузке страницы
userInfoFromServer
  .then((data) => {
    
    newUserInfo.setUserInfo({firstValue: data.name, secondValue: data.about});
    newUserInfo.setUserAvatar(data.avatar);

    const userID = data._id;
    console.log(data)
    
//запрашиваем список карточек с сервера, получаем промис
const cardListFromServer = api.getInitialCards();
//обрабатываем из промиса полученный список карточек
cardListFromServer
  .then((dataFromServer) => {
    const popupImageBigFromClass = new PopupWithImage('.popup_image-big');
    popupImageBigFromClass.setEventListeners();

    const cardList = new Section({
      items: dataFromServer,
      renderer: (data) => { 
        const newCard = createNewCardFromClass(data, userID, popupImageBigFromClass);
        const card = newCard.createCard();
        cardList.addItem(card);
      
      }}, cards
    );
    cardList.renderItems();

    const popupAddCardFromClass = new PopupWithForm({
      popupSelector: '.popup_add-element', 
      callbackSubmitForm: (newCardData) => 
      { 
        const newCardToServer = api.addNewCard(newCardData);
        popupAddCardSubmitButton.textContent = 'Загрузка...';
        newCardToServer
          .then((dataCardFromServer) => {
            const newCard = createNewCardFromClass(dataCardFromServer, userID, popupImageBigFromClass)
            const card = newCard.createCard();
            cardList.addItem(card);
            popupAddCardValidation.disabledButton();
            popupAddCardFromClass.close();
            popupAddCardSubmitButton.textContent = 'Сохранить';
          })
          .catch((err) => console.log(err))
      }
    });

    popupAddCardFromClass.setEventListeners();
    popupOpenButtonAddCard.addEventListener('click', () => {
      popupAddCardFromClass.open();
    });

  })
  .catch((err) => console.log(err));

  })
  .catch((err) => console.log(err));
  
  newUserInfo.setEventListeners();


const popupEditProfileFromClass = new PopupWithForm({popupSelector: '.popup_edit-profile',
  callbackSubmitForm: (userNameJob) => {
    const changeUserInfio = api.changeUserInfo(userNameJob);
    popupEditProfileSubmitButton.textContent = 'Сохранение...';
    changeUserInfio
      .then(() => {
        newUserInfo.setUserInfo({firstValue: userNameJob.name, secondValue: userNameJob.about}); 
        popupEditProfileFromClass.close();
        popupEditProfileSubmitButton.textContent = 'Сохранить';
      })
      .catch((err) => console.log(err))
  }
});
popupEditProfileFromClass.setEventListeners();


const popupEditAvatarFromClass = new PopupWithForm({popupSelector: '.popup_edit-avatar',
  callbackSubmitForm: (urlAvatar) => {
    popupEditAvatarSubmitButton.textContent = 'Сохранение...';
    const changeAvatar = api.changeAvatar(urlAvatar.avatar);
    changeAvatar
    .then((data) => {
      newUserInfo.setUserAvatar(data.avatar);
      popupEditAvatarFromClass.close();
      popupEditAvatarSubmitButton.textContent = 'Сохранить';
    })
    .catch((err) => console.log(err))
  }
});
popupEditAvatarFromClass.setEventListeners();

const popupDeleteCardFromClass = new PopupWithSubmit('.popup_delet-card');
popupDeleteCardFromClass.setEventListeners();

popupOpenButtonEditProfile.addEventListener('click', () => {
  popupEditProfileFromClass.open();
  popupEditProfileFromClass.setInputValues(newUserInfo.getUserInfo());
  popupEditProfileValidation.enableButton();
});

popupOpenButtonEditAvatar.addEventListener('click', () => {
  popupEditAvatarValidation.disabledButton();
  popupEditAvatarFromClass.open();
});

popupOpenButtonEditAvatar.addEventListener('mouseover', () => {
  popupOpenButtonEditAvatar.classList.toggle('profile-info_changed-avatar');
  profileInfo.querySelector('.profile-info__avatar').style.opacity = '0.5';
})
popupOpenButtonEditAvatar.addEventListener('mouseout', () => {
  popupOpenButtonEditAvatar.classList.toggle('profile-info_changed-avatar');
  profileInfo.querySelector('.profile-info__avatar').style.opacity = '1';
})

popupEditProfileValidation.enableValidation();
popupEditAvatarValidation.enableValidation();
popupAddCardValidation.enableValidation();
