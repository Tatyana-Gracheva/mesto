import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'
import { formObject, cards, popupEditProfile, popupEditAvatar, popupAddCard, popupOpenButtonEditProfile, popupOpenButtonAddCard, profileDataSelector, popupOpenButtonEditAvatar, profileInfo, popupEditProfileSubmitButton, popupEditAvatarSubmitButton, popupAddCardSubmitButton, popupDeleteCardSubmitButton} from '../utils/constants.js'; 
import {api} from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';

import '../pages/index.css';



const popupEditProfileValidation = new FormValidator(formObject,popupEditProfile);
const popupEditAvatarValidation = new FormValidator(formObject,popupEditAvatar);
const popupAddCardValidation = new FormValidator(formObject,popupAddCard);
//https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg

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
    console.log(dataFromServer);
    const cardList = new Section({
      items: dataFromServer,
      renderer: (data) => { 
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
              popupDeleteCardSubmitButton.textContent = 'Удаление...'
              cardDeletFromServer
              .then(() => {
                newCard.deleteCard(newCard.cardDeleted);
              })
              .catch((err) => console.log(err))
              .finally(() => {
                popupDeleteCardSubmitButton.textContent = 'Да'
                popupDeleteCardFromClass.close();
              })
            })
            popupDeleteCardFromClass.open();
          }
        },'.element-template',userID);
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
            const newCard = new Card({
              data: dataCardFromServer, 
              handleCardClick: () => {
                popupImageBigFromClass.open(dataCardFromServer);
              },
              handleLikeClick: (cardLikeButton, cardLikeNumber, id) => {
                clickOnLike(cardLikeButton, cardLikeNumber, id);
              },
              handleDeleteClick: (cardId) => {
                popupDeleteCardFromClass.setSubmitAction(() => {
                  const cardDeletFromServer = api.removeCard(cardId);

                  cardDeletFromServer
                  .then(() => {
                    newCard.deleteCard(newCard.cardDeleted);
                  })
                  .catch((err) => console.log(err));
                })
                popupDeleteCardFromClass.open();
              }
            }, '.element-template', userID);
            const card = newCard.createCard();
            cardList.addItem(card);

            popupAddCardValidation.disabledButton();
          })
          .catch((err) => console.log(err))
          .finally(() => {
            popupAddCardSubmitButton.textContent = 'Сохранить';
            popupAddCardFromClass.close();
          })
      }
    });

    popupAddCardFromClass.setEventListeners();
    popupOpenButtonAddCard.addEventListener('click', () => {
      popupAddCardFromClass.open();
    });

    const popupImageBigFromClass = new PopupWithImage('.popup_image-big');
    popupImageBigFromClass.setEventListeners();

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
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEditProfileSubmitButton.textContent = 'Сохранить';
        popupEditProfileFromClass.close();
      })
  }
});
popupEditProfileFromClass.setEventListeners();


const popupEditAvatarFromClass = new PopupWithForm({popupSelector: '.popup_edit-avatar',
  callbackSubmitForm: (urlAvatar) => {
    popupEditAvatarSubmitButton.textContent = 'Сохранение...';
    const changeAvatar = api.changeAvatar(urlAvatar.avatar);
    changeAvatar
    .then((data) => {
      newUserInfo.setUserAvatar(data.avatar)
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditAvatarSubmitButton.textContent = 'Сохранить';
      popupEditAvatarFromClass.close();
    })
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
