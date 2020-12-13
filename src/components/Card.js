export class Card {
  constructor({data, handleCardClick, handleLikeClick, handleDeleteClick}, templateSelector, userID) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._idUserCard = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._userID = userID;
  }

  _toggleLikeButtonActive(cardLikeButton) {
    cardLikeButton.classList.toggle('element__like_active');
  }

  _toggleDeletButtonHidden(cardDeleteButton) {
    cardDeleteButton.classList.toggle('element__delet_hidden');
  }

  //приватный метод создания разметки для новой карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
    return cardElement;
	}
  
  //приватный метод установки слушателей на карточку
  _setEventListeners(popupOpenButtonImageBig, cardLikeNumber, cardDeleteButton, cardLikeButton) {
    //обработчик события "клик по кнопке удаления"
    cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });
    //обработчик события "лайк на карточке"
    cardLikeButton.addEventListener('click',() => {
      this._handleLikeClick(cardLikeButton, cardLikeNumber, this._id);
      
    });
    //обработчик события "открыть большую картинку"
    popupOpenButtonImageBig.addEventListener('click', () => {
      this._handleCardClick();
    });

  }
  
  deleteCard(cardDeleted) {
    cardDeleted.remove();
  }

  //метод добавления данных в карточку
  createCard () {
    this._card = this._getTemplate();
    this.cardDeleted = this._card.querySelector('.element');
    const popupOpenButtonImageBig = this._card.querySelector('.element__image');
    const cardName = this._card.querySelector('.element__name');
    const cardLikeNumber = this._card.querySelector('.element__number');
    const cardDeleteButton = this._card.querySelector('.element__delet');
    const cardLikeButton = this._card.querySelector('.element__like');

    popupOpenButtonImageBig.src = this._link;
    popupOpenButtonImageBig.alt += this._name;
    cardName.textContent = this._name;
    cardLikeNumber.textContent = this._likes.length;
    if (this._userID !== this._idUserCard) {
      this._toggleDeletButtonHidden(cardDeleteButton);
    }
    //const likeUserId = 0;
    if (this._likes !== []) {
      const likeUserId = this._likes.find(element => 
          element._id = this._userID);
      if (likeUserId !== undefined) {
        this._toggleLikeButtonActive(cardLikeButton);
      }
    }
  

    
    this._setEventListeners(popupOpenButtonImageBig, cardLikeNumber, cardDeleteButton, cardLikeButton);
    return this._card;
  }
}